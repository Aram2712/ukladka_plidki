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

        if (isVisible) {
            const playVideo = () => {
                video
                    .play()
                    .then(() => {
                        setShowControls(true);
                        hideTimeout = setTimeout(() => {
                            setShowControls(false);
                        }, 2000);
                    })
                    .catch((err) => {
                        console.warn('Autoplay failed', err);
                    });
            };

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
                    setShowControls(true);
                    setTimeout(() => setShowControls(false), 2000);
                })
                .catch((err) => {
                    console.warn('Play failed:', err);
                });
        }
        else {
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