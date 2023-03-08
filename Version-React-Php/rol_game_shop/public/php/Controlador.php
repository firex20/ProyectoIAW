<?php
    require_once ('./Cabeceras.php');
    require_once ('./clases/ConexionDB.php');
    session_start();

    $data = json_decode(file_get_contents("php://input"), true);
    $action = $data['action'];

    switch ($action) {
        case 'loggin':
            $ConexionDB = new ConexionDB();
            $dbres = $ConexionDB->Loggin($data['userCred']);
            $ConexionDB->closeConex();
            if ($data['userCred']['remember']) {
                $_SESSION['user'] = $dbres['user'];
                $_SESSION['remember'] = true;
            }
            $push = array("response" => $dbres['res'], "user" => $dbres['user']);
            echo json_encode($push);
            break;
        case 'getSession':
            if (isset($_SESSION['user'])) {
                $push = array("response" => true, "session" => $_SESSION);
            } else {
                $push = array("response" => false, "session" => null);
            }
            echo json_encode($push);
            break;
        case 'addToSession':
            $_SESSION[$data['name']] = $data['parameter'];
            break;
        case 'closeSession':
            session_destroy();
            setcookie(session_name(), '', time() - 3600, '/');
            $push = array("response" => true);
            echo json_encode($push);
            break;
    }
?>