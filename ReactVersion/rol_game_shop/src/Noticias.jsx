import Container from "react-bootstrap/esm/Container";
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from "react";


const Noticias = () =>{

  const [notices, setNotices] = useState([])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL+"/notices/notices.json", {method: 'GET', mode: 'no-cors', headers: {'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .then((resjson) => setNotices(resjson))
}, [])

    return(
        <Container fluid>
            <Carousel fade style={{ width: "95vw", height:"83.7vh", marginLeft: "36px"}}>
            {notices.map((notice, key) => {return(
              <Carousel.Item key={key} style={{border: "2px solid red", borderRadius: "10px"}}>
              <img
                style={{ objectFit: "cover", width: "1820px", height: "770px", borderRadius: "10px"}}
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