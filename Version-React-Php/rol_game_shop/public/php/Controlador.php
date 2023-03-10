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
        case 'register':
            $ConexionDB = new ConexionDB();
            if ($ConexionDB->CheckNick($data['userReg']['nick'])) {
                if ($ConexionDB->CheckEmail($data['userReg']['email'])) {
                    $dbres = $ConexionDB->Register($data['userReg']);
                    if ($dbres) {
                        $push = array("response" => 0);
                    } else {
                        $push = array("response" => 3);
                    }
                } else {
                    $push = array("response" => 2);
                }
            } else {
                $push = array("response" => 1);
            }
            $ConexionDB->closeConex();
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
        case 'getProducts':
            $ConexionDB = new ConexionDB();
            $push = $ConexionDB->getProducts();
            $ConexionDB->closeConex();
            echo json_encode($push);
            break;
        case 'getNotices':
            $ConexionDB = new ConexionDB();
            $push = $ConexionDB->getNotices();
            $ConexionDB->closeConex();
            echo json_encode($push);
            break;
    }
?>