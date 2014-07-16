<?php
    header('Content-Type: application/json');
    include("config.php");


    $postdata = file_get_contents('php://input');
    //echo $postdata;
    $params = json_decode($postdata, true);
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


    $salt = '';
    $length = rand(5,10); // длина соли (от 5 до 10 сомволов)
    for($i = 0; $i < $length; $i++){
        $salt .= chr(rand(33,126)); // символ из ASCII-table
    }

    $encoded_password = md5(md5($pass).md5($salt));

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "INSERT INTO users (users_group_id, users_login, users_password, users_surname, users_name, users_fname, users_email, users_allow_add, users_allow_edit, users_allow_delete, users_salt)
              VALUES ($group_id, '$login', '$encoded_password', '$surname', '$name', '$fname', '$email', $allow_add, $allow_edit, $allow_delete, '$salt')";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE){
        $id = mysql_insert_id();
        $query = "SELECT * FROM users WHERE users_id = $id";
        $result = mysql_query($query) or die("Query failed : " . mysql_error());
        $answer = mysql_fetch_array($result);
        echo(json_encode($answer));
    }
    else
        echo "fail";


    mysql_free_result($result);
    mysql_close($link);
?>