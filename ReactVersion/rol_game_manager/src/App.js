import { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Menu from "./Menu";
import Popup from "./Popup";
import Button from 'react-bootstrap/Button';
import LoginButtons from "./LoginButtons";
import Alerta from "./Alerta";

function App() {

  const [logged, setLogged] = useState(false)

  const [alert, setAlert] = useState(false)

  const [alertMsg, setAlertMsg] = useState("error")

  const [user, setUser] = useState({})

  const [usr, setUsr] = useState({})

  useEffect(() => {
    fetch("http://localhost:3000/user.json")
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
      setAlertMsg("No existe el usuario!")
      setAlert(true)
    }
  }

  return (
    <div>
      <Popup 
        id="LogginModal"
        visible={!logged} 
        backdrop="static" 
        titulo="Inicia sesión" 
        cabecera={<Button variant="light" onClick={() => {Loggin("Anonimo", "nul")}}>Continuar como anónimo</Button>}
        cuerpo={<Login />} 
        pie={
          <>
            <Alerta style={{height: "35px", paddingBottom: "10px", paddingTop: "5px", width: "45%"}} show={alert} msg={alertMsg}/>
            <LoginButtons logged={logged} setLogged={setLogged} Loggin={Loggin}/>
          </>
        }
      />
      <Menu setLogged={setLogged} logged={logged} usrname={user.name}/>
      <h1>Hola</h1>
    </div>
  );
}

export default App;
