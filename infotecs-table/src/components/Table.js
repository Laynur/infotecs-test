import React, { useState, useEffect } from 'react';

function Table() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

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


    return (
        <>
            <div className="table">
                <div className="table-header">
                    <h2>Таблица пользователей</h2>
                    <div className="table_search">
                        <label className="table_search_title">Поиск:</label>
                        <input
                            type="text"
                            placeholder="Введите"
                            name="table_search_input"
                            className="table_search_input"
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
                                <tr key={user.id}>
                                    <td>{user.firstName} {user.lastName}</td>
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
        </>
    );
}

export default Table;