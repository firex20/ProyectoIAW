import { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./Login";
import Menu from "./Menu";
import Popup from "./Popup";
import Button from 'react-bootstrap/Button';
import LoginButtons from "./LoginButtons";
import Alerta from "./Alerta";
import Pie from "./Pie";
import Tienda from "./Tienda";
import Noticias from "./Noticias";
import Carrito from "./Carrito";

function App() {

  const [logged, setLogged] = useState(false)

  const [register, setRegister] = useState(false)

  const [alert, setAlert] = useState(false)

  const [alertcolor, setAlertcolor] = useState("danger")

  const [alertMsg, setAlertMsg] = useState("error")

  const [user, setUser] = useState({})

  const [usr, setUsr] = useState({})

  const [canvasshow, setCanvasshow] = useState(false)

  const [cart, setCart] = useState({})

  const [cartitems, setCartitems] = useState(0)

  const [cartprice, setCartprice] = useState(0)

  const [showcheckout, setShowcheckout] = useState(false)

  useEffect(() => {
    fetch(process.env.PUBLIC_URL+"/user.json", {method: 'GET', mode: 'no-cors', headers: {'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .then((resj) => setUsr(resj))
  }, [])

  useEffect(() => {
    const timeout = setInterval(() => {
       if (alert === true) {
          setAlert(false)
       }
    }, 4000);return () => clearInterval(timeout)
  }, [alert])

  const Loggin = (username, password) =>{
    if (usr.hasOwnProperty(username)) {
      if (usr[username].pass === password){
        setUser(usr[username])
        setLogged(true)
      }else{
        setAlertMsg("Contraseña incorrecta!")
        setAlertcolor("danger")
        setAlert(true)
      }
    }else{
      if(usr.System.emails.hasOwnProperty(username)){
        username=usr.System.emails[username]
        if (usr[username].pass === password){
          setUser(usr[username])
          setLogged(true)
        }else{
          setAlertMsg("Contraseña incorrecta!")
          setAlertcolor("danger")
          setAlert(true)
        }
      }else{
        setAlertMsg("No existe el usuario!")
        setAlertcolor("danger")
        setAlert(true)
      }
    }
  }

  const Register = (username, usersurname, usernick, useremail, userpass) =>{
    if (username.length === 0 || usersurname.length === 0 || usernick.length === 0 || useremail.length === 0 || userpass.length === 0) {
      setAlertMsg("Faltan datos!")
      setAlertcolor("danger")
      setAlert(true)
    }else if (userpass.length <= 4) {
      setAlertMsg("Contraseña muy corta!")
      setAlertcolor("danger")
      setAlert(true)
    }else if (usr.hasOwnProperty(usernick)) {
      setAlertMsg("Nickname ocupado")
      setAlertcolor("danger")
      setAlert(true)
    }else if (usr.System.emails.hasOwnProperty(useremail)){
      setAlertMsg("Email ya usado")
      setAlertcolor("danger")
      setAlert(true)
    } else {
      let newuser = usr
      newuser[usernick] = {
        "nick": usernick,
        "pass": userpass,
        "name": username,
        "surname": usersurname,
        "email": useremail
      }
      newuser.System.emails[useremail] = usernick
      setUsr(newuser)
      setAlertMsg("Registrado!")
      setAlertcolor("success")
      setAlert(true)
    }
  }

  const addtocart = (product, price) =>{
    let newcart=cart
    if (newcart.hasOwnProperty(product)) {
      newcart[product].count += 1
      newcart[product].tprice = price*newcart[product].count
    }else{
      newcart[product] = {}
      newcart[product].name = product
      newcart[product].count = 1
      newcart[product].price = price
      newcart[product].tprice = price*newcart[product].count
    }
    setCart(newcart)
    setCartitems(cartitems+1)
    setCartprice(cartprice+parseInt(price))
  }

  const delfromcart = (product, price) => {
    let newcart=cart
    newcart[product].count -= 1
    newcart[product].tprice = newcart[product].tprice - newcart[product].price
    setCartitems(cartitems-1)
    setCartprice(cartprice-parseInt(price))
    if (newcart[product].count === 0) {
      delete newcart[product]
    }
    setCart(newcart)
  }

  const checkout = () => {
    setShowcheckout(true)
  }

  return (
    <div>
      <Popup 
        id="LogginModal"
        visible={!logged} 
        backdrop="static" 
        titulo="Inicia sesión" 
        cabecera={<Button variant="light" onClick={() => {Loggin("Anonimo", "nul")}}>Continuar como anónimo</Button>}
        cuerpo={<Login register={register}/>} 
        pie={
          <>
            <Alerta style={{height: "35px", paddingBottom: "10px", paddingTop: "5px", width: "45%"}} show={alert} msg={alertMsg} color={alertcolor}/>
            <LoginButtons logged={logged} setLogged={setLogged} Loggin={Loggin} Register={Register} register={register} setRegister={setRegister}/>
          </>
        }
      />
      <Popup
        id="checkout"
        visible={showcheckout}
        onHide={setShowcheckout}
        closeButton={true}
        titulo="Confirmar compra"
        cuerpo={<Carrito cart={cart}/>}
        pie={
          <div style={{width: "100%"}}>
          <p style={{ float: "left", fontSize: "1.5em"}}>Total: <span style={{ color: "green"}}>{cartprice} €</span></p>
          <Button onClick={() => console.log("Aqui te llevaria a la pagina de pago...")} style={{ float: "right"}}>Comprar</Button></div>
          }
      />
      <BrowserRouter>
        <Menu setLogged={setLogged} logged={logged} usrname={user.name} cart={cart} cartitems={cartitems} cartprice={cartprice} delfromcart={delfromcart} canvasshow={canvasshow} setCanvasshow={setCanvasshow} checkout={checkout}/>
        <Routes>
          <Route path="Tienda" element={<Tienda addtocart={addtocart}/>} />
          <Route exact path="/RolShop" element={<Noticias/>} />
        </Routes>
      </BrowserRouter>
      <Pie />
    </div>
  );
}

export default App;
