
import '../../styles/admin.css';
import { AiFillDelete } from "react-icons/ai";
import { getOrders } from '../../api';
import { baseUrl } from '@/constants';
import type { TOrder } from '../../types';
import { useState } from 'react';
import { deleteOrder } from '../../api';
import OrderPhoto from '../../components/orderPhoto';
import useSWR from 'swr';
import Loading from '@/components/loading';
// import { useGlobalContext } from '@/context/globalContext';

function AdminOrders() {

    // const {orders} = useGlobalContext();

    const { data, mutate, isLoading } = useSWR(`${baseUrl}/orders`, getOrders);

    const [showOrderPhoto, setShowOrderPhoto] = useState<boolean>(false);
    const [concretOrder, setConcretOrder] = useState<TOrder | null>(null);

    const showCurrentPhoto = (item: TOrder) => {
        setConcretOrder(item);
        setShowOrderPhoto(true);
    }

    function formatPhoneNumber(input: string): string {
        const cleaned = input.replace(/\D/g, '') // Удаляем всё кроме цифр

        if (cleaned.length !== 11 || !cleaned.startsWith('7')) {
            return input // если невалидный формат — вернуть как есть
        }

        const code = cleaned.slice(1, 4)
        const part1 = cleaned.slice(4, 7)
        const part2 = cleaned.slice(7, 9)
        const part3 = cleaned.slice(9, 11)

        return `+7 (${code}) ${part1}-${part2}-${part3}`
    }

    const deleteCurrentOrder = async (item: TOrder) => {
        if (item) {
            const response = await deleteOrder(`${baseUrl}/orders/delete/${item.id}`);
            if (response) await mutate();
        }
    }

    return (
        <div className='admin-orders-container'>
            <Loading  loading = {isLoading}/>
            <table className='admin-order-table'>
                <thead>
                    <tr>
                        <td>Размер</td>
                        <td>Номер</td>
                        <td>Фото</td>
                        <td>Удалить</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.data.map((item: TOrder) => (
                            // orders.map((item: TOrder) => (
                            <tr key={item.id}>
                                <td>{item.square}</td>
                                <td>{formatPhoneNumber(item.phoneNumber)}</td>
                                <td style={{ cursor: 'pointer' }} onClick={() => showCurrentPhoto(item)}>Посмотреть</td>
                                <td><AiFillDelete title='Удалить' style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteCurrentOrder(item)} /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <OrderPhoto
                showOrderPhoto={showOrderPhoto}
                setShowOrderPhoto={setShowOrderPhoto}
                concretOrder={concretOrder}
                setConcretOrder={setConcretOrder}
            />
        </div>
    )
}

export default AdminOrders