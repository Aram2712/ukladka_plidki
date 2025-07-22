import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from "next/image";
import '../styles/bigSlider.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const getFileType = (path: string) => {
    const ext = path.split('.').pop()?.toLowerCase();
    if (!ext) return 'unknown';
    return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? 'image' : 'video';
};

type TProps = {
    selectedGallery: string[] | null;
    setSelectedGallery: (val: string[] | null) => void;
}

export default function BigSlider(props: TProps) {

    const { selectedGallery, setSelectedGallery } = props;

    useEffect(() => {
        if (selectedGallery) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedGallery]);

    if (!selectedGallery) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={() => { setSelectedGallery(null) }}>&times;</button>
                <Swiper navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}>
                    {selectedGallery.map((url, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            {getFileType(url) === 'image' ? (
                                <Image
                                    src={url}
                                    alt={`Slide ${index}`}
                                    className="modal-media"
                                    width={1000}
                                    height={1000}
                                />
                            ) : (
                                <video
                                    src={url}
                                    controls={true}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="modal-media"
                                />
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}