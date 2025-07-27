
import '../styles/signin.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import { signup } from '../api';
import useSWRMutation from 'swr/mutation';
import { TUser } from '@/types';
import { baseUrl } from '@/constants';
import Loading from "./loading";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '90%',
    bgcolor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    borderRadius: '10px',
    p: 1,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
    outline: 'none'
};

type TProps = {
    showSignup: boolean
    setShowSignup: (show: boolean) => void
    setShowSignin: (show: boolean) => void
}

export default function SignUp(props: TProps) {

    const {
        showSignup,
        setShowSignup,
        setShowSignin
    } = props;

    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [error, setError] = useState(false);

    const close = () => {
        setFullName('');
        setPassword('');
        setPhoneNumber('');
        setError(false);
        setShowSignup(false);
    }

    const { trigger, isMutating } = useSWRMutation(
        `${baseUrl}/auth/signup`,
        async (url, { arg }: { arg: TUser }) => signup(url, arg)
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            fullName,
            phoneNumber,
            password,
            role: 'user'
        }
        try {
            const result = await trigger(data);
            
            if (result.data) {
                setShowSignin(true);
                close()
            }
            else {
                setError(true);
            }
        }
        catch (err) {
            console.error('Ошибка при добавлении:', err);
        }
    }

    return (
        <Modal
            open={showSignup}
        >
            <Box sx={style}>
                <Loading loading = {isMutating}/>
                <IoMdClose
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Создать аккаунт</h3>
                <form
                    className='modal-form'
                    onSubmit={handleSubmit}
                >
                    <span className='modal-label-text'>Номер телефона</span>
                    <PhoneInput
                        inputClass='modal-input'
                        country={'ru'}
                        value={phoneNumber}
                        onChange={phone => {setPhoneNumber(phone), setError(false)}}
                        inputProps={{
                            name: 'phone',
                            required: true
                        }}
                        placeholder='+7(111) 111-11-11'
                    />
                    <span className='modal-label-text'>Имя, Фамилия</span>
                    <input type='text' className='modal-input' value={fullName} onChange={e => setFullName(e.target.value)} />
                    <span className='modal-label-text'>Пароль</span>
                    <input type='password' className='modal-input' value={password} onChange={e => setPassword(e.target.value)} />
                    {
                        error &&
                        <span className='signinError'>
                            Номер уже привязан к другому аккаунту.
                        </span>
                    }
                    <input type='submit' style={{ marginBottom: '15px' }} className='modal-button' value='Создать' />
                </form>
            </Box>
        </Modal>
    )
}