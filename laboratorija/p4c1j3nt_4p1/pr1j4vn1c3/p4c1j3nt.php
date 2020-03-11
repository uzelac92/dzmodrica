<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Allow-Credentials: true");
    header("Content-Type: application/json; charset=UTF-8");
    
    // include database and object files
    include_once '../p0st4vk3/b4z4P0d4t4k4.php';
    
    // get database connection
    $database = new Database();
    $db = $database->getConnection();

    $jmbg = $_GET['nalog'];
    $loz = $_GET['sifra'];

    $query = "SELECT AES_DECRYPT(p4c_kljuc,'$loz') as glavniKljuc FROM p4c1j3nt_k4rt0n WHERE p4c1j3ntID = AES_ENCRYPT('$jmbg', AES_DECRYPT(p4c_kljuc,'$loz'))";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $num = $stmt->rowCount();
    
    if($num>0){


        $row = $stmt->fetch(PDO::FETCH_BOTH);
    
        $post_item["tajnost"]=array(
            "prijava" => html_entity_decode("uspesna"),
            "type" => html_entity_decode("p4c"),
            "nalog" => $jmbg,
            "glavniKljuc" => html_entity_decode($row['glavniKljuc'])
        );
    
        echo json_encode($post_item);
    } else{
    
        $post_item["tajnost"]=array(
            "prijava" => html_entity_decode("neuspesna")
        );
        
        echo json_encode($post_item);
    }
?>