
import '../styles/signin.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import useSWRMutation from 'swr/mutation';
import { baseUrl } from '@/constants';
import { signin } from '../api'
import { useGlobalContext } from '@/context/globalContext';

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
    showSignin: boolean
    setShowSignin: (show: boolean) => void
    setShowSignup: (show: boolean) => void
}

export default function Signin(props: TProps) {

    const { showSignin, setShowSignin, setShowSignup } = props;
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [password, setPassword] = useState('')
    const { setUser } = useGlobalContext();

    const close = () => {
        setShowSignin(false);
        setPhoneNumber('');
        setPassword('');
    }

    const { trigger } = useSWRMutation(
            `${baseUrl}/auth/login`,
            async (url, { arg }: { arg: { phoneNumber: string, password: string } }) => signin(url, arg)
        );
    

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(1);
        
        // const user = clients.find(item => item.phoneNumber === phoneNumber)
        // if (user) {
        //     console.log(user);
            
        //     localStorage.setItem('plidka_user', JSON.stringify(user));
        //     setUser(user);
        //     close();
        // }
        const data = {
            phoneNumber,
            password,
        }
        try {
            const result = await trigger(data);
            if (result.data){
                localStorage.setItem('plidka_user', JSON.stringify(result.data));
                setUser(result.data);
                close();
            }
        } 
        catch (err) {
            console.error(err);
        }
    }

    return(
        <Modal
            open={showSignin}
        >
            <Box sx = {style}>
                <IoMdClose 
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Войти</h3>
                <form className='modal-form' onSubmit={login}>
                    <span className='modal-label-text'>Номер телефона</span>
                    <PhoneInput
                        inputClass='modal-input'
                        country={'ru'}
                        value={phoneNumber}
                        onChange={phone => setPhoneNumber(phone)}
                        inputProps={{
                            name: 'phone',
                            required: true
                        }}
                        placeholder='+7(111) 111-11-11'
                    />
                    <span className='modal-label-text'>Пароль</span>
                    <input type='password' className='modal-input' value={password} onChange={e => setPassword(e.target.value)}/>
                    <input type='submit' className='modal-button' value = 'Войти'/>
                    <p 
                        className='model-register-link'
                        onClick={() => {
                            setShowSignup(true);
                            close()
                        }}
                    >
                        Создать аккаунт
                    </p>
                </form>
            </Box>
        </Modal>
    )
}