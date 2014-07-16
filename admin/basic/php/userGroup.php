<?php
    header("Content-Type: application/json; charset=utf-8");
    include("config.php");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $operation = $params["operation"];
    $final_result;

    $link = mysql_connect("$host", "$user", "$password") or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");
    mysql_query("SET NAMES utf8");

    switch($operation){
        case "load": load(); break;
        case "delete": remove(); break;
    }

    /** Загрузка групп пользователей **/
    function load(){
        global $final_result;
        $groups = array();

        $query = "SELECT * FROM user_groups";
        $result = mysql_query($query) or die("Loading user groups failed: ".mysql_error());
        if($result != FALSE){
            for($i = 0; $i < mysql_num_rows($result); $i++){
                $user_group = mysql_fetch_array($result);
                $groups[] = $user_group;
            }
            $final_result = json_encode($groups);
        } else
            $final_result = "fail";
        mysql_free_result($result);
    };

    mysql_close($link);
    echo $final_result;
?>