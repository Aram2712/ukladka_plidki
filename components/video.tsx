
import { useEffect, useRef, useState } from 'react';

type TProps = {
    src: string;
};

const VideoPlayer = ({ src }: TProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showControls, setShowControls] = useState(true);

    // Intersection Observer — следим за видимостью видео
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

    // Воспроизведение/пауза + автоскрытие controls
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible) {
            video.muted = true;
            video.play()
                .then(() => {
                    setShowControls(true);

                    // Автоматическое скрытие controls через 2 секунды
                    const hideTimeout = setTimeout(() => {
                        setShowControls(false);
                    }, 2000);

                    // Размьют через 0.5 сек (для Safari)
                    setTimeout(() => {
                        video.muted = false;
                        video.volume = 1.0;
                    }, 500);

                    return () => clearTimeout(hideTimeout);
                })
                .catch(err => console.warn('Autoplay failed', err));
        } else {
            video.pause();
            setShowControls(true);
        }
    }, [isVisible]);

    // 👆 Клик по видео: ставим паузу и показываем controls
    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setShowControls(true);
            setTimeout(() => setShowControls(false), 2000);
        } else {
            video.pause();
            setShowControls(true); // показываем controls при паузе
        }
    };

    return (
        <video
            ref={videoRef}
            src={src}
            controls={showControls}
            preload="metadata"
            playsInline
            muted
            draggable={false}
            onClick={handleVideoClick}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                touchAction: 'manipulation', // для мобильных
            }}
        />
    );
};

export default VideoPlayer;
