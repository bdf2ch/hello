<?php
    header('Content-Type: application/json');
    include("config.php");

    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
    $id = $params["id"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "DELETE FROM companies WHERE companies_id = $id";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE)
        echo(json_encode("success"));
    else
        echo(json_encode("fail"));


    mysql_free_result($result);
    mysql_close($link);
?>