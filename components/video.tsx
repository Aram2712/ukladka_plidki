import { useEffect, useRef, useState } from 'react';

type TProps = {
    src: string;
};

const VideoPlayer = ({ src }: TProps) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showControls, setShowControls] = useState(true);

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

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let hideTimeout: ReturnType<typeof setTimeout> | null = null;

        const playVideo = () => {
            video.muted = true;

            video
                .play()
                .then(() => {
                    setShowControls(true);

                    // Автоматически скрыть контролы
                    hideTimeout = setTimeout(() => {
                        setShowControls(false);
                    }, 2000);

                    // Через секунду включить звук
                    setTimeout(() => {
                        video.muted = false;
                        video.volume = 1;
                    }, 1000);
                })
                .catch((err) => {
                    console.warn('Autoplay failed', err);
                });
        };

        if (isVisible) {
            if (video.readyState >= 3) {
                playVideo();
            }
            else {
                video.addEventListener('canplay', playVideo, { once: true });
            }
        }
        else {
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
            // Видео играет, показать контролы и включить звук
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
            muted
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
