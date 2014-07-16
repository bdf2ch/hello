<?php
    header('Content-Type: application/json');
    include("config.php");
    $user_groups = array();

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "SELECT * FROM user_groups ORDER BY user_groups_id ASC";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());

    for($i = 0; $i < mysql_num_rows($result); $i++){
        $row = mysql_fetch_array($result);
        $user_groups[] = $row;
    }

    mysql_free_result($result);
    mysql_close($link);

    echo(json_encode($user_groups));
?>