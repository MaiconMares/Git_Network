import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.css";

function FormUser({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user = await axios.get(`https://api.github.com/users/${github_username}`);

        console.log(user.data.bio);
        console.log({
            github_username: user.data.name ? user.data.name : github_username,
            description: user.data.bio,
            avatar_url: user.data.avatar_url,
            techs});

        await onSubmit({
            github_username: user.data.name ? user.data.name : github_username,
            description: user.data.bio,
            avatar_url: user.data.avatar_url,
            techs,
            profile_url: user.data.html_url,
        });
    }

    return (
        <div className="form-user">
            <form onSubmit={handleSubmit}>
                <div className="fieldset">
                    <label htmlFor="github_username">Usuário github</label>
                    <input 
                        type="text" 
                        name="github_username" 
                        id="github_username"
                        value={github_username}
                        onChange={event => setGithubUsername(event.target.value)}
                        required/>
                </div>
                <div className="fieldset">
                    <label htmlFor="techs">Tecnologias que domina</label>
                    <input 
                        type="text" 
                        name="techs" 
                        value={techs}
                        onChange={event => setTechs(event.target.value)}
                        id="techs"/>
                </div>
                <div className="form-submit">
                    <button type="submit">Cadastrar</button>
                </div>
            </form>
        </div>
    );
}

export default FormUser;