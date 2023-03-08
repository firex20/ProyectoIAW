import { useCallback, useEffect, useState } from "react";
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

  const [phpUrl, setPhpUrl] = useState('')

  const [remember, setRemember] = useState()

  const addToSession = useCallback( (name, parameter) =>{
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ action: 'addToSession', parameter: parameter, name: name }),
      credentials: 'include'
    }
      fetch(phpUrl, request)
  }, [phpUrl])

  useEffect(() => {
    fetch(process.env.PUBLIC_URL+"/conexion.json")
    .then(resp => resp.json())
    .then (respj => {
      setPhpUrl(respj.php_url);
    })
  }, [])

  useEffect(() => {

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ action: 'getSession' }),
      credentials: 'include'
    }

    if (phpUrl !== '') {
      fetch(phpUrl, request)
      .then((res) => res.json())
      .then((resj) => {
        if (resj.response) {
          setUser(resj.session.user)
          setRemember(resj.session.remember)
          setLogged(true)
          if (resj.session.cart) {
            setCart(resj.session.cart)
            setCartprice(resj.session.cartprice)
            setCartitems(resj.session.cartitems)
          }
        }
      }).catch((error) => {
        setAlertMsg("Error "+error)
        setAlertcolor("danger")
        setAlert(true)
      })
    }

  }, [phpUrl])

  useEffect(() => {
    const timeout = setInterval(() => {
       if (alert === true) {
          setAlert(false)
       }
    }, 4000);return () => clearInterval(timeout)
  }, [alert])

  useEffect(() => {
    if (remember === true) {
      addToSession('cartitems', cartitems)
    }
  }, [cartitems, remember, addToSession])

  useEffect(() => {
    if (remember === true) {
      addToSession('cartprice', cartprice)
    }
  }, [cartprice, remember, addToSession])

  const Loggin = (username, password, remembered) => {

    let userCred = {
      nick:username,
      email:username,
      pass:password,
      remember:remembered
    }

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ action: 'loggin', userCred: userCred }),
      credentials: 'include'
    }

    fetch(phpUrl, request)
    .then((res) => res.json())
    .then((resj) => {
      if (resj.response === 0) {
        setUser(resj.user)
        setLogged(true)
        setRemember(remembered)
      }else if (resj.response === 1) {
        setAlertMsg("Contraseña incorrecta!")
        setAlertcolor("danger")
        setAlert(true)
      }else if (resj.response === 2) {
        setAlertMsg("No existe el usuario!")
        setAlertcolor("danger")
        setAlert(true)
      }
    }).catch((error) => {
      setAlertMsg("Error "+error)
      setAlertcolor("danger")
      setAlert(true)
    })
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
    setCartitems(cartitems+1) && console.log(cartitems)
    setCartprice(cartprice+parseInt(price))
    addToSession('cart', cart)
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
    addToSession('cart', cart)
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
        cabecera={<Button variant="light" onClick={() => {Loggin("Anonimo", "null", false)}}>Continuar como anónimo</Button>}
        cuerpo={<Login register={register}/>} 
        pie={
          <>
            <Alerta style={{height: "35px", paddingBottom: "10px", paddingTop: "5px", width: "45%"}} show={alert} msg={alertMsg} color={alertcolor}/>
            <LoginButtons remember={remember} logged={logged} setLogged={setLogged} Loggin={Loggin} Register={Register} register={register} setRegister={setRegister} phpUrl={phpUrl}/>
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
        <Menu remember={remember} phpUrl={phpUrl} setLogged={setLogged} logged={logged} usrname={user.name} cart={cart} cartitems={cartitems} cartprice={cartprice} delfromcart={delfromcart} canvasshow={canvasshow} setCanvasshow={setCanvasshow} checkout={checkout}/>
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
