import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import instagramicon from './instagramicon.png'
import twittericon from './twittericon.png'
import emailicon from './emailicon.png'

const Pie = () => {

  return (
    <Navbar bg="dark" variant="dark" fixed='bottom' sticky='bottom'>
        <Container>
          <Navbar.Text>
            <a href='https://twitter.com/FirexPedro' target={"_blank"} rel={"noreferrer"}>
              <img
              alt=""
              src={twittericon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              />{' '}
              Twitter
            </a>
          </Navbar.Text>
          <Navbar.Text>
            <a href='https://www.instagram.com/pedromolden/' target={"_blank"} rel={"noreferrer"}>
              <img
              alt=""
              src={instagramicon}
              width="30"
              height="30"
              className="d-inline-block align-top"
              />{' '}
              Instagram
            </a>
          </Navbar.Text>
          <Navbar.Text>
            <img
            alt=""
            src={emailicon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            />{' '}
            pmollop@g.educaand.es
          </Navbar.Text>
        </Container>
      </Navbar>
  )
}

export default Pie