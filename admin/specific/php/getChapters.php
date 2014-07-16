<?php
    header('Content-Type: application/json');
    include("config.php");
    $chapters = array();

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "SELECT * FROM chapters";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());

    for($i = 0; $i < mysql_num_rows($result); $i++){
        $row = mysql_fetch_array($result);
        $chapters[] = $row;
    }

    mysql_free_result($result);
    mysql_close($link);

    echo(json_encode($chapters));
?>