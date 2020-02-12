import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import "./style.css";
import FormUser from '../FormUser';

function Main() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function mostrarUsers() {
            //Lembrar de passar o parametro page na url
            const response = await api.get('/users');
            setUsers(response.data.docs);
        }
        mostrarUsers();
    }, [saveUser]);

    async function saveUser(data) {
        const response = await api.post('/', data);

        console.log(response.data);
        setUsers([...users, response.data]);
    }

    return (
        <>
            <div className="main-users">
                <FormUser onSubmit={saveUser}/>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar_url} alt="foto do usuário"/>
                            <div className="user-info">
                                <strong>{user.github_username}</strong>
                                <p id="user-techs">{user.techs}</p>
                                <p id="user-description">{user.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Main;