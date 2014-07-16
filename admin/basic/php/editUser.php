<?php
    //header('Content-Type: application/json; charset=utf-8');
    header('Content-Type: text/html; charset=utf-8');
    include("config.php");

    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
    $id = $params["id"];
    $group_id = $params["groupId"];
    $login = $params["login"];
    $pass = $params["password"];
    $surname = $params["surname"];
    $name = $params["name"];
    $fname = $params["fname"];
    $email = $params["email"];

    if($params["allow_add"] == true)
        $allow_add = 1;
    else
        $allow_add = 0;

    if($params["allow_edit"] == true)
            $allow_edit = 1;
        else
            $allow_edit = 0;

    if($params["allow_delete"] == true)
            $allow_delete = 1;
        else
            $allow_delete = 0;

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "UPDATE users SET users_group_id = $group_id,
                               users_login = '$login',
                               users_password = '$pass',
                               users_surname = '$surname',
                               users_name = '$name',
                               users_fname = '$fname',
                               users_email = '$email',
                               users_allow_add = $allow_add,
                               users_allow_edit = $allow_edit,
                               users_allow_delete = $allow_delete
              WHERE users_id = $id";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE){
        echo "success";
    } else
        echo "fail";


    mysql_free_result($result);
    mysql_close($link);
?>