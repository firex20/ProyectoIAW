import Button from 'react-bootstrap/Button';
import { useEffect } from "react";

const LoginButtons = ({logged, setLogged, Loggin, style}) => {

    const getLoggin = () => {
        const user = document.getElementById("LogginUser").value
        const pass = document.getElementById("LogginPassword").value
        const remember = document.getElementById("LogginRemember").checked
        Loggin(user, pass)
    }

    useEffect(() => {
        const listener = event => {
          if ((event.code === "Enter" || event.code === "NumpadEnter") && logged === false) {
            getLoggin()
            event.preventDefault();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [logged]);

    return(
        !logged ? 
            <>
                <Button variant="dark">Registrarse</Button>
                <Button onClick={() => {getLoggin()}} variant="dark">Iniciar sesion</Button>
            </>
        :
            <>
                <Button onClick={() => {setLogged(false)}} variant="dark" style={style}>Cerrar sesion</Button>
            </>
    )
}

export default LoginButtons;