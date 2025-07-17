'use client'
import '../styles/navbar.css';
import React from 'react';
import { Modal, Backdrop, Box, Slide } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { useGlobalContext } from '@/context/globalContext';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const style = {
  position: 'absolute',
  top: 0,
  right: 0,
  width: '100%',
  height: 400,
  bgcolor: 'black',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  //   borderRadius: '10px',
  p: 2,
  display: "flex",
  flexDirection: 'column',
  alignItems: 'flex-end',
  border: 'none',
  outline: 'none'
};

type TProps = {
  showMobile: boolean
  setShowMobile: (show: boolean) => void
  setShowMessenger: (show: boolean) => void
  setShowForum: (show: boolean) => void
  setShowSignIn: (show: boolean) => void
}

export default function MobileUserWindow(props: TProps) {

  const { showMobile, setShowMobile, setShowMessenger, setShowForum, setShowSignIn } = props
  const { navbar, user, setUser } = useGlobalContext();
  const router = useRouter();

  const close = () => {
    setShowMobile(false)
  }

  const logout = () => {
    localStorage.removeItem('plidka_user');
    setUser(null); // сброс контекста
    router.push('/');
    close()
  }

  return (
    <Modal
      open={showMobile}
      onClose={close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Slide in={showMobile}>
        <Box sx={style}>
          <IoMdClose
            className='close-modal-icon'
            style={{
              color: 'white'
            }}
            onClick={close}
          />
          {
            user &&
            <span
              className='mobile-nav-link'
              style={{
                textAlign: 'center',
                borderBottom: 'none',
                fontSize: '24px',
                fontWeight: 700
              }}
            >
              {user.fullName}
            </span>
          }
          {
            navbar.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className='mobile-nav-link'
                onClick={() => close()}
              >
                {item.title}
              </Link>
            ))
          }
          {
            user?.role === 'admin' &&
            <Link
              href={'/admin'}
              className='mobile-nav-link'
              onClick={() => close()}
            >
              Админ
            </Link>
          }
          {
            user && user.role !== 'admin' &&
            <span className='mobile-nav-link' onClick={() => {
              setShowMessenger(true);
              close();
            }}>
              Messenger
            </span>
          }
          {
            user &&
            <span className='mobile-nav-link' onClick={() => {
              setShowForum(true);
              close();
            }}>
              Форум
            </span>
          }
          {
            user ?
              <span className='mobile-nav-link'
                onClick={() => {
                  logout();
                }}
              >
                Выйти
              </span>
              :
              <span
                className='mobile-nav-link'
                onClick={() => {
                  setShowSignIn(true);
                  close();
                }}
              >
                Вход
              </span>
          }
        </Box>
      </Slide >
    </Modal>
  )
}