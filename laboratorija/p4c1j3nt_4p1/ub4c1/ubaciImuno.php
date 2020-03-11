<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../p0st4vk3/b4z4P0d4t4k4.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    $pacID = $data->jmbg;
    $kljuc = $data->kljuc;
    $T3 = $data->t3;
    $T4 = $data->t4;
    $TSH = $data->tsh;
    $fT3 = $data->ft3;
    $fT4 = $data->ft4;
    $Anti_TPO_At = $data->antiTPOat;
    $Anti_Tg_At = $data->antiTGat;
    $CEA = $data->cea;
    $Ca_15_3 = $data->ca153;
    $Ca_19_9 = $data->ca199;
    $Ca_125 = $data->ca125;
    $tPSA = $data->tpsa;
    $fPSA = $data->fpsa;
    $IgE = $data->ige;
    $Vit_D25_OH = $data->vitd25oh;
    $PTH = $data->pth;
    $Feritin = $data->feritin;
    $AFP = $data->afp;
    $D_dimer = $data->ddimer;
    $DSH = $data->fsh;
    $bHCG = $data->bhcg;

    $sql = "UPDATE `p4c1j3nt_k4rt0n` SET imunoTabela = 1 WHERE p4c1j3ntID = AES_ENCRYPT('$pacID','$kljuc')";
    $stmt2 = $db->prepare($sql);
    $stmt2->execute();

    $query = "INSERT INTO `imun0_h3m1j4` (`imunoID`, `p4c1j3ntID`, 
                    `T3`, `T4`, `TSH`, 
                    `fT3`, `fT4`, `Anti_TPO_At`, 
                    `Anti_Tg_At`, `CEA`, `Ca_15_3`, 
                    `Ca_19_9`, `Ca_125`, `tPSA`, 
                    `fPSA`, `IgE`, `Vit_D25_OH`, 
                    `PTH`, `Feritin`, `AFP`, 
                    `D_dimer`, `FSH`, `bHCG`) 
                VALUES (NULL, AES_ENCRYPT('$pacID','$kljuc'), 
                    AES_ENCRYPT('$T3','$kljuc'), AES_ENCRYPT('$T4','$kljuc'), AES_ENCRYPT('$TSH','$kljuc'), 
                    AES_ENCRYPT('$fT3','$kljuc'), AES_ENCRYPT('$fT4','$kljuc'), AES_ENCRYPT('$Anti_TPO_At','$kljuc'), 
                    AES_ENCRYPT('$Anti_Tg_At','$kljuc'), AES_ENCRYPT('$CEA','$kljuc'), AES_ENCRYPT('$Ca_15_3','$kljuc'), 
                    AES_ENCRYPT('$Ca_19_9','$kljuc'), AES_ENCRYPT('$Ca_125','$kljuc'), AES_ENCRYPT('$tPSA','$kljuc'), 
                    AES_ENCRYPT('$fPSA','$kljuc'), AES_ENCRYPT('$IgE','$kljuc'), AES_ENCRYPT('$Vit_D25_OH','$kljuc'), 
                    AES_ENCRYPT('$PTH','$kljuc'), AES_ENCRYPT('$Feritin','$kljuc'), AES_ENCRYPT('$AFP','$kljuc'), 
                    AES_ENCRYPT('$D_dimer','$kljuc'), AES_ENCRYPT('$FSH','$kljuc'), AES_ENCRYPT('$bHCG','$kljuc'));";
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