
import '../../styles/admin.css';
import { AiFillDelete } from "react-icons/ai";
import { useState } from 'react';
import { baseUrl } from '@/constants';
import { TPrice } from '../../types';
import { getAllPrices, deletePrice } from '../../api';
import useSWR from 'swr';
import Loading from "../../components/loading"
import AddPrice from '../../components/addPriceList'

function AdminPriceList() {

    const { data, mutate, isLoading } = useSWR(`${baseUrl}/priceList`, getAllPrices);

    const [showAddPrice, setShowAddPrice] = useState<boolean>(false);

    const deleteCurrentPrice = async (item: TPrice) => {
        if (item) {
            const response = await deletePrice(`${baseUrl}/priceList/${item.id}`);
            if (response) await mutate();
        }
    }

    return (
        <div className='admin-orders-container'>
            <Loading loading={isLoading} />
            <AddPrice
                showAddPrice={showAddPrice}
                setShowAddPrice={setShowAddPrice}
            />
            <table className='admin-order-table'>
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Цена</td>
                        <td>Удалить</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.data.map((item: TPrice) => (
                            <tr key={item.id}>
                                <td >{item.title}</td>
                                <td >{item.price}</td>
                                <td>
                                    <AiFillDelete
                                        style={{ color: 'red', cursor: 'pointer' }}
                                        title='Удалить'
                                        onClick={() => deleteCurrentPrice(item)}
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
                    onClick={() => setShowAddPrice(true)}
                >
                    Добавить
                </button>
            </div>
        </div>
    )
}

export default AdminPriceList
