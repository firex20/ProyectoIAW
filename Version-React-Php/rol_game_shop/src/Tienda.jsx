import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Producto from './Producto';

const Tienda = ({addtocart, phpUrl}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ action: 'getProducts' }),
            credentials: 'include'
        }

        fetch(phpUrl, request)
        .then((res) => res.json())
        .then((resj) => {
            setProducts(resj)
        })
    }, [phpUrl])

    return (
        (products.length !== []) && (products.length !== 0) && <Container fluid>
            <Row md={4} justify="center">
                {products.map((product, key) =>{ return(<Producto key={key} productinfo={product} addtocart={addtocart}/>)})}
            </Row>
        </Container>
    );
}

export default Tienda;