<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../p0st4vk3/b4z4P0d4t4k4.php';
 
$database = new Database();
$db = $database->getConnection();

$kljuc = $_GET['kljuc'];

$query = "SELECT AES_DECRYPT(p4c1j3nt_k4rt0n.p4c1j3ntID,'$kljuc') as pacijentJMBG, AES_DECRYPT(p4c1j3nt_k4rt0n.t4t4_p4c,'$kljuc') as pacijentOtac, AES_DECRYPT(p4c1j3nt_k4rt0n.n4ziv_p4c,'$kljuc') as nazivPacijenta, l1cn4_s1fr4 as sifra, imunoTabela as tabela, AES_DECRYPT(iF0btR3z.r3zult4t,'$kljuc') as iFOBTrezultat FROM p4c1j3nt_k4rt0n LEFT OUTER  JOIN iF0btR3z ON p4c1j3nt_k4rt0n.p4c1j3ntID = iF0btR3z.p4c1j3ntID ORDER BY pacijentJMBG";

$stmt = $db->prepare($query);

$stmt->execute();

$num = $stmt->rowCount();

 
if($num>0){
 
    $posts_arr=array();

    $posts_arr["pacijenti"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        $post_item=array(
            "pacijentJMBG" => html_entity_decode($row['pacijentJMBG']),
            "pacijentOtac" => html_entity_decode($row['pacijentOtac']),
            "nazivPacijenta" => html_entity_decode($row['nazivPacijenta']),
            "lozinkaPacijenta" => html_entity_decode($row['lozinka']),
            "iFOBTrezultat" => html_entity_decode($row['iFOBTrezultat']),
            "imunoTabela" => html_entity_decode($row['tabela']),
            "pacSifra" => html_entity_decode($row['sifra'])
        );
 
        array_push($posts_arr["pacijenti"], $post_item);
    }
    
    http_response_code(200);
    echo json_encode($posts_arr);
} else{
 
    http_response_code(404);
    echo json_encode(
        array("message" => "Neuspesno vadjenje podataka.")
    );
}