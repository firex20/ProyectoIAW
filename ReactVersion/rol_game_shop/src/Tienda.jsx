import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Producto from './Producto';

const Tienda = ({addtocart}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL+"/products.json", {method: 'GET', mode: 'no-cors', headers: {'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .then((resj) => setProducts(resj))
    }, [])

    return (
        <Container fluid>
            <Row md={4}>
                {products.map((product, key) =>{ return(<Producto key={key} productinfo={product} addtocart={addtocart}/>)})}
            </Row>
        </Container>
    );
}

export default Tienda;