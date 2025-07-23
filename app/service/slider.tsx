'use client'

import { useEffect, useState } from 'react'
import '../../styles/services.css'
import type { TService } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import BigSlider from '../../components/bigSlider';

type TProps = {
    currentService: TService | null;
    setCurrentService: (service: TService | null) => void
}

export default function Slider(props: TProps) {

    const media = [
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
    ]

    const { currentService, setCurrentService } = props;

    const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('currentService') as string)
        if (data) setCurrentService(data);
    }, [])

    function getFileType(filename: string) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

        const index = filename.lastIndexOf('.');

        const ext = filename.substring(index + 1).toLowerCase();

        if (imageExtensions.includes(ext)) return 'image';
        if (videoExtensions.includes(ext)) return 'video';

        return 'unknown';
    }

    return (
        currentService &&
        <div className='service-slider-box'>
            <BigSlider
                selectedGallery = {selectedGallery}
                setSelectedGallery = {setSelectedGallery}
            />
            <h2>{currentService.title}</h2>
            <p>{currentService.description}</p>
            <Swiper
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >           
                {
                    // item.imagesPaths.split(',').map((item: string, index: number) => (
                    media.map((path: string, index: number) => (
                        <SwiperSlide key={index}>
                            <div
                                className='slider-item-box'
                                style={{
                                    position:'relative'
                                }}
                            >
                                {getFileType(path) === 'image' ? (
                                    <Image
                                        // src={`${filesPath}/${item.src}`}
                                        src={path}
                                        alt={`Slide ${index}`}
                                        width={500}
                                        height={500}
                                        className="slider-image-file"
                                        priority={index === 0}
                                        onClick={() => setSelectedGallery(media)}
                                    />
                                    )
                                    :
                                    (
                                        <div 
                                            className="video-wrapper"
                                            onClick={() => setSelectedGallery(media)}                                            
                                        >
                                            <video
                                                // src={`${filesPath}/${item.src}`}
                                                src={path}
                                                muted
                                                autoPlay={true}
                                                controls={false}
                                                preload="metadata"
                                                playsInline
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    display: 'block',
                                                }}
                                                onClick={() => setSelectedGallery(media)}
                                            />
                                        </div>
                                    )}
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div >
    )
}