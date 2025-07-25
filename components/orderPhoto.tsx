
import '../styles/signin.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import { filesPath } from '@/constants';
import { TOrder } from '@/types';

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
    showOrderPhoto: boolean
    setShowOrderPhoto: (show: boolean) => void
    concretOrder: TOrder | null;
    setConcretOrder: (order: TOrder | null) => void
}

export default function OrderPhoto(props: TProps) {

    const { showOrderPhoto, setShowOrderPhoto, concretOrder, setConcretOrder } = props;

    const close = () => {
        setConcretOrder(null);
        setShowOrderPhoto(false);
    }

    const imageList = concretOrder?.imagesPath ? concretOrder?.imagesPath.split(',') : null;
    console.log(concretOrder);

    return(
        <Modal
            open={showOrderPhoto}
        >
            <Box sx = {style}>
                <IoMdClose 
                    className='close-modal-icon'
                    onClick={close}
                />
                <div className=''>
                    {
                        imageList ?
                        imageList.map((item: string) => (
                            <Image
                                key = {item}
                                src={`${filesPath}/${item}`}
                                // src={item}
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
                        )) 
                        :
                        <span>Нет фото</span>
                    }
                </div>
            </Box>
        </Modal>
    )
}