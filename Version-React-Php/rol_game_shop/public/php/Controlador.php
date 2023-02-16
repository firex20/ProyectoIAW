<?php
    require_once ('./Cabeceras.php');
    require_once ('./clases/ConexionDB.php');

    $data = json_decode(file_get_contents("php://input"), true);
    $action = $data['action'];

    switch ($action) {
        case 'loggin':
            $ConexionDB = new ConexionDB();
            $dbres = $ConexionDB->Loggin($data['userCred']);
            $push = array("response" => $dbres['res'], "user" => $dbres['user']);
            $ConexionDB->closeConex();
            echo json_encode($push);
            break;
    }
?>