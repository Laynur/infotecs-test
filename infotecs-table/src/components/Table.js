import React, { useState, useEffect } from 'react';
import Modal from './Modal';

function Table() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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
        let filtered = [...users];
        if (searchTerm) {
            filtered = users.filter(user =>
                Object.values(user).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                let aValue, bValue;

                if (sortConfig.key === 'fullName') {
                    aValue = `${a.firstName} ${a.lastName} ${a.maidenName}`;
                    bValue = `${b.firstName} ${b.lastName} ${b.maidenName}`;
                } else if (sortConfig.key === 'address') {
                    aValue = `${a.address.city}, ${a.address.street}`;
                    bValue = `${b.address.city}, ${b.address.street}`;
                } else {
                    aValue = a[sortConfig.key];
                    bValue = b[sortConfig.key];
                }

                if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }

        setFilteredUsers(filtered);
    }, [searchTerm, users, sortConfig]);

    const openModal = (user) => {
        setShowModal(true);
        setSelectedUser(user);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        } else if (
            sortConfig.key === key &&
            sortConfig.direction === 'descending'
        ) {
            direction = null;
        }

        setSortConfig({ key, direction });
    };

    const getSortDirection = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? '↑' : sortConfig.direction === 'descending' ? '↓' : '';
        }
        return '';
    };
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
                                <th onClick={() => requestSort('fullName')}>
                                    ФИО {getSortDirection('fullName')}
                                </th>
                                <th onClick={() => requestSort('age')}>
                                    Возраст {getSortDirection('age')}
                                </th>
                                <th onClick={() => requestSort('gender')}>
                                    Пол {getSortDirection('gender')}
                                </th>
                                <th>Номер телефона</th>
                                <th onClick={() => requestSort('address')}>
                                    Адрес {getSortDirection('address')}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr onClick={() => openModal(user)} className='tabel-content-row' key={user.id}>
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
