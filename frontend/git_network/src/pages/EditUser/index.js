import React, { useState, useEffect } from 'react';
import api from './../../services/api';
import { Redirect } from 'react-router-dom';
import "./style.css";

function EditUser(props) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState([]);
    const [user_description, setUserDescription] = useState('');
    const { id } = props.match.params;

    useEffect(() => {
        async function mostrarUsuario() {
            const userTemp = await api.get(`/show_user/${id}`);

            setGithubUsername(userTemp.data.github_username);
            setTechs(userTemp.data.techs);
            setUserDescription(userTemp.data.description);
        }
        mostrarUsuario();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const data = {
            github_username,
            techs,
            user_description
        }

        const response = await api.put(`/edit_user/${id}`, data);
        console.log(response.data);
        if (response.data) {
            setTimeout(() => props.history.push("/"), 5000);
        }
        //Consertar problema do edit user
    };

    return (
        <div className="form-edit-user">
            <form onSubmit={handleSubmit}>
                <div className="fieldset">
                    <label htmlFor="username">Nome do usuário</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={github_username} 
                        onChange={event => setGithubUsername(event.target.value)} 
                        id="username"/>
                </div>
                <div className="fieldset">
                    <label htmlFor="techs">Tecnologias que domina</label>
                    <input 
                        type="text" 
                        name="techs" 
                        value={techs ? techs : ""}
                        placeholder={techs ? "" : "Sem tecnologias definidas."}
                        onChange={event => setTechs(event.target.value)}
                        id="techs"/>
                </div>
                <div className="fieldset">
                    <label htmlFor="user_description">Descrição</label>
                    <textarea
                        name="user_description" 
                        value={user_description ? user_description : ""} 
                        placeholder={
                            user_description ? 
                            "" : "O usuário não adicionou as tecnologias que domina."
                        }
                        onChange={event => setUserDescription(event.target.value)}
                        id="user_decription"
                        rows="10"
                        cols="20">
                    </textarea>
                </div>
                <div className="form-submit">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;