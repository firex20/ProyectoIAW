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

function App() {

  const [logged, setLogged] = useState(false)

  const [register, setRegister] = useState(false)

  const [alert, setAlert] = useState(false)

  const [alertMsg, setAlertMsg] = useState("error")

  const [user, setUser] = useState({})

  const [usr, setUsr] = useState({})

  const [cart, setCart] = useState({})

  const [cartitems, setCartitems] = useState(0)

  const [cartprice, setCartprice] = useState(0)

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
          setAlert(true)
        }
      }else{
        setAlertMsg("No existe el usuario!")
        setAlert(true)
      }
    }
  }

  const Register = (username, usersurname, usernick, useremail, userpass) =>{
    if (username.length === 0 || usersurname.length === 0 || usernick.length === 0 || useremail.length === 0 || userpass.length === 0) {
      setAlertMsg("Faltan datos!")
      setAlert(true)
    }else if (userpass.length <= 4) {
      setAlertMsg("Contraseña muy corta!")
      setAlert(true)
    }else if (usr.hasOwnProperty(usernick)) {
      setAlertMsg("Nickname ocupado")
      setAlert(true)
    }else if (usr.System.emails.hasOwnProperty(useremail)){
      setAlertMsg("Email ya usado")
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
      setUsr(newuser)
      console.log(usr)
    }
  }

  const addtocart = (product, price) =>{
    let newcart=cart
    if (newcart.hasOwnProperty(product)) {
      newcart[product].count += 1
      newcart[product].tprice = price*product.count
    }else{
      newcart[product].count = 1
      newcart[product].tprice = price*newcart[product].count
    }
    setCart(newcart)
    setCartitems(cartitems+1)
    setCartprice(cartprice+price)
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
            <Alerta style={{height: "35px", paddingBottom: "10px", paddingTop: "5px", width: "45%"}} show={alert} msg={alertMsg}/>
            <LoginButtons logged={logged} setLogged={setLogged} Loggin={Loggin} Register={Register} register={register} setRegister={setRegister}/>
          </>
        }
      />
      <BrowserRouter>
        <Menu setLogged={setLogged} logged={logged} usrname={user.name}/>
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
