<?php
class Database{
 
    // specify your own database credentials
    private $host = "db5000249859.hosting-data.io";
    private $db_name = "dbs244044";
    private $username = "dbu411347";
    private $password = "88.Black.88";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>