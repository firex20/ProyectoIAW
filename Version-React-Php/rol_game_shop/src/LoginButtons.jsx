import Button from 'react-bootstrap/Button';
import { useEffect } from "react";
import { useCallback } from 'react';

const LoginButtons = ({logged, setLogged, Loggin, style, Register, register, setRegister}) => {

    const getLoggin = useCallback(() => {
      if (!register) {
        const user = document.getElementById("LogginUser").value
        const pass = document.getElementById("LogginPassword").value
        const remember = document.getElementById("LogginRemember").checked
        Loggin(user, pass)
      }else{
        setRegister(false)
      }
    }, [register, setRegister, Loggin])

    const getRegister = useCallback(() => {
        if (register) {
          const username = document.getElementById("RegisterName").value
          const usersurname = document.getElementById("RegisterSurname").value
          const usernick = document.getElementById("RegisterUser").value
          const useremail = document.getElementById("RegisterEmail").value
          const userpass = document.getElementById("RegisterPassword").value
          Register(username, usersurname, usernick, useremail, userpass)
        }else{
          setRegister(true)
        }
    }, [register, setRegister, Register])

    useEffect(() => {
        const listener = event => {
          if ((event.code === "Enter" || event.code === "NumpadEnter") && logged === false) {
            if(!register) {
              getLoggin()
            }else{
              getRegister()
            }
            event.preventDefault();
          }
        };
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        };
      }, [logged, getLoggin, getRegister, register]);

    return(
        !logged ? 
            <>
                <Button onClick={() => {getRegister()}} variant="dark">Registrarse</Button>
                <Button onClick={() => {getLoggin()}} variant="dark">Iniciar sesion</Button>
            </>
        :
            <>
                <Button onClick={() => {setLogged(false)}} variant="dark" style={style}>Cerrar sesion</Button>
            </>
    )
}

export default LoginButtons;