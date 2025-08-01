
'use client'
import Link from 'next/link';
import '../styles/navbar.css';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/globalContext';
import { SlMenu } from "react-icons/sl";
import useSWRMutation from 'swr/mutation';
import { baseUrl } from '@/constants';
import { signin } from '../api'
import Signin from './signin';
import SignUp from './signup';
import UserWindow from './userWindow';
import Messenger from './messenger';
import MobileUserWindow from './mobileUserWindow';
import Forum from './forum';
import { TUser } from '@/types';

export default function Navbar() {

    const { navbar, user, setUser } = useGlobalContext();
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [showSignup, setShowSignup] = useState<boolean>(false);
    const [showUserWindow, setShowUserWindow] = useState<boolean>(false);
    const [showMessenger, setShowMessenger] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const [showForum, setShowForum] = useState<boolean>(false);

    const { trigger } = useSWRMutation(
        `${baseUrl}/auth/login`,
        async (url, { arg }: { arg: { phoneNumber: string, password: string } }) => signin(url, arg)
    );

    const getUser = async () => {

        const userData = localStorage.getItem('plidka_user');

        if (userData) {

            const loginedUser: TUser = JSON.parse(userData);
            const data = {
                phoneNumber: loginedUser.phoneNumber,
                password: loginedUser.password,
            }

            try {
                const result = await trigger(data);
                if (result.data) {
                    localStorage.setItem('plidka_user', JSON.stringify(result.data));
                    setUser(result.data);
                }
            }
            catch (err) {
                console.error(err);
            }
        }

        else setUser(null);
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
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
                            {user.fullName[0].toUpperCase()}
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
                    style={{
                        color: 'white',
                        fontSize: '30px'
                    }}
                    onClick={() => setShowMobileMenu(true)}
                />
                <MobileUserWindow
                    showMobile={showMobileMenu}
                    setShowMobile={setShowMobileMenu}
                    setShowMessenger={setShowMessenger}
                    setShowForum={setShowForum}
                    setShowSignIn={setShowSignIn}
                />
            </div>
            <Signin
                showSignin={showSignIn}
                setShowSignin={setShowSignIn}
                setShowSignup={setShowSignup}

            />
            <SignUp
                showSignup={showSignup}
                setShowSignup={setShowSignup}
                setShowSignin={setShowSignIn}
            />
            <UserWindow
                showUserWindow={showUserWindow}
                setShowUserWindow={setShowUserWindow}
                setShowMessenger={setShowMessenger}
                setShowForum={setShowForum}
            />
            <Messenger
                showMessenger={showMessenger}
                setShowMessenger={setShowMessenger}
            />
            <Forum
                showForum={showForum}
                setShowForum={setShowForum}
            />
        </div>
    )
}