import React from 'react';
import "./style.css";

function Modal(props) {
    if (!props.show) return null;
    return (
        <div className="backdrop">
            <h1>O usuário não existe ou foi digitado incorretamente!</h1>
            <button onClick={props.onClose}><strong>&times;</strong></button>
      </div>
    );
}

export default Modal;