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

    $query = "SELECT AES_DECRYPT(T3,'$kljuc') as T3, AES_DECRYPT(T4,'$kljuc') as T4, AES_DECRYPT(TSH,'$kljuc') as TSH, AES_DECRYPT(fT3,'$kljuc') as fT3,"
                    ." AES_DECRYPT(fT4,'$kljuc') as fT4, AES_DECRYPT(Anti_TPO_At,'$kljuc') as Anti_TPO_At, AES_DECRYPT(Anti_Tg_At,'$kljuc') as Anti_Tg_At,"
                    ." AES_DECRYPT(CEA,'$kljuc') as CEA, AES_DECRYPT(Ca_15_3,'$kljuc') as Ca_15_3, AES_DECRYPT(Ca_19_9,'$kljuc') as Ca_19_9,"
                    ." AES_DECRYPT(Ca_125,'$kljuc') as Ca_125, AES_DECRYPT(tPSA,'$kljuc') as tPSA, AES_DECRYPT(fPSA,'$kljuc') as fPSA,"
                    ." AES_DECRYPT(IgE,'$kljuc') as IgE, AES_DECRYPT(Vit_D25_OH,'$kljuc') as Vit_D25_OH, AES_DECRYPT(PTH,'$kljuc') as PTH,"
                    ." AES_DECRYPT(Feritin,'$kljuc') as Feritin, AES_DECRYPT(AFP,'$kljuc') as AFP, AES_DECRYPT(D_dimer,'$kljuc') as D_dimer,"
                    ." AES_DECRYPT(FSH,'$kljuc') as FSH, AES_DECRYPT(bHCG,'$kljuc') as bHCG FROM `imun0_h3m1j4` WHERE p4c1j3ntID = AES_ENCRYPT('$id','$kljuc')";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $num = $stmt->rowCount();
    
    if($num>0){
    
        $posts_arr=array();
        $posts_arr["imunoHemija"]=array();

        $row = $stmt->fetch(PDO::FETCH_BOTH);
    
        $post_item=array(
            "stanje" => html_entity_decode("uspesno"),
            "t3" => html_entity_decode($row['T3']),
            "t4" => html_entity_decode($row['T4']),
            "tsh" => html_entity_decode($row['TSH']),
            "ft3" => html_entity_decode($row['fT3']),
            "ft4" => html_entity_decode($row['fT4']),
            "antiTPOat" => html_entity_decode($row['Anti_TPO_At']),
            "antiTGat" => html_entity_decode($row['Anti_Tg_At']),
            "cea" => html_entity_decode($row['cea']),
            "ca153" => html_entity_decode($row['Ca_15_3']),
            "ca199" => html_entity_decode($row['Ca_19_9']),
            "ca125" => html_entity_decode($row['Ca_125']),
            "tpsa" => html_entity_decode($row['tPSA']),
            "fpsa" => html_entity_decode($row['fPSA']),
            "ige" => html_entity_decode($row['IgE']),
            "vitd25oh" => html_entity_decode($row['Vit_D25_OH']),
            "pth" => html_entity_decode($row['PTH']),
            "feritin" => html_entity_decode($row['Feritin']),
            "afp" => html_entity_decode($row['AFP']),
            "ddimer" => html_entity_decode($row['D_dimer']),
            "fsh" => html_entity_decode($row['FSH']),
            "bhcg" => html_entity_decode($row['bHCG']),
        );

        array_push($posts_arr["imunoHemija"], $post_item);
    
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