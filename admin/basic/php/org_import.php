<?php
header('Content-Type: text/html; charset=utf-8');
set_time_limit (0);
include("config.php");
require_once '../php/Classes/PHPExcel.php';

error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);


if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');


$link = mysql_connect("$host", "$user", "$password") or die("Could not connect : " . mysql_error());
mysql_select_db("$dbname") or die("Could not select database");


$objPHPExcel = new PHPExcel();
$inputFileType = 'Excel5';
$inputFileName = 'lost.xls';
$organizations = array();

$objReader = PHPExcel_IOFactory::createReader($inputFileType);
$objReader->setReadDataOnly(true);
$objPHPExcel = $objReader->load($inputFileName);
$objWorksheet = $objPHPExcel->getActiveSheet();

/*
foreach ($objWorksheet->getRowIterator() as $row) {
    $cellIterator = $row->getCellIterator();
      $cellIterator->setIterateOnlyExistingCells(false); // This loops all cells, // even if it is not set. // By default, only cells // that are set will be // iterated.
      foreach ($cellIterator as $cell) {
        if($cell->getValue() != "")
            array_push($organizations, $cell->getValue());
      }
      echo "<br>";

}
*/

$highestRow = $objWorksheet->getHighestRow(); // e.g. 10
$highestColumn = $objWorksheet->getHighestColumn(); // e.g 'F'
$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn); // e.g. 5
/*
echo '<table>' . "\n";
for ($row = 1; $row <= $highestRow; ++$row) {
    echo '<tr>' . "\n";
    for ($col = 0; $col <= $highestColumnIndex; ++$col) {
        echo '<td>' . $objWorksheet->getCellByColumnAndRow($col, $row)->getValue() . '</td>' . "\n";
        if($col == 0)
            $organizations[$row]["title"] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
        if($col == 1)
            $organizations[$row]["phone"] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
        if($col == 2)
            $organizations[$row]["address"] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
        if($col == 3)
            $organizations[$row]["subject"] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
        if($col == 4)
            $organizations[$row]["chapter"] = $objWorksheet->getCellByColumnAndRow($col, $row)->getValue();
    }
    echo '</tr>' . "\n";
}
echo '</table>' . "\n";
*/



$highestRow = $objWorksheet->getHighestRow(); // e.g. 10
$highestColumn = $objWorksheet->getHighestColumn(); // e.g 'F'
$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn); // e.g. 5
for ($row = 1; $row <= $highestRow; ++$row) {
    $organizations[$row]["title"] = $objWorksheet->getCellByColumnAndRow(0, $row)->getValue();
    $organizations[$row]["phone"] = $objWorksheet->getCellByColumnAndRow(1, $row)->getValue();
    $organizations[$row]["address"] = $objWorksheet->getCellByColumnAndRow(2, $row)->getValue();
    $organizations[$row]["subject"] = $objWorksheet->getCellByColumnAndRow(3, $row)->getValue();
    $organizations[$row]["chapter"] = $objWorksheet->getCellByColumnAndRow(4, $row)->getValue();
}


