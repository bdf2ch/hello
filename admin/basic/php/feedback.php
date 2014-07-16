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

    /* Загрузка сообщений обратной связи */
    function load(){
        global $final_result;
        $feedback = array();
        $query = "SELECT * FROM feedback";

        $result = mysql_query($query) or die("Loading feedback failed: ".mysql_error());
        if($result != FALSE){
            for($i = 0; $i < mysql_num_rows($result); $i++){
                $feedback_message = mysql_fetch_array($result);
                $feedback[] = $feedback_message;
            }
            $final_result = json_encode($feedback);
        } else
            $final_result = "fail";
        mysql_free_result($result);
    };

    mysql_close($link);
    echo $final_result;
?>