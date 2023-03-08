<?php
    class ConexionDB {
        
        private $conex;
        private $server;
        private $dbuser;
        private $pass;
        private $database;

        public function __construct() {
            $conf = parse_ini_file('conexion.ini');
            $this->server = $conf['server'];
            $this->dbuser = $conf['dbuser'];
            $this->pass = $conf['pass'];
            $this->database = $conf['database'];

            $this->conex = new mysqli($this->server, $this->dbuser, $this->pass, $this->database);
            if($this->conex->connect_error == true) {
                die("Conexion error ".$this->conex->connect_error.":".$this->conex->connect_errno);
            }
        }

        public function Loggin($userCred) {
            $usrName = $userCred['nick'];
            $usrEmail = $userCred['email'];
            $usrPass = $userCred['pass'];
            $sql = "SELECT nick, name, surname, email, pass FROM Users WHERE (nick = '$usrName' OR email = '$usrEmail') AND pass = '$usrPass'";

            $res = $this->conex->query($sql);
            if ($res->num_rows > 0) {
                $user = $res->fetch_assoc();
                $push = array("res" => 0, "user" => $user);
            } else {
                $sql = "SELECT nick FROM Users WHERE nick = '$usrName' OR email = '$usrEmail'";
                $res = $this->conex->query($sql);
                if ($res->num_rows > 0) {
                    $push = array("res" => 1, "user" => "null");
                } else {
                    $push = array("res" => 2, "user" => "null");
                }
            }
            return $push;
        }

        public function closeConex() {
            $this->conex->close();
        }
    }
?>