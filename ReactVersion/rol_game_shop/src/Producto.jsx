import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

const Producto = ({productinfo, addtocart}) =>{

    return (
        <Col>
            <Card className='resaltar' style={{ width: '400px', marginBottom: "15px", marginLeft:"30px", border:"1px solid rgb(233, 110, 216)"}} bg="dark" text="white">
                <Card.Img variant="top" src={process.env.PUBLIC_URL+"/productimages/"+productinfo.image} style={{height: "190px", objectFit:"scale-down", backgroundColor:"rgb(233, 110, 216)"}}/>
                <Card.Body>
                    <Card.Title>{productinfo.title}</Card.Title>
                    <Card.Text>{productinfo.text}</Card.Text>
                    <Button onClick={() => {addtocart(productinfo.title, productinfo.price)}} variant="light">Añadir al carrito</Button>
                    <p style={{ display: "inline", fontWeight: "bold", fontSize: "1.5em", marginLeft: "150px"}}>{productinfo.price} €</p>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Producto;