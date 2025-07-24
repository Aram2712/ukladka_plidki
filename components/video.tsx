
import { useEffect, useRef, useState } from 'react';

type TProps = {
    src: string;
};

const VideoPlayer = ({ src }: TProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        const current = videoRef.current;
        if (current) {
            observer.observe(current);
        }

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible) {
            video.muted = true; // Обязательно, чтобы сработал autoplay
            video.play().then(() => {
                // После успешного старта, можно включить звук
                setTimeout(() => {
                    video.muted = false;
                    video.volume = 1.0;
                }, 500); // небольшой таймаут — помогает Safari
            }).catch((err) => {
                console.warn('Autoplay failed', err);
            });
        } else {
            video.pause();
        }
    }, [isVisible]);

    return (
        <video
            ref={videoRef}
            src={src}
            controls
            preload="metadata"
            playsInline
            muted // важно для Safari при загрузке
            draggable={false}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
            }}
        />
    );
};

export default VideoPlayer;