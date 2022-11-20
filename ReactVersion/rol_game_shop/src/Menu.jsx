import {LinkContainer} from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon from "./icon.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginButtons from './LoginButtons';
import DefaultProfilePic from './DefaultProfile.png'
import { useState } from 'react';

const Menu = ({setLogged, logged, usrname}) => {

  const [canvasshow, setCanvasshow] = useState(false)

    return (
        <>
        {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3" fixed='top'>
          <Container fluid>
            <LinkContainer to="/RolShop">
              <Navbar.Brand href="#home">
                <img
                  alt="Inicio"
                  src={icon}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                RolShop
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Text>
            {logged ? <><img
                alt="Perfil"
                src={DefaultProfilePic}
                width="40"
                height="40"
                className="d-inline-block align-top"
                style={{float: "left", marginTop: "5px"}}
              />
              <p style={{float: "left", fontSize: "30px", marginTop: "1px", marginBottom: "1px", marginLeft: "15px", marginRight: "10px", height: "20px"}}>Hola {usrname}!</p>
              <LoginButtons logged="false" setLogged={setLogged} style={{marginTop: "5px", float: "left"}}/></> : ""}
            </Navbar.Text>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() =>{setCanvasshow(!canvasshow)}}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={canvasshow}
              onHide={() =>{setCanvasshow(false)}}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <LinkContainer to="/RolShop">
                    <Nav.Link onClick={() =>{setCanvasshow(false)}}>Noticias</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="Tienda">
                    <Nav.Link onClick={() =>{setCanvasshow(false)}}>Tienda</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title="Carrito"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item>
                      Carrito
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      Boton checkout
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>)
}

export default Menu;