
import '../../styles/admin.css';
import { AiFillDelete } from "react-icons/ai";
import { useState } from 'react';
import { getServices } from '../../api';
import { baseUrl } from '@/constants';
import type { TService } from '@/types';
import ConcretService from '../../components/cuncretService'
import AddService from '../../components/addService';
import useSWR from 'swr';
import { deleteService } from '../../api';
import  Loading from "../../components/loading"
// import { useGlobalContext } from '@/context/globalContext';

function AdminServices() {

    const [showAddService, setShowAddService] = useState<boolean>(false)
    const [showConcretService, setShowConcretService] = useState<boolean>(false);
    const [concretService, setConcretService] = useState<TService | null>(null);

    // const {services} = useGlobalContext();

    const { data, mutate, isLoading } = useSWR(`${baseUrl}/services`, getServices);

    const showCurrentService = (item: TService) => {
        setConcretService(item);
        setShowConcretService(true);
    }

    const deleteCurrentService = async (item: TService) => {
        if (item) {
            const response = await deleteService(`${baseUrl}/services/${item.id}`);
            if (response) await mutate();
        }
    }

    return (
        <div className='admin-orders-container'>
            <Loading loading = {isLoading}/>
            <table className='admin-order-table'>
                <thead>
                    <tr>
                        <td>Имя услуги</td>
                        <td>Удалить</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.data.map((item: TService) => (
                            // services.map((item: TService) => (
                            <tr key={item.id}>
                                <td style={{ cursor: 'pointer' }} onClick={() => showCurrentService(item)}>{item.title}</td>
                                <td>
                                    <AiFillDelete
                                        style={{ color: 'red', cursor: 'pointer' }}
                                        title='Удалить'
                                        onClick={() => deleteCurrentService(item)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='add-service-box'>
                <button
                    className='add-service-button'
                    onClick={() => setShowAddService(true)}
                >
                    Добавить услугу
                </button>
            </div>
            <AddService
                showAddService={showAddService}
                setShowAddService={setShowAddService}
            />
            <ConcretService
                showConcretService={showConcretService}
                setShowConcretService={setShowConcretService}
                concretService={concretService}
                setConcretService={setConcretService}
            />
        </div>
    )
}

export default AdminServices