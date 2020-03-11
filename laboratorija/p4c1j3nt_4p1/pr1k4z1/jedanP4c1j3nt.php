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

    $id = $_GET['id'];
    $kljuc = $_GET['kljuc'];

    $query = "SELECT AES_DECRYPT(p4c1j3nt_k4rt0n.p4c1j3ntID,'$kljuc') as pacijentJMBG, AES_DECRYPT(p4c1j3nt_k4rt0n.t4t4_p4c,'$kljuc') as pacijentOtac, imunoTabela as tabela, AES_DECRYPT(p4c1j3nt_k4rt0n.n4ziv_p4c,'$kljuc') as nazivPacijenta, AES_DECRYPT(iF0btR3z.r3zult4t,'$kljuc') as iFOBTrezultat FROM p4c1j3nt_k4rt0n LEFT JOIN iF0btR3z ON p4c1j3nt_k4rt0n.p4c1j3ntID = iF0btR3z.p4c1j3ntID WHERE p4c1j3nt_k4rt0n.p4c1j3ntID = AES_ENCRYPT('$id','$kljuc')";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $num = $stmt->rowCount();
    
    if($num>0){
    
        $posts_arr=array();
        $posts_arr["records"]=array();

        $row = $stmt->fetch(PDO::FETCH_BOTH);
    
        $post_item=array(
            "stanje" => html_entity_decode("uspesno"),
            "pacijentJMBG" => html_entity_decode($row['pacijentJMBG']),
            "pacijentOtac" => html_entity_decode($row['pacijentOtac']),
            "nazivPacijenta" => html_entity_decode($row['nazivPacijenta']),
            "iFOBTrezultat" => html_entity_decode($row['iFOBTrezultat']),
            "imunoTabela" => html_entity_decode($row['tabela']),
        );

        array_push($posts_arr["records"], $post_item);
    
        http_response_code(200);
        echo json_encode($posts_arr);
    }

    else{
    
        http_response_code(404);
        echo json_encode(
            array("message" => "Neuspesno pristupanje pacijentu.")
        );
    }
?>