'use client';
import '../../styles/sliderBox.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import Comments from '../../components/comments';
import FooterBox from '../../components/footerBox';
// import { baseUrl, filesPath, localFilesPath } from '@/constants';
// import { getServices } from '../../api';
// import useSWR from 'swr';
import { useGlobalContext } from '@/context/globalContext';
import type { TService } from '../../types'

type TProps = {
    setCurrentService: (service: TService | null) => void
}

export default function OtherServices(props: TProps) {

    const { setCurrentService } = props;

    const { services } = useGlobalContext();

    // const { data } = useSWR(`${baseUrl}/services`, getServices);
    
    const media = [
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp',
        'https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'
    ]

    const isString = 'https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668617_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/photo_5470042268145668618_w-819x1024-1.webp,https://ukladka-plitki.ru/wp-content/uploads/1713899046-10.mp4'

    function getFileType(filename: string) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'webm'];

        const index = filename.lastIndexOf('.');

        const ext = filename.substring(index+1).toLowerCase();
        
        if (imageExtensions.includes(ext)) return 'image';
        if (videoExtensions.includes(ext)) return 'video';

        return 'unknown';
    }

    return (
        <div className='sliders-container'>
            {
                // data?.data.map((item: TService, index: number) => (
                services.map((item: TService, index: number) => (
                    <div className='service-item-container' key={index}>
                        <Swiper
                            navigation={true}
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            className="mySwiper"
                        >
                            {
                            // item.imagesPaths.split(',').map((item: string, index: number) => (
                            item.imagesPaths.split(',').map((path: string, index: number) => (
                                <SwiperSlide key={index}>
                                    {getFileType(path) === 'image' ? (
                                        <div className="relative w-[500px] h-[500px]">
                                            <Image
                                                // src={`${filesPath}/${item.src}`}
                                                src={path}
                                                alt={`Slide ${index}`}
                                                width={500}
                                                height={500}
                                                className="object-contain"
                                                priority={index === 0}
                                            />
                                        </div>
                                    ) : (
                                        <video
                                            // src={`${filesPath}/${item.src}`}
                                            src={path}
                                            muted
                                            autoPlay={true}
                                            controls
                                            preload="metadata"
                                            className="w-full max-h-[500px] mx-auto"
                                        />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className='service-item-description-button-box'>
                            <span>
                                { item.title }
                            </span>
                            <span 
                                className='service-about-navigate-btn current-service-link' 
                                onClick={() => {
                                    localStorage.setItem('currentService', JSON.stringify(item))
                                    setCurrentService(item);
                                    window.scrollTo({top: 0, behavior: 'smooth'})
                                }}
                                style={{
                                    textDecoration:'none', 
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
            <Comments/>
            <FooterBox/>
        </div>
    )
}
