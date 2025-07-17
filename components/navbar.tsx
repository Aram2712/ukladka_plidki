
'use client'
import Link from 'next/link';
import '../styles/navbar.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/globalContext';
import { SlMenu } from "react-icons/sl";
import Signin from './signin';
import SignUp from './signup';
import UserWindow from './userWindow';
import Messenger from './messenger';
import MobileUserWindow from './mobileUserWindow';
import Forum from './forum';

export default function Navbar() {

    const { navbar, user, setUser } = useGlobalContext();
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [showUserWindow, setShowUserWindow] = useState<boolean>(false);
    const [showMessenger, setShowMessenger] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showForum, setShowForum] = useState<boolean>(false);

    useEffect(() => {
        const userData = localStorage.getItem('plidka_user');
        if(userData) {
            setUser(JSON.parse(userData));
        }
        else setUser(null)
    }, [])

    return(
        <div className='navbar-container'>
            <h2 className='navbar-head-text'>Питерский плиточник</h2>
            <div className='navogation-bar-container'>
                {
                    navbar.map((item, index) => (
                        <Link 
                            key={index} 
                            href={item.path} 
                            className='nav-link' 
                        >
                            {item.title}
                        </Link>
                    ))
                }
                {
                    user?.role === 'admin' &&
                    <Link 
                        href={'/admin'} 
                        className='nav-link' 
                    >
                        Админ
                    </Link>
                }
            
                {
                    user ? 
                        <div 
                            className='user-name-letter-box'
                            onClick={() => setShowUserWindow(true)}
                        >
                            { user.fullName[0].toUpperCase() }
                        </div>
                    :
                        <span
                            className='nav-link'
                            style={{
                                cursor: 'pointer',
                                marginLeft: '100px'
                            }}
                            onClick={() => setShowSignIn(true)}
                        >
                            Вход
                        </span>
                }
                
            </div>
            <div className='mobile-header-box'>
                <SlMenu 
                    style = {{
                        color: 'white',
                        fontSize: '30px'
                    }}
                    onClick={() => setShowMobileMenu(true)}
                />
                <MobileUserWindow
                    showMobile = {showMobileMenu}
                    setShowMobile = {setShowMobileMenu}
                    setShowMessenger = {setShowMessenger}
                    setShowForum = {setShowForum}
                />
            </div>       
            <Signin
                showSignin = { showSignIn }
                setShowSignin = { setShowSignIn }
                setShowSignup={setShowSignup}

            /> 
            <SignUp
                showSignup = {showSignup}
                setShowSignup={setShowSignup}
                setShowSignin={setShowSignIn}
            />
            <UserWindow
                showUserWindow = {showUserWindow} 
                setShowUserWindow = {setShowUserWindow}
                setShowMessenger = {setShowMessenger}
                setShowForum = {setShowForum}
            />
            <Messenger
                showMessenger = {showMessenger}
                setShowMessenger = {setShowMessenger}
            />
            <Forum
                showForum = { showForum }
                setShowForum = { setShowForum }
            />
        </div>
    )
}