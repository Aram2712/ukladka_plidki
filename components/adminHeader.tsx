'use client'
import type { TNavbar } from '@/types';
import '../styles/admin.css';
import { useGlobalContext } from '@/context/globalContext';

export default function AdminHeader() {

    const { adminHeader, setAdminHeader } = useGlobalContext();

    const changeContent = (item: TNavbar): void => {
        setAdminHeader(adminHeader.map((elem: TNavbar) =>
                elem.id === item.id
                ? { ...elem, isActive: true }
                : { ...elem, isActive: false }
            )
        );
    }

    return(
        <div className='admin-header'>
            {
                adminHeader.map(item => {
                    return (
                        <span 
                            key = { item.id }
                            className='admin-header-item'
                            onClick={() => changeContent(item)}
                            style={{
                                borderBottom: item.isActive ? "1px solid white" : "none"
                            }}
                        >
                            { item.title }
                        </span>
                    )
                })
            }    
        </div>
    )
}