<?php
    header('Content-Type: application/json');
    include("config.php");

    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
    $title = $params["title"];
    $chapterId = $params["chapterId"];
    $email = $params["email"];
    $web = $params["web"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "INSERT INTO companies (companies_chapter_id, companies_title, companies_email, companies_web) VALUES ($chapterId, '$title', '$email', '$web')";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE){
        $id = mysql_insert_id();
        $query = "SELECT * FROM companies WHERE companies_id = $id";
        $result = mysql_query($query) or die("Query failed : " . mysql_error());
        $answer = mysql_fetch_array($result);
        echo(json_encode($answer));
    }
    else
        echo(json_encode("fail"));


    mysql_free_result($result);
    mysql_close($link);
?>