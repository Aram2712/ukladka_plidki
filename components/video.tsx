
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
            {
                threshold: 0.5,
            }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!videoRef.current) return;

        if (isVisible) {
            videoRef.current.play().catch(() => { });
        }
        else {
            videoRef.current.pause();
        }
    }, [isVisible]);

    return (
        <video
            ref={videoRef}
            src={src}
            muted
            autoPlay={true}
            controls={true}
            preload="metadata"
            playsInline
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