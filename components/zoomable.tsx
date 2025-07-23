
import React from 'react';
import Image from 'next/image';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { IconButton, Box } from '@mui/material';
// import { Swiper as SwiperType } from 'swiper/types';

type Props = {
    src: string;
    // type: 'image' | 'video' | "unknown";
    // ref: React.MutableRefObject<SwiperType | null>;
};

export const ZoomableSlide: React.FC<Props> = ({ src }) => {

    return (
        <Box
            position="relative"
            width="100%"
            height="100vh"
            overflow="hidden"
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
                                    zoomOut(1)

                                    // if (ref.current) {
                                    //     ref.current.allowTouchMove = true;
                                    //     ref.current.update();
                                    //     zoomOut(1)
                                    // }
                                }}
                            >
                                <ZoomOutIcon
                                    style={{
                                        color: 'white',
                                        fontSize: '32px'
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    zoomIn();

                                    // if (ref.current) {
                                    //     ref.current.allowTouchMove = false;
                                    //     ref.current.update()
                                    //     zoomIn();
                                    // }
                                }}
                            >
                                <ZoomInIcon
                                    style={{
                                        color: 'white',
                                        fontSize: '32px'
                                    }}
                                />
                            </IconButton>
                        </Box>
                        <TransformComponent
                            wrapperStyle={{
                                width: '100%',
                                height: '100%',
                                cursor: 'grab',
                            }}
                            contentStyle={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {/* {type === 'image' ? ( */}
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
                            {/* ) : (
                                <video
                                    src={src}
                                    controls={true}
                                    autoPlay
                                    muted
                                    playsInline
                                    className="modal-media"
                                    style={{
                                        userSelect: 'none',
                                        pointerEvents: 'auto',
                                    }}
                                    draggable={false}
                                />
                            )} */}
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </Box>
    );
};