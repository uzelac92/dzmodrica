<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../p0st4vk3/b4z4P0d4t4k4.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    $vIME = $data->vImePrezime;
    $vRODITELJ = $data->vImeRoditelja;
    $vJMBG = $data->vLicniBroj;
    $vKLJUC = $data->vGlavniKljuc;

    $numCheck = 0;
    $rndLozinka = '';
    do {
        $rndLozinka = getLozinka();
        $checkQuery = "SELECT * FROM `p4c1j3nt_k4rt0n` WHERE AES_DECRYPT(`p4c_kljuc`,'$rndLozinka') = 'yuB6YvZbNs2HfUWLLsy54Q3Y' && AES_DECRYPT(`p4c1j3ntID`,'$rndLozinka') = '$vJMBG'";

        $stmtCheck = $db->prepare($checkQuery);
        $stmtCheck->execute();

        $numCheck = $stmtCheck->rowCount();

    } while($numCheck > 0);

    $query = "INSERT INTO `p4c1j3nt_k4rt0n` (`p4c1j3ntID`, `p4c_kljuc`, `n4ziv_p4c`, `t4t4_p4c`, `l1cn4_s1fr4`,`imunoTabela`) VALUES (
                        AES_ENCRYPT(:jmbg,'$vKLJUC'), 
                        AES_ENCRYPT(:kljuc,'$rndLozinka'), 
                        AES_ENCRYPT(:ime,'$vKLJUC'), 
                        AES_ENCRYPT(:roditelj,'$vKLJUC'),
                        '$rndLozinka','0')";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':jmbg', $vJMBG);
    $stmt->bindParam(':kljuc', $vKLJUC);
    $stmt->bindParam(':ime', $vIME);
    $stmt->bindParam(':roditelj', $vRODITELJ);
    $state = $stmt->execute();


    if($state){
        $post_item=array(
            'status' => 'success',
            'sifra' => $rndLozinka,
            'kljuc' =>$vKLJUC 
        );

        echo json_encode($post_item);
    } else{
        
        $post_item=array(
            'status' => 'unsuccess'
        );

        echo json_encode($post_item);
    }

    function getLozinka() { 
        $characters = '123456789abcdefghijklmnopqrstuvwxyz'; 
        $randomString = ''; 
      
        for ($i = 0; $i < 12; $i++) { 
            $index = rand(0, strlen($characters) - 1); 
            $randomString .= $characters[$index]; 
        } 
      
        return $randomString; 
    } 
?>