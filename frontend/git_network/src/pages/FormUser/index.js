import React, { useState } from 'react';
import axios from 'axios';
import Modal from '../../components/Modal';
import "./style.css";

function FormUser({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechs] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        
        const user = await axios.get(`https://api.github.com/users/${github_username}`)
        .catch(error => showOrHiddenModal());
        
        if(user) {
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
    }

    async function showOrHiddenModal() {
        setIsOpen(!isOpen);
    }
        
        return (
            <>
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
                <Modal show={isOpen} onClose={showOrHiddenModal}/>
            </>
    );
}

export default FormUser;