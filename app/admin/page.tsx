
'use client'
import '../../styles/admin.css';
import AdminHeader from '@/components/adminHeader';
import AdminOrders from './orders';
import AdminServices from './adminServices';
import AdminUsers from './clients';
import AdminPriceList from './priceList'
import { useGlobalContext } from '@/context/globalContext';
import { SiMessenger } from "react-icons/si";
import { useState } from 'react';
import AdminMessenger from './adminMessenger';
import { getAllUsers } from '../../api';
import { baseUrl } from '@/constants';
import useSWR from 'swr';

export default function AdminPage() {

    const { adminHeader } = useGlobalContext();
    const activeHeader = adminHeader.find(item => item.isActive)
    const [showMessenger, setShowMessenger] = useState<boolean>(false);

    const { data } = useSWR(`${baseUrl}/auth/users`, getAllUsers);

    return(
        <div className='admin-page'>
            <AdminHeader/>
            {
                activeHeader?.title === "Заявки" ?
                <AdminOrders/>
                :
                activeHeader?.title === "Услуги" ?
                <AdminServices/>
                :
                activeHeader?.title === "Прайсы" ?
                <AdminPriceList/>
                :
                <AdminUsers/>
            }
            <SiMessenger className='admin-messenger-icon' onClick={() => setShowMessenger(true)}/>
            <AdminMessenger
                showMessenger = {showMessenger}
                setShowMessenger = {setShowMessenger}
                users = {data?.data}
            />
        </div>
    )
}