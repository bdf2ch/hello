<?php
    //session_start();
    //header("Content-Type: application/json; charset=utf-8");
    include("config.php");

    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
    $login = $params["login"];
    $pass = $params["password"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "SELECT * FROM users WHERE users_login = '$login' LIMIT 1";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : ".mysql_error());
    if($result != false && mysql_num_rows($result) > 0){
        $user = mysql_fetch_array($result);
        $salt = $user["users_salt"];
        $passwd = $user["users_password"];
        //if(md5(md5($pass)).$salt) == $password{
        if($pass == $user["users_password"]){
            setcookie("id", $user["users_id"], 0, "/");
            echo json_encode($user);
        } else
            echo "fail";
    } else
        echo "fail";

        mysql_free_result($result);
        mysql_close($link);
?>