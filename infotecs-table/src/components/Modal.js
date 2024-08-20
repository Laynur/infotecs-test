import React from "react";
function Modal({ isOpen, onClose, user }) {
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <h2>{user.firstName} {user.lastName} {user.maidenName}</h2>
          <p>Возраст: {user.age}</p>
          <p>Адрес: {user.address.city}, {user.address.address}</p>
          <p>Рост: {user.height}</p>
          <p>Вес: {user.weight}</p>
          <p>Номер телефона: {user.phone}</p>
          <p>Email-адрес: {user.email}</p>
        </div>
      </div>
    );
  }
export default Modal;