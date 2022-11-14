import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ReactDOM from "react-dom";

const contenedor = document.querySelector("#popups");

const Popup = ({titulo, cabecera, cuerpo, pie, visible, backdrop}) => {
  if(!backdrop){backdrop=true}

  return (
      ReactDOM.createPortal (
      <Modal show={visible} backdrop={backdrop} centered>
        <Modal.Header>
          <Modal.Title>{titulo}</Modal.Title>
          {cabecera}
        </Modal.Header>
        <Modal.Body>{cuerpo}</Modal.Body>
        <Modal.Footer>{pie}</Modal.Footer>
      </Modal>
    , contenedor)
  );
}

export default Popup;