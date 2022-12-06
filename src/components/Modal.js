import React from "react";
import "../css/modal.css"

export function Modal({ open, close }) {
  if (!open) return null;

  return (
    <div className="overlay">
      <div className="modalContainer">
        <div className="modalRight">
          <p className="closeButton" onClick={close}>
            X
          </p>
        </div>
        <p className="modalText">The verse above is saved in favourites!</p>
      </div>
    </div>
  );
}
