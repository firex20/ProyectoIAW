import Button from "react-bootstrap/esm/Button"



const Carrito = ({cart, delfromcart, modifable}) => {

    if (modifable === undefined) {modifable = false}

    return(
        modifable ? 
        <div>
            {Object.keys(cart).map((item, key) => {
                return (
                    <div key={key}>
                        <Button onClick={() => {delfromcart(cart[item].name, cart[item].price)}} variant="danger" style={{ display: "inline", marginRight: "10px", marginBottom: "5px"}}>-1</Button>
                        <p style={{ display: "inline"}}>{cart[item].name} <span style={{ fontWeight: "bold"}}>X{cart[item].count}</span> Total: <span style={{ color: "green"}}>{cart[item].tprice} € </span></p>
                    </div>
                )
            })}
        </div> : 
        <div>
        {Object.keys(cart).map((item, key) => {
            return (
                <div key={key}>
                    <p style={{ display: "inline"}}>{cart[item].name} <span style={{ fontWeight: "bold"}}>X{cart[item].count}</span> Total: <span style={{ color: "green"}}>{cart[item].tprice} € </span></p>
                </div>
            )
        })}
        </div>
    )
}

export default Carrito