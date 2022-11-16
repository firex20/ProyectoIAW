import Alert from 'react-bootstrap/Alert';

const Alerta = ({show, style, msg}) => {
  return (
    <Alert show={show} transition style={style} key='danger' variant='danger'>{msg}</Alert>
  );
}

export default Alerta;