import Alert from 'react-bootstrap/Alert';

const Alerta = ({show, style, msg, color}) => {
  return (
    <Alert show={show} transition style={style} key='alert' variant={color}>{msg}</Alert>
  );
}

export default Alerta;