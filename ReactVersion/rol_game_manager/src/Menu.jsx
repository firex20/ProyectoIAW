import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import icon from "./icon.png";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginButtons from './LoginButtons';
import DefaultProfilePic from './DefaultProfile.png'

const Menu = ({setLogged, logged, usrname}) => {

    return (
        <>
        {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                alt="Inicio"
                src={icon}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              RolManager
            </Navbar.Brand>
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
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="top"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>)
}

export default Menu;