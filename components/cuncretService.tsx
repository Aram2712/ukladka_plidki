
import '../styles/services.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import { filesPath } from '@/constants';
import { TService } from '@/types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth: '95%',
  maxHeight: '90%',
  bgcolor: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  borderRadius: '10px',
  p: 2,
  border: 'none',
  outline: 'none',
  overflowY: 'scroll'
};


type TProps = {
    showConcretService: boolean
    setShowConcretService: (show: boolean) => void
    concretService: TService | null;
    setConcretService: (order: TService | null) => void
}

export default function ConcretService(props: TProps) {

    const { showConcretService, setShowConcretService, concretService, setConcretService } = props;

    const close = () => {
        setConcretService(null);
        setShowConcretService(false);
    }

    const imageList = concretService?.imagesPaths ? concretService?.imagesPaths.split(',') : null;


    return(
        <Modal
            open={showConcretService}
        >
            <Box sx = {style}>
                <IoMdClose 
                    className='close-modal-icon'
                    onClick={close}
                />
                <div className='concret-service-images-box'>
                    <div className='concret-service-data-box'>
                        <span className='modal-label-text'>Заголовка</span>
                        <span>{concretService?.title}</span>
                    </div>
                    <div className='concret-service-data-box'>
                        <span className='modal-label-text'>Описание</span>
                        <span>{concretService?.description}</span>
                    </div>
                    <div className='concret-service-data-box'>
                        <span className='modal-label-text'>Цена</span>
                        <span>{concretService?.price}</span>
                    </div>
                    <span className='modal-label-text'>Фото / видео</span>
                    {
                        imageList ?
                        imageList.map((item: string) => (
                            <Image
                                key = {item}
                                src={`${filesPath}/${item}`}
                                alt='Фото помещения'
                                width={350}
                                height={350}
                                style={{
                                    margin: "20px auto",
                                    maxWidth: '95%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                            // <span key = {item}>{item}</span>
                        )) 
                        :
                        <span>Нет фото</span>
                    }
                </div>
            </Box>
        </Modal>
    )
}