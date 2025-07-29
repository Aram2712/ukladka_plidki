
import '../styles/messenger.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useEffect, useState, useRef } from 'react';
// import type { TMessage } from '../types';
import { RiSendPlaneFill } from "react-icons/ri";
import { useSocket } from '../hooks/useSocket';
import { useGlobalContext } from '@/context/globalContext';

const style = {
    position: 'fixed',
    bottom: 10,
    right: 10,
    width: 400,
    maxWidth: '95%',
    height: 500,
    maxHeight: '80%',
    bgcolor: 'black',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    borderRadius: '20px',
    p: 1,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    border: '1px solid #666666',
    outline: 'none',
};

type TProps = {
    showMessenger: boolean
    setShowMessenger: (show: boolean) => void,
}

export default function Messenger(props: TProps) {

    const {
        user,
        // messages 
    } = useGlobalContext()

    const bottomRef = useRef<HTMLDivElement>(null);
    const { showMessenger, setShowMessenger } = props;
    const receiverId = 'admin';

    const [msg, setMsg] = useState('')
    const { sendMessage, messages } = useSocket(user?.id?.toString() || '', receiverId)

    const handleSend = () => {
        const data = {
            msg,
            fullName: user?.fullName || ''
        }
        sendMessage(data)
        setMsg('')
    }

    const close = () => {
        setShowMessenger(false);
    }

    useEffect(() => {
        if (showMessenger) {
            const timeout = setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return () => clearTimeout(timeout);
        }
    }, [showMessenger]);

    // Скролл при получении новых сообщений
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <Modal
            open={showMessenger}
        >
            <Box sx={style}>
                <IoMdClose
                    className='close-modal-icon'
                    style={{ color: 'white' }}
                    onClick={close}
                />
                <h3 className='messenger-header'>Чат с админом</h3>
                <div
                    style={{
                        width: '90%',
                        flex: 1, // занимает доступное пространство
                        overflowY: 'auto',
                        border: "1px solid #999999",
                        borderRadius: '15px',
                        margin: '15px 0',
                    }}
                >
                    {
                        messages?.map(item => (
                            <div
                                key={item.id}
                                className='current-message-box'
                                style={{
                                    justifyContent: item.receiverId !== 'admin' ? 'flex-start' : 'flex-end'
                                }}
                            >
                                <span
                                    style={{
                                        color: 'white',
                                        textAlign: item.receiverId !== 'admin' ? 'left' : 'right',
                                        background: item.receiverId !== 'admin' ? '#343434' : '#405DE6'
                                    }}
                                >
                                    {item.text}
                                </span>

                            </div>
                        ))
                    }
                    <div ref={bottomRef} />
                </div>
                <div className='messenger-new-message-box'>
                    <input
                        type='text'
                        className='new-message-input'
                        placeholder='Message'
                        value={msg}
                        onChange={e => setMsg(e.target.value)}
                    />
                    <RiSendPlaneFill
                        style={{
                            color: 'white',
                            fontSize: '32px',
                            padding: '5px',
                            marginLeft: '10px',
                            cursor: 'pointer',
                            background: '#405DE6',
                            borderRadius: '20%',

                        }}
                        onClick={handleSend}
                    />
                </div>
            </Box>
        </Modal>
    )
}