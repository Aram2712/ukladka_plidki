
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { MuiFileInput } from 'mui-file-input'
import { sendOrder } from '../api';
import { baseUrl } from '@/constants';
import useSWRMutation from 'swr/mutation';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
    showOrder: boolean
    setShowOrder: (show: boolean) => void
}

export default function SendOrder(props: TProps) {

    const { showOrder, setShowOrder } = props;

    const [photo, setPhoto] = useState<File[] | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [square, setSquare] = useState<string>('');

    const { trigger } = useSWRMutation(
        `${baseUrl}/orders/create`,
        async (url, { arg }: { arg: FormData }) => sendOrder(url, arg)
    );

    const handlesSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        data.append('phoneNumber', phoneNumber);
        data.append('square', square);
        photo?.forEach((file) => {
            data.append('images', file);
        });
        try {
            const result = await trigger(data);
            console.log('Заявка отправлена:', result);
            close();
        }
        catch (err) {
            console.error('Ошибка при добавлении:', err);
        }
    }

    const close = () => {
        setPhoneNumber('');
        setSquare('');
        setPhoto(undefined);
        setShowOrder(false);
    }

    return (
        <Modal
            open={showOrder}
        >
            <Box sx={style}>
                <IoMdClose
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Ваша Заявка</h3>
                <form
                    className='modal-form'
                    onSubmit={handlesSubmit}
                >
                    <span className='modal-label-text'>Площадь помещения ( кв. м. )</span>
                    <input type='number' className='modal-input' value={square} onChange={e => setSquare(e.target.value)} />
                    <span className='modal-label-text'>Фото помещения</span>
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
                    <span className='modal-label-text'>Номер телефона для обратной связи</span>
                    <PhoneInput
                        inputClass='modal-input'
                        inputStyle={{
                            width: '100%'
                        }}
                        country={'ru'}
                        value={phoneNumber}
                        onChange={phone => setPhoneNumber(phone)}
                        inputProps={{
                            name: 'phone',
                            required: true
                        }}
                        placeholder='+7(111) 111-11-11'
                    />
                    <input type='submit' className='modal-button' value='Отправить' />
                </form>
            </Box>
        </Modal>
    )
}