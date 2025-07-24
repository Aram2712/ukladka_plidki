
import { useEffect, useRef, useState } from 'react';

type TProps = {
    src: string;
};

const VideoPlayer = ({ src }: TProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.5 }
        );

        const current = videoRef.current;
        if (current) observer.observe(current);

        return () => {
            if (current) observer.unobserve(current);
        };
    }, []);

    // Автовоспроизведение + авто-скрытие controls
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible) {
            video.muted = true;
            video.play()
                .then(() => {
                    // Временно показываем controls
                    setShowControls(true);

                    setTimeout(() => {
                        setShowControls(false); // скрываем controls через 2 секунды
                    }, 2000);

                    setTimeout(() => {
                        video.muted = false;
                        video.volume = 1.0;
                    }, 1000);
                })
                .catch(err => {
                    console.warn('Autoplay failed', err);
                });
        }
        else {
            video.pause();
            setShowControls(true); // показываем controls при паузе
        }
    }, [isVisible]);

    return (
        <video
            ref={videoRef}
            src={src}
            controls={showControls}
            preload="metadata"
            playsInline
            muted
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