mysql_query("SET NAMES utf8");
for($i = 1; $i <= sizeof($organizations); $i++){
    $chapter_id = 0;
    $organization_id = 0;

    $chapter_title = mb_convert_case($organizations[$i]["chapter"], MB_CASE_LOWER, "UTF-8");
    //$chapter_title = trim($chapter_title);
    $chapter_query = "SELECT * FROM chapters WHERE chapter_title = '$chapter_title'";
    $chapter_result = mysql_query($chapter_query) or die("Query 1 failed.<br>");
    if(mysql_num_rows($chapter_result) > 0){
        $chapter = mysql_fetch_assoc($chapter_result);
        $chapter_id = $chapter['chapter_id'];
        echo 'chapter id = '.$chapter_id.'<br>';
    }



    $org_title = mysql_real_escape_string($organizations[$i]["title"]);
    echo "escaped = ".mysql_real_escape_string($organizations[$i]["title"])."<br>";
    $org_query = "SELECT * FROM companies WHERE companies_title = '$org_title'";
    $org_result = mysql_query($org_query) or die("Query 2 failed."."<br>");
    if(mysql_num_rows($org_result) > 0){


            for($o = 0; $o < mysql_num_rows($org_result); $o++){


                $org = mysql_fetch_assoc($org_result);
                $organization_id = $org['companies_id'];

                $addresses_query = "SELECT * FROM addresses WHERE addresses_company_id = $organization_id";
                $addresses_result = mysql_query($addresses_query) or die("Query 3 failed. <br>");
                $bingo = 0;
                if(mysql_num_rows($addresses_result) > 0){


                   // $address = mysql_fetch_assoc($addresses_result);
                    for($c = 0; $c < mysql_num_rows($addresses_result); $c++){
                        $address = mysql_fetch_assoc($addresses_result);
                        if(mb_convert_case($address["addresses_address"], MB_CASE_LOWER, "UTF-8") == mb_convert_case($organizations[$i]["address"], MB_CASE_LOWER, "UTF-8"))
                            $bingo = $address["addresses_id"];
                         echo $address["addresses_address"]." - ".$organizations[$i]["address"]."<br>";
                    }

                    if($bingo != 0){
                        echo "bingo != 0<br>";
                        $org_phone = mysql_real_escape_string($organizations[$i]["phone"]);
                        $org_subject = mysql_real_escape_string($organizations[$i]["subject"]);
                        $add_query3 = "INSERT INTO contacts(contacts_address_id, contacts_phone, contacts_subject) VALUES($bingo, '$org_phone', '$org_subject')";
                        $result = mysql_query($add_query3) or die("Couldn't add contact for ".$organizations[$i]['title'].". ".mysql_error());
                        if($result != FALSE)
                            echo "Contact have been added successfully.<br>";
                    } else {
                         echo "bingo = 0";
                         $org_address = mysql_real_escape_string($organizations[$i]["address"]);
                         $org_phone = mysql_real_escape_string($organizations[$i]["phone"]);
                         $org_subject = mysql_real_escape_string($organizations[$i]["subject"]);
                         $add_query2 = "INSERT INTO addresses(addresses_company_id, addresses_address) VALUES($organization_id, '$org_address')";
                         $result = mysql_query($add_query2) or die("Couldn't add address for ".$organizations[$i]['title'].". ".mysql_error());
                         if($result != FALSE)
                            echo "Address have been added successfully.<br>";
                         $address_id = mysql_insert_id();


                         $add_query3 = "INSERT INTO contacts(contacts_address_id, contacts_phone, contacts_subject) VALUES($address_id, '$org_phone', '$org_subject') ";
                         $result = mysql_query($add_query3) or die("Couldn't add contact for ".$organizations[$i]['title'].". ".mysql_error());
                         if($result != FALSE)
                            echo "Contact have been added successfully.<br>";
                    }


                } else {



                    $org_address = mysql_real_escape_string($organizations[$i]["address"]);
                    $org_phone = mysql_real_escape_string($organizations[$i]["phone"]);
                    $org_subject = mysql_real_escape_string($organizations[$i]["subject"]);
                    $add_query2 = "INSERT INTO addresses(addresses_company_id, addresses_address) VALUES($organization_id, '$org_address') ";
                    $result = mysql_query($add_query2) or die("Couldn't add address for ".$organizations[$i]['title'].". ".mysql_error());
                    if($result != FALSE)
                        echo "Address have been added successfully/<br>";
                    $address_id = mysql_insert_id();


                    $add_query3 = "INSERT INTO contacts(contacts_address_id, contacts_phone, contacts_subject) VALUES($address_id, '$org_phone', '$org_subject')";
                    $result = mysql_query($add_query3) or die("Couldn't add contact for ".$organizations[$i]['title'].". ".mysql_error());
                    if($result != FALSE)
                        echo "Contact have been added successfully/<br>";

                }


            }

            //$organization_id = $chapter['companies_id'];
        } else {

             echo "No such companies.<br>";

            $org_address = mysql_real_escape_string($organizations[$i]["address"]);
            $org_phone = mysql_real_escape_string($organizations[$i]["phone"]);
            $org_subject = mysql_real_escape_string($organizations[$i]["subject"]);
            $org_title = mysql_real_escape_string($organizations[$i]["title"]);

            $add_query = "INSERT INTO companies(companies_chapter_id, companies_title) VALUES($chapter_id, '$org_title')";
            $result = mysql_query($add_query) or die("Couldn't add company. ".mysql_error());
            if($result != FALSE)
                echo $organizations[$i]["title"]." have been added successfully<br>.";
            $company_id = mysql_insert_id();
            echo "company id = ".$company_id."<br>";
            echo "org_address = ".$org_address."<br>";


            $add_query2 = "INSERT INTO addresses(addresses_company_id, addresses_address) VALUES($company_id, '$org_address')";
            $result2 = mysql_query($add_query2) or die("Couldn't add address for ".mysql_error());
            if($result2 != FALSE){
                echo "Address have been added successfully.<br>";
            }
           $address_id = mysql_insert_id();


            $add_query3 = "INSERT INTO contacts(contacts_address_id, contacts_phone, contacts_subject) VALUES($address_id, '$org_phone', '$org_subject')";
            $result = mysql_query($add_query3) or die("Couldn't add contact for ".$organizations[$i]["title"].". ".mysql_error());
            if($result != FALSE)
                echo "Contact have been added successfully<br>.";


        }


}





//print_r($organizations);

?>
