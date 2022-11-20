import Modal from 'react-bootstrap/Modal';
import ReactDOM from "react-dom";

const contenedor = document.querySelector("#popups");

const Popup = ({titulo, cabecera, cuerpo, pie, visible, backdrop, onHide, closeButton}) => {
  if(!backdrop){backdrop=true}
  if(closeButton === undefined){closeButton = false}

  return (
      ReactDOM.createPortal (
      <Modal show={visible} backdrop={backdrop} onHide={onHide} centered>
        <Modal.Header closeButton={closeButton}>
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