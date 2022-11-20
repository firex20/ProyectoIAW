import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Login = ({register}) => {

  return (
    <Carousel activeIndex={register ? 1 : 0} controls={false} interval={null}>
      <Carousel.Item>
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
      </Carousel.Item>
      <Carousel.Item>
        <Form>
          <FloatingLabel controlId="RegisterName" label="Nombre" className="mb-3">
            <Form.Control type="text" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel controlId="RegisterSurname" label="Apellidos" className="mb-3">
            <Form.Control type="text" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel controlId="RegisterUser" label="Nickname" className="mb-3">
            <Form.Control type="text" placeholder="Password" />
          </FloatingLabel>
          <FloatingLabel controlId="RegisterEmail" label="Email address" className="mb-3">
            <Form.Control type="email" placeholder="Correo Electronico" />
          </FloatingLabel>
          <FloatingLabel controlId="RegisterPassword" label="Contraseña" className="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
        </Form>
      </Carousel.Item>
    </Carousel>
  );
}

export default Login;