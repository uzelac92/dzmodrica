<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../p0st4vk3/b4z4P0d4t4k4.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    $id = $_GET['id'];
    $kljuc = $_GET['kljuc'];
    $rez = ($_GET['rez'] == '1') ? 'poz' : 'neg';

    $query = "INSERT INTO `iF0btR3z` (`p4c1j3ntID`, `r3zult4t`) VALUES (AES_ENCRYPT('$id','$kljuc'), AES_ENCRYPT('$rez','$kljuc'));";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();


    if($state){
        $post_item=array(
            'status' => 'success'
        );

        echo json_encode($post_item);
    } else{
        
        $post_item=array(
            'status' => 'unsuccess'
        );

        echo json_encode($post_item);
    }
?>