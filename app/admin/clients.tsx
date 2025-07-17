
import '../../styles/admin.css';
import { AiFillDelete } from "react-icons/ai";
import { getAllUsers } from '../../api';
import { baseUrl } from '@/constants';
import useSWR from 'swr';
import { TUser } from '@/types';
import { deleteUser } from '../../api';
import { useGlobalContext } from '@/context/globalContext';

function AdminClients() {

    const { clients } = useGlobalContext()

    // const { data, mutate } = useSWR(`${baseUrl}/auth/users`, getAllUsers);
    
    function formatPhoneNumber(input: string): string {
        const cleaned = input.replace(/\D/g, '')

        if (cleaned.length !== 11 || !cleaned.startsWith('7')) {
            return input // если невалидный формат — вернуть как есть
        }

        const code = cleaned.slice(1, 4)
        const part1 = cleaned.slice(4, 7)
        const part2 = cleaned.slice(7, 9)
        const part3 = cleaned.slice(9, 11)

        return `+7 (${code}) ${part1}-${part2}-${part3}`
    }

    // const deleteCurrentUser = async (user: TUser) => {
    //     if (user) {
    //         const response = await deleteUser(`${baseUrl}/auth/users/${user.id}`);
    //         if(response) await mutate();
    //     }
    // }

    return(
        <div className='admin-orders-container'>
            <table className='admin-order-table'>
                <thead>
                    <tr>
                        <td>Имя</td>
                        <td>Номер телефона</td>
                        <td>Удалить</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        // data?.data.map((user:TUser, index: number) => (
                        clients?.filter(client=>client.role !== 'admin').map((user:TUser, index: number) => (
                            <tr key = {index}>
                                <td>{user.fullName}</td>
                                <td>{formatPhoneNumber(user.phoneNumber)}</td>
                                <td>
                                    <AiFillDelete 
                                        style = {{color: 'red', cursor: 'pointer'}}
                                        title='Удалить'
                                        // onClick={() => deleteCurrentUser(user)}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminClients