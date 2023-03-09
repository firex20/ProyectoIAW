import {LinkContainer} from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon from "./icon.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginButtons from './LoginButtons';
import DefaultProfilePic from './DefaultProfile.png'
import Carrito from './Carrito';

const Menu = ({resetcart, setLogged, logged, usrname, cart, delfromcart, canvasshow, setCanvasshow, checkout, phpUrl, remember, cartitems, cartprice}) => {

    return (
        <>
        {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3" fixed='top'>
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand href="#home">
                <img
                  alt="Inicio"
                  src={icon}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
                {' '}
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
              <LoginButtons resetcart={resetcart} remember={remember} phpUrl={phpUrl} logged="false" setLogged={setLogged} style={{marginTop: "5px", float: "left"}}/></> : ""}
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
                  <LinkContainer to="/">
                    <Nav.Link onClick={() =>{setCanvasshow(false)}}>Noticias</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="Tienda">
                    <Nav.Link onClick={() =>{setCanvasshow(false)}}>Tienda</Nav.Link>
                  </LinkContainer>
                  <NavDropdown
                    title={"Carrito "+cartitems}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    autoClose={false}
                  >
                    <NavDropdown.ItemText>
                      <Carrito cart={cart} delfromcart={delfromcart} modifable={true}/>
                    </NavDropdown.ItemText>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Button onClick={() => checkout()} style={{ marginRight: "100px"}}>Checkout</Button>
                      <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.5em", color: "green"}}>{cartprice} €</p>
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