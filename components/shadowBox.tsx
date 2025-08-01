
'use client'
import '../styles/shadowBox.css';
import Image from 'next/image';
import { GrUserExpert } from "react-icons/gr";
import { TbPuzzleFilled } from "react-icons/tb";
import SendOrder from './sendOrder';
import { useState } from 'react';
import CircleSlider from '../components/circleSlider';
import { useGlobalContext } from '@/context/globalContext';

export default function ShadowBox() {

    const [showOrder, setShowOrder] = useState<boolean>(false);

    const { user } = useGlobalContext();
    console.log(user)
    return(
        <div className='shadow-box-container'>
            <div className='shadow-box-content'>
                <h1 className='shadow-box-head-text'>Укладка плитки <br/> в Санкт-Петербурге</h1>
                <p className='shadow-box-description'>Опытный мастер и профессиональное оборудование.<br/> Выезд в Ленинградскую область.</p>
                <div className='shadow-box-buttons-container'>
                    <span className='call-whatsapp-buttons-box'>
                        <a href="tel:+79119296767" target='_self' className='main-page-button call-button'>Позвонить</a>
                        <a href='https://wa.me/+79119296767' target='_blank' className='main-page-button whatsapp-button'>WhatsApp</a>
                    </span>
                    <button
                        className='online-request-button'
                        onClick={() => setShowOrder(true)}
                    >
                        <span>
                            Оставить заявку онлайн
                        </span>
                    </button>
                </div>
            </div>
            <div className='mobile-main-container'>
                <div className='gor-image-container'>
                    <span className='newsBox'></span>
                    <Image
                        src={'/image/plitochnik-gor-mkrtchyan.webp'}
                        width={100}
                        height={100}
                        alt={'Gor Avatar'}
                        style={{
                            borderRadius: '50%'
                        }}
                    />
                </div>
                <div className='specalization-data-box'>
                    <span>
                        15 лет
                    </span>
                    <span>
                        Опыт работы
                    </span>
                </div>
                <div className='specalization-data-box'>
                    <span>
                        36 мес.
                    </span>
                    <span>
                        Гарантия
                    </span>
                </div>
                <div className='specalization-data-box'>
                    <span>
                        500+
                    </span>
                    <span>
                        Проектов
                    </span>
                </div>
                <div className='mobile-container-description-box'>
                    <h2>Гор Мкртчян</h2>
                    <p>
                        <TbPuzzleFilled
                            style={{
                                color: 'green',
                                marginRight: '10px'
                            }}
                        /> 
                        Укладка плитки любой сложности в Санкт-Петербурге и области!
                    </p>
                    <p>
                        <GrUserExpert
                            style={{
                                color: 'darkgoldenrod',
                                marginRight: '10px'
                            }}
                        /> 
                        Опытный мастер и профессиональное оборудование.
                    </p>
                </div>
                <div className='mobile-version-button'>
                    <a href="tel:+79119296767" target='_self' className='mobile-call-button'>Позвонить</a>
                    <a href='https://wa.me/+79119296767' target='_blank' className='mobile-call-button'>WhatsApp</a>
                    <button
                        className='mobole-request-button'
                        onClick={() => setShowOrder(true)}
                    >
                        Оставить заявку онлайн
                    </button>
                </div>
                <CircleSlider/>
            </div>
            <SendOrder
                showOrder = { showOrder }
                setShowOrder = { setShowOrder }
            />
        </div>
    )
}