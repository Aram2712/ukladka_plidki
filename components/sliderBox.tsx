'use client';
import '../styles/sliderBox.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import Comments from './comments';
import FooterBox from './footerBox';
import { baseUrl, filesPath, localFilesPath } from '@/constants';
import { getServices } from '../api';
import useSWR from 'swr';
import Link from 'next/link';
// import { useGlobalContext } from '@/context/globalContext';
import type { TService } from '../types'
import VideoPlayer from './video';
import BigSlider from './bigSlider';
import { useState, useRef } from 'react';

export default function SliderBox() {

    // const { services } = useGlobalContext();
    const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
    const userInteractedRef = useRef(false);

    const { data } = useSWR(`${baseUrl}/services`, getServices);

    // const media = [
    //     'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp',
    //     'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
    //     'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
    //     'https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
    // ]

    function getFileType(filename: string) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

        const index = filename.lastIndexOf('.');

        const ext = filename.substring(index + 1).toLowerCase();

        if (imageExtensions.includes(ext)) return 'image';
        if (videoExtensions.includes(ext)) return 'video';

        return 'unknown';
    }
    console.log(data)
    return (
        <div className='sliders-container'>
            {
                data?.data.map((item: TService, index: number) => (
                // services.map((item: TService, index: number) => (
                    <div className='service-item-container' key={index}>
                        <Swiper
                            navigation={true}
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                            onSlideChange={() => {
                                userInteractedRef.current = true;
                            }}
                        >
                            {
                                // item.imagesPaths.split(',').map((item: string, index: number) => (
                                item.imagesPaths.split(',').map((path: string, index: number) => (
                                    <SwiperSlide key={index}>
                                        <div
                                            className='slider-item-box'
                                        >
                                            {getFileType(path) === 'image' ? (
                                                <Image
                                                    src={`${filesPath}/${item}`}
                                                    // src={path}
                                                    alt={`Slide ${index}`}
                                                    width={500}
                                                    height={500}
                                                    className="slider-image-file"
                                                    priority={index === 0}
                                                    onClick={() => setSelectedGallery(item.imagesPaths.split(','))}
                                                />

                                            ) : (
                                                <div className="video-wrapper"
                                                // onClick={() => setSelectedGallery(item.imagesPaths.split(','))}
                                                >
                                                    <VideoPlayer src={`${filesPath}/${item}`} userInteractedRef={userInteractedRef} />
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <div className='service-item-description-button-box'>
                            <span>
                                {item.title}
                            </span>
                            <Link
                                className='service-about-navigate-btn current-service-link'
                                href={`/service`}
                                onClick={() => {
                                    localStorage.setItem('currentService', JSON.stringify(item))
                                }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black'
                                }}
                            >
                                Подробнее
                            </Link>
                        </div>
                    </div>
                ))
            }
            <BigSlider
                selectedGallery={selectedGallery}
                setSelectedGallery={setSelectedGallery}
            />
            <Comments />
            <FooterBox />
        </div>
    )
}
