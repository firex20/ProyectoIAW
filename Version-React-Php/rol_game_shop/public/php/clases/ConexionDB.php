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

        public function Register($userReg) {
            $usrNick = $userReg['nick'];
            $usrEmail = $userReg['email'];
            $usrPass = $userReg['pass'];
            $usrName = $userReg['name'];
            $usrSurnName = $userReg['surname'];
            $sql = "INSERT INTO Users VALUES ('$usrNick', '$usrPass', '$usrName', '$usrSurnName', '$usrEmail')";

            $res = $this->conex->query($sql);
            if ($res) {
                $push = true;
            } else {
                $push = false;
            }
            return $push;
        }

        public function CheckNick($nick) {
            $sql = "SELECT * FROM Users WHERE nick = '$nick'";

            $res = $this->conex->query($sql);
            if ($res->num_rows > 0) {
                return false;
            } else {
                return true;
            }
        }

        public function CheckEmail($email) {
            $sql = "SELECT * FROM Users WHERE email = '$email'";

            $res = $this->conex->query($sql);
            if ($res->num_rows > 0) {
                return false;
            } else {
                return true;
            }
        }

        public function getProducts() {
            $products = array();
            $sql = "SELECT * FROM Products";

            $res = $this->conex->query($sql);
            $tupla = $res->fetch_assoc();
            while ($tupla != null) {
                $product = array("title" => $tupla['title'], "text" => $tupla['text'], "image" => $tupla['image'], "price" => $tupla['price']);
                array_push($products, $product);
                $tupla = $res->fetch_assoc();
            }
            return $products;
        }

        public function getNotices() {
            $notices = array();
            $sql = "SELECT * FROM Notices";

            $res = $this->conex->query($sql);
            $tupla = $res->fetch_assoc();
            while ($tupla != null) {
                $notice = array("title" => $tupla['title'], "body" => $tupla['body'], "image" => $tupla['image']);
                array_push($notices, $notice);
                $tupla = $res->fetch_assoc();
            }
            return $notices;
        }

        public function closeConex() {
            $this->conex->close();
        }
    }
?>