
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import Loading from '../components/loading';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { baseUrl } from '@/constants';
import { createPrice, getAllPrices } from '../api';
import { TPrice } from '@/types';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    maxWidth: '95%',
    bgcolor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    borderRadius: '10px',
    p: 2,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    outline: 'none'
};

type TProps = {
    showAddPrice: boolean
    setShowAddPrice: (show: boolean) => void
}

export default function AddPrice(props: TProps) {

    const { showAddPrice, setShowAddPrice } = props;

    const { mutate, isLoading } = useSWR(`${baseUrl}/priceList`, getAllPrices);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');

    const close = () => {
        setTitle('');
        setPrice('');
        setShowAddPrice(false)
    }

    const { trigger, isMutating } = useSWRMutation(
        `${baseUrl}/priceList`,
        async (url, { arg }: { arg: TPrice }) => createPrice(url, arg)
    );

    const handlesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            price,
            title
        }
        try {
            const result = await trigger(data);
            if (result.data) {
                await mutate();
            }
            close();
        }
        catch (err) {
            console.error('Ошибка при добавлении:', err);
        }
    }

    return (
        <Modal
            open={showAddPrice}
        >
            <Box sx={style}>
                <Loading loading={isLoading || isMutating} />
                <IoMdClose
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Создать</h3>
                <form
                    className='modal-form'
                    onSubmit={handlesSubmit}
                >
                    <span className='modal-label-text'>Имя</span>
                    <input type='text' className='modal-input' value={title} onChange={e => setTitle(e.target.value)} />                 
                    <span className='modal-label-text'>Цена</span>
                    <input type='text' className='modal-input' value={price} onChange={e => setPrice(e.target.value)} />
                    <input type='submit' className='modal-button' value='Сохранить' />
                </form>
            </Box>
        </Modal>
    )
}