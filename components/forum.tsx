
import '../styles/forum.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { submitForumNewData, getAllForum } from '../api';
import useSWRMutation from 'swr/mutation';
import useSWR from 'swr';
import { baseUrl } from '@/constants';
import { useGlobalContext } from '@/context/globalContext';
import { useState, useRef, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '95%',
    height: '95%',
    bgcolor: 'black',
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
    showForum: boolean
    setShowForum: (show: boolean) => void
}

type TForum = {
    id?: number,
    userName: string,
    message: string
}

export default function Forum(props: TProps) {

    const { showForum, setShowForum } = props;
    const { user } = useGlobalContext();
    const bottomRef = useRef<HTMLDivElement>(null);

    const close = () => {
        setMessage('');
        setShowForum(false);
    }

    const [message, setMessage] = useState<string>('');

    const { data,mutate } = useSWR(`${baseUrl}/forum`, getAllForum);

    const { trigger } = useSWRMutation(
        `${baseUrl}/forum/create`,
        async (url, { arg }: { arg: TForum }) => submitForumNewData(url, arg)
    );

    const handleSubmit = async () => {
        if(message){
            const data = {
                userName: user?.fullName || '',
                message
            }
            try {
                const result = await trigger(data);
                if (result.data) {
                    await mutate();
                    setMessage("")
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        }, 0);
        
    }, [data, showForum]);
    
    return (
        <Modal
            open={showForum}
        >
            <Box sx={style}>
                <IoMdClose
                    className='close-modal-icon'
                    style={{ color: 'white' }}
                    onClick={close}
                />
                <h3 className='forum-title'>Сообщество пользователей</h3>
                <div 
                    // className='forum-messages-box'
                    style={{
                        width: '100%',
                        flex: 1, // занимает доступное пространство
                        overflowY: 'auto',
                        border: "1px solid #343434",
                        borderRadius: '20px',
                        margin: '15px 0',
                        padding: '20px'
                    }}
                >
                    {
                        data?.data.map((message: TForum) => {
                            return(
                                <div className='forum-concret-message-box' key = {message.id}>
                                    <span>{message.userName}</span>
                                    <span>{message.message}</span>
                                </div>
                            )
                        })
                    }
                    <div ref={bottomRef} />
                </div>
                <div className='forum-newMessage-box'>
                    <input 
                        type='text' 
                        className='new-message-input' 
                        style={{ marginBottom: 0, height: '45px' }} 
                        placeholder='Ваш комментарий здесь' 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <RiSendPlaneFill
                        onClick={handleSubmit}
                        style={{
                            color: 'white',
                            fontSize: '40px',
                            padding: '5px',
                            // marginLeft:'10px',
                            cursor: 'pointer',
                            background: '#405DE6',
                            borderRadius: '20%',
                        }}
                    />
                </div>
            </Box>
        </Modal>
    )
}