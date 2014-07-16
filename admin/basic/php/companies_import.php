<?php
header('Content-Type: text/html; charset=utf-8');
include("config.php");
/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('Europe/Moscow');

if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once '../php/Classes/PHPExcel.php';

$link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();
//$objPHPExcel->removeSheetByIndex(0);


/** Load $inputFileName to a PHPExcel Object  **/
//$objPHPExcel = PHPExcel_IOFactory::load($inputFileName);

$inputFileType = 'Excel5';
$inputFileName = 'bd.xls';
$companies = array();

/**  Create a new Reader of the type defined in $inputFileType  **/
$objReader = PHPExcel_IOFactory::createReader($inputFileType);
/**  Advise the Reader that we only want to load cell data  **/
$objReader->setReadDataOnly(true);
/**  Load $inputFileName to a PHPExcel Object  **/

$objPHPExcel = $objReader->load($inputFileName);
$objWorksheet = $objPHPExcel->getActiveSheet();



    foreach ($objWorksheet->getRowIterator() as $row) {
     $cellIterator = $row->getCellIterator();
      $cellIterator->setIterateOnlyExistingCells(false); // This loops all cells, // even if it is not set. // By default, only cells // that are set will be // iterated.
      foreach ($cellIterator as $cell) {
        array_push($companies, $cell->getValue());
      }
     }




//}

/*
mysql_query("SET NAMES utf8");
for($i = 0; $i < sizeof($chapters); $i++){
    $test = $chapters[$i];
     $test = trim($test);
    //$test = strtolower($test);
    $test = mb_convert_case($test, MB_CASE_LOWER, "UTF-8");

    //$test = strtoupper($test{0});
    //$test = iconv("UTF-8", "UTF-8", $test)
    //$test = ucfirst($test);
    $query = "INSERT INTO chapters (chapter_title) VALUES ('$test')";

        $result = mysql_query($query) or die("Query failed : " . mysql_error());
        if($result == FALSE)
            echo("failed");
    echo $test."<br>";
}
mysql_free_result($result);
mysql_close($link);
*/

   print_r($companies);

// Redirect output to a client’s web browser (Excel2007)
//header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//header('Content-Disposition: attachment;filename="report.xlsx"');
//header('Cache-Control: max-age=0');

//$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
//$objWriter->save('php://output');
//exit;

?>
