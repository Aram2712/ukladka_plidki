import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
import { ZoomableSlide } from './zoomable';
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

    const swiperRef = useRef<SwiperType | null>(null);

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
                <Swiper
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    allowTouchMove={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className='bigSwipper'
                >
                    {selectedGallery.map((url, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            {/* {getFileType(url) === 'image' ? (
                                <Image
                                    src={url}
                                    alt={`Slide ${index}`}
                                    className="modal-media"
                                    width={1000}
                                    height={1000}
                                    onClick={() => setZoomIndex(index)}
                                />
                            ) : (
                                <video
                                    src={url}
                                    controls={true}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="modal-media"
                                    onClick={() => setZoomIndex(index)}
                                />
                            )} */}
                            {/* <ZoomableSlide type={getFileType(url)} src={url} ref={swiperRef} /> */}
                            {
                                getFileType(url) === 'image' ?
                                    (
                                        <ZoomableSlide src={url} />
                                    )
                                    :
                                    (
                                        <video
                                            src={url}
                                            controls={true}
                                            autoPlay = {false}
                                            // muted
                                            playsInline
                                            className="modal-media"
                                        />
                                    )
                            }
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}