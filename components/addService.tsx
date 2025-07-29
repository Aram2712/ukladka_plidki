
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { MuiFileInput } from 'mui-file-input'
import { createService, getServices } from '../api';
import { baseUrl } from '@/constants';
import Loading from '../components/loading';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';

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
    showAddService: boolean
    setShowAddService: (show: boolean) => void
}

export default function AddService(props: TProps) {

    const { showAddService, setShowAddService } = props;

    const [photo, setPhoto] = useState<File[] | undefined>();
    const [title, setTitle] = useState<string>('');
    const [header, setHeader] = useState('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('')

    const { mutate, isLoading } = useSWR(`${baseUrl}/services`, getServices);

    const { trigger, isMutating } = useSWRMutation(
        `${baseUrl}/services`,
        async (url, { arg }: { arg: FormData }) => createService(url, arg)
    );

    const handlesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('price', price);
        data.append('title', title);
        data.append('header', header);
        data.append('description', description);

        photo?.forEach((file) => {
            data.append('photos', file);
        });

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

    const close = () => {
        setTitle('');
        setPrice('');
        setHeader('');
        setDescription('');
        setPhoto(undefined);
        setShowAddService(false);
    }

    return (
        <Modal
            open={showAddService}
        >
            <Box sx={style}>
                <Loading loading = {isLoading || isMutating}/>
                <IoMdClose
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Создать услугу</h3>
                <form
                    className='modal-form'
                    onSubmit={handlesSubmit}
                >
                    <span className='modal-label-text'>Заголовка</span>
                    <input type='text' className='modal-input' value={header} onChange={e => setHeader(e.target.value)} />
                    <span className='modal-label-text'>Название</span>
                    <input type='text' className='modal-input' value={title} onChange={e => setTitle(e.target.value)} />
                    <span className='modal-label-text'>Описание</span>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className='modal-input modal-textarea'
                        style={{ marginTop: 0 }}
                    />
                    <span className='modal-label-text'>Фото / видео</span>
                    <MuiFileInput
                        value={photo}
                        onChange={value => setPhoto(value)}
                        size='small'
                        placeholder='Загрузить'
                        style={{
                            width: '100%'
                        }}
                        multiple
                    />
                    <span className='modal-label-text'>Цена</span>
                    <input type='text' className='modal-input' value={price} onChange={e => setPrice(e.target.value)} />
                    <input type='submit' className='modal-button' value='Сохранить' />
                </form>
            </Box>
        </Modal>
    )
}