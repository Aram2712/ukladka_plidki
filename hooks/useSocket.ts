
import { baseUrl } from '@/constants';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useSocket(userId: string, receiverId: string) {

  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
  
    socketRef.current = io(`${baseUrl}`, {
      query: { userId }
    });

    socketRef.current.on('chatHistory', (history) => {
      setMessages(history);
    });

    socketRef.current.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId]);

  const sendMessage = (data: { msg: string, fullName: string }) => {
    socketRef.current?.emit('sendMessage', { text: data.msg, user: data.fullName, senderId: userId, receiverId });
  };

  return { messages, sendMessage };
}