import Container from "react-bootstrap/esm/Container";
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from "react";


const Noticias = ({phpUrl}) =>{

  const [notices, setNotices] = useState([])

  useEffect(() => {
      const request = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ action: 'getNotices' })
      }
      fetch(phpUrl, request)
      .then((res) => res.json())
      .then((resj) => {
        setNotices(resj)
      })
  }, [phpUrl])

    return(
        (notices !== []) && <Container fluid>
            <Carousel fade style={{ width: "95vw", height:"83.5vh", marginLeft: "36px"}}>
            {notices.map((notice, key) => {return(
              <Carousel.Item key={key} style={{border: "2px solid rgb(233, 110, 216)", borderRadius: "10px"}}>
              <img
                style={{ objectFit: "cover", width: "1820px", height: "750px", borderRadius: "10px"}}
                src={process.env.PUBLIC_URL+"/notices/images/"+notice.image}
                alt={notice.title}
              />
              <Carousel.Caption>
                <h3>{notice.title}</h3>
                <p>{notice.body}</p>
              </Carousel.Caption>
            </Carousel.Item>
            )})}
          </Carousel>
        </Container>
    )
}

export default Noticias;