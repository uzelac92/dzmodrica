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

    $ime = $_GET['nalog'];
    $loz = $_GET['sifra'];

    $query = "SELECT n4l0g,t4jn1_k0d FROM l4b0r4nt_n4l4z4 WHERE k0r_1m3 = AES_ENCRYPT('$ime','$loz') AND k0r_l0z1nk4 = AES_ENCRYPT('$loz','$ime')";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $num = $stmt->rowCount();
    
    if($num>0){
       

        $row = $stmt->fetch(PDO::FETCH_BOTH);
    
        $post_item["tajnost"]=array(
            "prijava" => html_entity_decode("uspesna"),
            "type" => html_entity_decode("l4b"),
            "nalog" => html_entity_decode($row['n4l0g']),
            "glavniKljuc" => html_entity_decode($row['t4jn1_k0d'])
        );
        
        echo json_encode($post_item);
    } else{
    
        $post_item["tajnost"]=array(
            "prijava" => html_entity_decode("neuspesna")
        );
        
        echo json_encode($post_item);
    }
?>