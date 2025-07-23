
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { IconButton, Box } from '@mui/material';
import { Swiper as SwiperType } from 'swiper/types';
import VideoPlayer from './video';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Image from 'next/image';

type Props = {
    src: string;
    type: 'image' | 'video' | "unknown";
    ref: React.MutableRefObject<SwiperType | null>;
};

export const ZoomableSlide: React.FC<Props> = ({ src, type, ref }) => {

    return (
        <Box
            position="relative"
            width="100%"
            height="100dvh"
            overflow="hidden"
            sx={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'none',
            }}
        >
            <TransformWrapper
                wheel={{ step: 0.2 }}
                doubleClick={{ disabled: true }}
                panning={{ disabled: false }}
                pinch={{ disabled: false }}
                zoomAnimation={{ disabled: true }}
            >
                {({ zoomIn, zoomOut }) => (
                    <>
                        <Box position="absolute" top={0} left={0} zIndex={10}>
                            <IconButton
                                onClick={() => {
                                    if (ref.current) {
                                        ref.current.allowTouchMove = true;
                                        ref.current.update();
                                        zoomOut(1)
                                    }
                                }}
                            >
                                <ZoomOutIcon
                                    style={{
                                        color: 'white',
                                        fontSize: '32px',
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    if (ref.current) {
                                        ref.current.allowTouchMove = false;
                                        ref.current.update()
                                        zoomIn();
                                    }
                                }}
                            >
                                <ZoomInIcon
                                    style={{
                                        color: 'white',
                                        fontSize: '32px',
                                        WebkitTapHighlightColor: 'transparent',
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <TransformComponent
                            wrapperStyle={{
                                width: '100%',
                                height: '100%',
                                cursor: 'grab',
                                touchAction: 'none',
                            }}
                            contentStyle={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                WebkitUserSelect: 'none',
                                userSelect: 'none',
                            }}
                        >
                            {type === 'image' ? (
                                <Image
                                    src={src}
                                    alt="zoomable"
                                    className="modal-media"
                                    width={1000}
                                    height={1000}
                                    style={{
                                        // display: 'block',
                                        pointerEvents: 'auto',
                                        userSelect: 'none',
                                    }}

                                    draggable={false}
                                />
                            ) : (
                                <VideoPlayer
                                    src={src}
                                />
                            )}
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </Box>
    );
};
