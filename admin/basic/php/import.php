<?php
header('Content-Type: text/html; charset=utf-8');
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
$inputFileName = 'bd.xls';
$organizations = array();


$objReader = PHPExcel_IOFactory::createReader($inputFileType);
$objReader->setReadDataOnly(true);

$objPHPExcel = $objReader->load($inputFileName);
$objWorksheet = $objPHPExcel->getActiveSheet();


?>