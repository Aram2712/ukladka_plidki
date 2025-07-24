'use client';
import '../styles/userWindow.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaUser } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { BsPeopleFill } from "react-icons/bs";
import { useGlobalContext } from '@/context/globalContext';
import { useRouter } from 'next/navigation';
import 'react-phone-input-2/lib/style.css';

const style = {
    position: 'absolute',
    top: '0%',
    left: '100%',
    transform: 'translate(-100%, 100px)',
    width: 'auto',
    minWidth: '300px',
    maxWidth: '90%',
    bgcolor: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    borderRadius: '2px',
    p: 1,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: 'none',
    outline: 'none'
};


type TProps = {
    showUserWindow: boolean
    setShowUserWindow: (show: boolean) => void
    setShowMessenger: (show: boolean) => void
    setShowForum: (show: boolean) => void
}

export default function UserWindow(props: TProps) {

    const { showUserWindow, setShowUserWindow, setShowMessenger, setShowForum } = props;
    const { user, setUser } = useGlobalContext();
    const router = useRouter();
    const close = () => {
        setShowUserWindow(false);
    }

    const logout = () => {
        localStorage.removeItem('plidka_user');
        setUser(null); // сброс контекста
        router.push('/');
        close()
    }

    return (
        <Modal
            open={showUserWindow}
            onClose={close}
        >
            <Box sx={style}>
                {/* <IoMdClose 
                    className='close-modal-icon'
                    onClick={close}
                /> */}

                <h3 className='user-window-header'>
                    <FaUser style={{ fontSize: '20px', marginRight: '15px' }} />
                    {user?.fullName}
                </h3>
                <div className='user-window-links-box'>
                    {
                        user?.role === 'user' &&
                        <span
                            onClick={() => {
                                setShowMessenger(true);
                                setShowUserWindow(false)
                            }}
                        >
                            <FaFacebookMessenger
                                style={{ fontSize: '20px', marginRight: '10px' }}
                            />
                            Messenger
                        </span>
                    }
                    {
                        user &&
                        <span
                            onClick={() => {
                                setShowForum(true);
                                setShowUserWindow(false)
                            }}
                        >
                            <BsPeopleFill
                                style={{ fontSize: '20px', marginRight: '10px' }}
                            />
                            Форум
                        </span>
                    }
                    <span onClick={logout}>
                        <IoLogOut style={{ fontSize: '22px', marginRight: '10px' }} />
                        Выйти
                    </span>
                </div>
            </Box>
        </Modal>
    )
}