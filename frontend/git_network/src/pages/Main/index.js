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
    }, [users]);

    async function saveUser(data) {
        const response = await api.post('/', data);

        console.log(response.data);
        setUsers([...users, response.data]);
    }

    async function handleFavorite(id) {
        const [userTemp] = await users.filter(user => 
            ((user._id === id) ? user : null));
        console.log(userTemp);
        if (userTemp) {
            userTemp.favorite = !userTemp.favorite;

            const response = await api.put(`/edit_user/${id}`, userTemp);
    
            setUsers([...users, response.data]);
        }

    }

    async function handleDelete(id) {
        const [userTemp] = await users.filter(user => 
            ((user._id === id) ? user : null));
        if (userTemp) {
            const response = await api.delete(`/delete_user/${id}`);
            console.log(response.data);
        }
    }

    return (
        <>
            <div className="main-users">
                <FormUser onSubmit={saveUser}/>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar_url} alt="foto do usuário"/>
                            <div className="user-content">
                                <div className="user-info">
                                    <strong>{user.github_username}</strong>
                                    <p id="user-techs">{user.techs}</p>
                                    <p id="user-description">{user.description}</p>
                                    <a 
                                        href={user.profile_url} 
                                        target="_blank">Acessar perfil Github
                                    </a>
                                </div>
                                <div className="user-actions">
                                    <strong onClick={() => handleFavorite(user._id)}>
                                        { user.favorite ? <i>&#9733;</i> : <i>&#9734;</i> }
                                    </strong>
                                    <strong onClick={() => handleDelete(user._id)}>
                                        <i className="glyphicon">&#xe020;</i>
                                    </strong>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Main;