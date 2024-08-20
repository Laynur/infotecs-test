import React, { useState, useEffect } from 'react';
import Modal from './Modal';
function Table() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://dummyjson.com/users');
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            const data = await response.json();
            setUsers(data.users);
            setFilteredUsers(data.users);
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при загрузке данных пользователей.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = users.filter(user =>
                Object.values(user).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers(users);
        }
    }, [searchTerm, users]);


    const openModal = (user) =>{
        //alert("Открыто");
        setShowModal(true)
        setSelectedUser(user);
     
    }
    const closeModal = () =>{
        setShowModal(false)
        setSelectedUser(null);
    }


    return (
        <>
            <div className="table">
                <div className="table-header">
                    <div className="table_search">
                        <label className="table_search_title">Поиск:</label>
                        <input
                            type="text"
                            placeholder="Введите"
                            name="table_search_input"
                            className="table_search_input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Возраст</th>
                                <th>Пол</th>
                                <th>Номер телефона</th>
                                <th>Адрес</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr onClick={()=>openModal(user)} className='tabel-content-row' key={user.id}>
                                    <td>{user.firstName} {user.lastName} {user.maidenName}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address.city}, {user.address.street}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={showModal} onClose={closeModal} user={selectedUser} />
        </>
    );
}

export default Table;