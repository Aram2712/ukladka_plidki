import { useEffect, useRef, useState } from 'react';

type TProps = {
    src: string;
    userInteractedRef: React.MutableRefObject<boolean>;
};

const VideoPlayer = ({ src, userInteractedRef }: TProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showControls, setShowControls] = useState(true);
    // const userInteracted = useRef(false);

    // Запоминаем, что юзер взаимодействовал
    useEffect(() => {
        const markInteraction = () => {
            userInteractedRef.current = true;
            window.removeEventListener('click', markInteraction);
            window.removeEventListener('touchstart', markInteraction);
        };

        window.addEventListener('click', markInteraction);
        window.addEventListener('touchstart', markInteraction);

        return () => {
            window.removeEventListener('click', markInteraction);
            window.removeEventListener('touchstart', markInteraction);
        };
    }, []);

    // Отслеживаем видимость
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

    // Воспроизведение видео
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const playVideo = () => {
            if (!userInteractedRef.current) return;

            video.muted = false;
            video.volume = 1;

            video
                .play()
                .then(() => {
                    setShowControls(true);
                    hideTimeout = setTimeout(() => setShowControls(false), 2000);
                })
                .catch((err) => {
                    console.warn('Autoplay failed', err);
                });
        };

        if (isVisible) {
            if (video.readyState >= 3) {
                playVideo();
            } else {
                video.addEventListener('canplay', playVideo, { once: true });
            }
        } else {
            video.pause();
            setShowControls(true);
        }

        return () => {
            if (hideTimeout) clearTimeout(hideTimeout);
        };
    }, [isVisible]);

    const handleVideoClick = () => {
        const video = videoRef.current;
        if (!video) return;

        userInteractedRef.current = true;

        if (video.paused) {
            video
                .play()
                .then(() => {
                    video.muted = false;
                    video.volume = 1;
                    setShowControls(true);
                    setTimeout(() => setShowControls(false), 2000);
                })
                .catch((err) => {
                    console.warn('Play failed:', err);
                });
        }
        else {
            video.muted = false;
            video.volume = 1;
            setShowControls(true);
        }
    };

    return (
        <video
            ref={videoRef}
            src={src}
            controls={showControls}
            preload="metadata"
            playsInline
            muted // начальное значение, отключается позже
            draggable={false}
            onClick={handleVideoClick}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                touchAction: 'manipulation',
            }}
        />
    );
};

export default VideoPlayer;
