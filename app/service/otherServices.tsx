'use client';
import '../../styles/sliderBox.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useState, useRef } from 'react';
import Image from "next/image";
import Comments from '../../components/comments';
import FooterBox from '../../components/footerBox';
import { baseUrl, filesPath } from '@/constants';
import { getServices } from '../../api';
import useSWR from 'swr';
import type { TService } from '../../types'
import VideoPlayer from '../../components/video';
import BigSlider from '@/components/bigSlider';

type TProps = {
    setCurrentService: (service: TService | null) => void
}

export default function OtherServices(props: TProps) {

    const { setCurrentService } = props;

    // const { services } = useGlobalContext();

    const [selectedGallery, setSelectedGallery] = useState<string[] | null>(null);
    const userInteractedRef = useRef(false);

    const { data } = useSWR(`${baseUrl}/services`, getServices);

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
                                                    src={`${filesPath}/${path}`}
                                                    // src={path}
                                                    alt={`Slide ${index}`}
                                                    width={500}
                                                    height={500}
                                                    className="slider-image-file"
                                                    priority={index === 0}
                                                    onClick={() => setSelectedGallery(item.imagesPaths.split(','))}
                                                />

                                            ) : (
                                                <div className="video-wrapper">
                                                    <VideoPlayer src={path} userInteractedRef={userInteractedRef} />
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
                            <span
                                className='service-about-navigate-btn current-service-link'
                                onClick={() => {
                                    localStorage.setItem('currentService', JSON.stringify(item))
                                    setCurrentService(item);
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    width: '120px'
                                }}
                            >
                                Подробнее
                            </span>
                        </div>
                    </div>
                ))
            }
            {/* <div className='look-more-btn-box'>
                <button
                    className='look-more-btn'
                >
                    Посмотреть еще
                </button>
            </div> */}
            <BigSlider
                selectedGallery={selectedGallery}
                setSelectedGallery={setSelectedGallery}
            />
            <Comments />
            <FooterBox />
        </div>
    )
}
