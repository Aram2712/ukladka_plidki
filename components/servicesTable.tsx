'use client'
import '../styles/services.css';
import { IoCall } from "react-icons/io5";
import { BsWhatsapp } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import type { TPrice } from '../types';
import { baseUrl } from '@/constants';
import { getAllPrices } from '../api';
import useSWR from 'swr';
// import { useGlobalContext } from '@/context/globalContext';


export default function ServicesTable() {

    const currentYear = new Date().getFullYear();

    // const { services } = useGlobalContext()

    const { data } = useSWR(`${baseUrl}/priceList`, getAllPrices);

    return(
        <div className='services-table'>
            {
                data?.data.map((item: TPrice) => (
                // services.map((item: TService) => (
                    <div className='service-elem-container' key = {item.id}>
                        <span>{item.title}</span>
                        <span>{item.price}</span>
                    </div>
                ))
            }
            <div className='services-page-buttons-box'>
                <a href="tel:+79119296767" target='_self' className='services-page-buttons'>
                    <IoCall/>
                </a>
                <a href='https://wa.me/+79119296767' target='_blank' className='services-page-buttons'>
                    <BsWhatsapp/>
                </a>
                <a href='https://t.me/c/2445053829/3' target='_blank' className='services-page-buttons'>
                    <FaTelegramPlane />
                </a>
            </div>
            <div className='services-page-footer-box'>
                © 2021 - { currentYear } Питерский плиточник
            </div>
        </div>
    )
}

