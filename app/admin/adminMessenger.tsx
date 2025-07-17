
import '../../styles/messenger.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FaChevronLeft } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState, useRef } from 'react';
import type { TUser } from '../../types';
import { RiSendPlaneFill } from "react-icons/ri";
import { useGlobalContext } from '@/context/globalContext';
// import { useSocket } from '../../hooks/useSocket';

const style = {
  position: 'fixed',
      bottom: 100,
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
    users: TUser[]
}

export default function AdminMessenger(props: TProps) {

    const { 
        showMessenger, 
        setShowMessenger, 
        // users 
    } = props;
    const {messages, clients} = useGlobalContext();
    const bottomRef = useRef<HTMLDivElement>(null);

    const [concretUserMessages, setConcretUsersMessages] = useState<Array<any> | null>(null);
    const [activeUserId, setActiveuserId] = useState<string>('');

    const [msg, setMsg] = useState('')
    // const { sendMessage, messages } = useSocket('admin', activeUserId)
 
    function splitMessagesByUser<T extends {senderId: string, receiverId:string}>(messages: T[], currentUserId: string): T[][] {

        const userMap: Record<string, any[]> = {};

        for (const msg of messages) {
            const opponentId =
            msg.senderId === currentUserId ? msg.receiverId : msg.senderId;

            if (!userMap[opponentId]) {
            userMap[opponentId] = [];
            }

            userMap[opponentId].push(msg);
        }

        return Object.values(userMap);
    }

    const groupedMessages = splitMessagesByUser(messages, 'admin');

    console.log(groupedMessages);

    // const handleSend = () => {
    //     const data = {
    //         msg,
    //         fullName: 'admin'
    //     }
    //     sendMessage(data)
    //     setMsg('')
    // }

    const close = () => {
        setShowMessenger(false);
    }

    useEffect(() => {
        if (messages?.length > 0) {
            if (activeUserId) getCurrentUserMessages(Number(activeUserId));
        }
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [concretUserMessages])

    const getCurrentUserMessages = (id: number) => {
        const getCurrentData = groupedMessages.find(elem => {
            if (Number(elem[0].senderId) === id || Number(elem[0].receiverId) === id){
                return elem
            }
        })
        if (getCurrentData) {
            setConcretUsersMessages(getCurrentData);
        }
        else {
            setConcretUsersMessages([]);
        }
        setActiveuserId(id.toString())
    }

    return(
        <Modal
            open={showMessenger}
        >
            <Box sx = {style}>
                <IoMdClose 
                    className='close-modal-icon'
                    style={{color: 'white'}}
                    onClick={close}
                />
                {
                    concretUserMessages ?
                    <FaChevronLeft
                        className='close-modal-icon'
                        style={{ left: '20px', top: '15px', fontSize: '20px', color: '#666666' }}
                        onClick = {
                            () => {
                                setActiveuserId('');
                                setConcretUsersMessages(null)
                            }
                        }
                    />
                    :
                    null
                }
                
                <h3 className='messenger-header'>Messenger</h3>
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
                        !concretUserMessages ? 
                            clients?.filter((item) => item.role !== 'admin')
                            .map((user, index) => (
                                <div 
                                    key = {index}
                                    className='admin-messenger-username-text'
                                    style={{
                                        justifyContent:'flex-start'
                                    }}
                                    onClick={() => getCurrentUserMessages(Number(user.id))}
                                >
                                    {user.fullName}
                                </div>
                            ))
                        :
                            concretUserMessages?.map(item => (
                                <div 
                                    key = {item.id}
                                    className='current-message-box'
                                    style={{
                                        justifyContent: item.receiverId === 'admin' ? 'flex-start' : 'flex-end'
                                    }}
                                >
                                    <span 
                                        style={{
                                            // textAlign: item.receiverId === 'admin' ? 'left' : 'right',
                                            textAlign: 'left',
                                            background: item.receiverId === 'admin' ? '#343434' : '#405DE6',
                                            color: 'white'
                                        }}
                                    >
                                        {item.text}
                                    </span>
                                </div>
                            ))
                    }
                    <div ref={bottomRef} />
                </div>
                {
                    concretUserMessages &&
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
                                fontSize: '36px',
                                padding: '5px',
                                marginLeft:'10px',
                                cursor: 'pointer',
                                background:'#405DE6',
                                borderRadius: '20%',

                            }}
                            // onClick={handleSend}
                        />
                    </div>
                }
            </Box>
        </Modal>
    )
}