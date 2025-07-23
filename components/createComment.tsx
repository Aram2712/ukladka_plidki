
import '../styles/signin.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating'
// import { useGlobalContext } from '@/context/globalContext';
// import type { TComment } from "../types";
// import useSWRMutation from 'swr/mutation';
// import useSWR from 'swr';
// import { baseUrl } from '@/constants';
// import { createComment, getComments } from '../api'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '95%',
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
    showCreateComment: boolean
    setShowCreateComment: (show: boolean) => void
}

export default function CreateComment(props: TProps) {

    // const { user } = useGlobalContext();
    const { showCreateComment, setShowCreateComment } = props;
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState<string>('');

    console.log(rating)

    const handleRating = (rate: number) => {
        setRating(rate)
    }

    const close = () => {
        setRating(0);
        setComment('');
        setShowCreateComment(false);
    }

    // const { mutate } = useSWR(`${baseUrl}/comments`, getComments);

    // const { trigger } = useSWRMutation(
    //     `${baseUrl}/comments`,
    //     async (url, { arg }: { arg: TComment }) => createComment(url, arg)
    // );

    // const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    //      e.preventDefault();
    //     const data = {
    //         description: comment,
    //         rating,
    //         fullName: user?.fullName || ''
    //     }
    //     try {
    //         const result = await trigger(data);
    //         if (result.data){
    //             await mutate();
    //         }
    //         close();
    //     } 
    //     catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <Modal
            open={showCreateComment}
        >
            <Box sx={style}>
                <IoMdClose
                    className='close-modal-icon'
                    onClick={close}
                />
                <h3 className='modal-header'>Поделитесь мнением</h3>
                <form
                    className='modal-form'
                    style={{ alignItems: 'center' }}
                // onSubmit={handleSubmit}
                >
                    <Rating onClick={handleRating} />
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        className='modal-input modal-textarea'
                        placeholder='Оставьте свой комментарий'
                        required={true}
                    />
                    <input type='submit' className='modal-button' value='Сохранить' />
                </form>
            </Box>
        </Modal>
    )
}