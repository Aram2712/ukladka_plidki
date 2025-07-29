
import '../styles/shadowBox.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getServices } from '../api';
import { useEffect, useState } from 'react';
import { baseUrl, filesPath } from '@/constants';
import 'swiper/css';
import 'swiper/css/pagination';
import useSWR from 'swr';
import { TService } from '@/types';
import Image from "next/image";
import Link from 'next/link';

export default function CircleSlider() {

    const [displayServices, setDisplayServices] = useState<TService[] | null>(null);
    const { data } = useSWR(`${baseUrl}/services`, getServices);

    useEffect(() => {
        if (data) setDisplayServices(data.data.reverse());
    }, [data])

    return (
        <div className="circleSliderBox">
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                pagination={{ clickable: true }}
            >
                {displayServices?.map((item: TService) => (
                    <SwiperSlide key={item.id}>
                        <Link
                            href={`/service`}
                            onClick={() => {
                                localStorage.setItem('currentService', JSON.stringify(item))
                            }}
                            style={{
                                width: 120,
                                height: 150,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                overflow: 'hidden',
                                color: 'white',
                                userSelect: 'none',
                                textDecoration:'none'
                            }}
                        >

                            <Image
                                width={105}
                                height={105}
                                src={`${filesPath}/${item.imagesPaths?.split(',')[0]}`}
                                // src={nkar}
                                alt='carusel image'
                                style={{
                                    borderRadius: '50%'
                                }}
                            />
                            <span className='circleCaruselItemText'>{item.header}</span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}