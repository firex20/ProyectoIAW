import Form from 'react-bootstrap/Form';

const Login = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="LogginUser">
        <Form.Label>Usuario/Email</Form.Label>
        <Form.Control autoFocus type="email" placeholder="Escribe el usuario o email..." />
        <Form.Text className="text-muted">
          No compartas tu clave con nadie!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="LogginPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña..." />
      </Form.Group>
      <Form.Group className="mb-3" controlId="LogginRemember">
        <Form.Check type="checkbox" label="Recuerdame" />
      </Form.Group>
    </Form>
  );
}

export default Login;