'use client'
import { useState } from 'react';
// import { useGlobalContext } from '@/context/globalContext';
import CreateComment from './createComment';
import '../styles/comments.css';
import { Rating } from 'react-simple-star-rating'
import useSWR from 'swr';
import { baseUrl } from '@/constants';
import { getComments } from '../api';
import type { TComment } from "../types";

export default function Comments() {

    const [showCreateComment, setShowCreateComment] = useState<boolean>(false); 

    // const { comments } = useGlobalContext();

    const { data } = useSWR(`${baseUrl}/comments`, getComments);

    return(
        <div className='comments-container'>
            <h2>Отзывы клиентов</h2>
            <div className='comments-box'>
                {
                    data?.data.map((item: TComment) => (
                    // comments.map((item: TComment) => (
                        <div className='comment-box' key = {item.id}>
                            <span className='comment-user-name'>{item.fullName}</span>
                            <Rating initialValue={item.rating} className='comment-rating' size={20} readonly={true}/>
                            <span className='comment-text'>
                                {item.description}
                            </span>
                        </div>
                    ))
                }
            </div>
            <div className='create-comment-box'>
                <button className='create-coment-btn look-more-btn' onClick={() => setShowCreateComment(true)}>
                    Оставить отзыв
                </button>
            </div>
            <CreateComment
                showCreateComment = {showCreateComment}
                setShowCreateComment = {setShowCreateComment}
            />
        </div>
    )
}