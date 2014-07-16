<?php
    header('Content-Type: application/json; charset=utf-8');
    //header('Content-Type: text/html; charset=utf-8');
    include("config.php");

    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
    $id = $params["id"];
    $title = $params["title"];
    $chapterId = $params["chapterId"];
    $email = $params["email"];
    $web = $params["web"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "UPDATE companies SET companies_chapter_id = $chapterId, companies_title = '$title', companies_email = '$email', companies_web = '$web'
              WHERE companies_id = $id";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE)
        echo "success";
    else
        echo "fail";


    //mysql_free_result($result);
    mysql_close($link);
?>