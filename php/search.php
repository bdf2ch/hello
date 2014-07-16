<?php
    header('Content-Type: application/json; charset=utf-8');
    include("config.php");

    $link = mysql_connect("$host", "$user", "$password")
            or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $search = mysql_real_escape_string($params["search"]);

    $chapters = array();
    $companies = array();
    $finish = array();

    $query = "SELECT * FROM chapters WHERE chapter_title LIKE '%$search%'";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE){
        for($i = 0; $i < mysql_num_rows($result); $i++){
            $answer = mysql_fetch_array($result);
            $chapters[] = $answer;
        }
    }
    else
        echo "fail";


    $query2 = "SELECT * FROM companies WHERE companies_title LIKE '%$search%'";
    $result2 = mysql_query($query2) or die("Query failed : " . mysql_error());
        if($result2 != FALSE){
            for($x = 0; $x < mysql_num_rows($result2); $x++){
                $answer2 = mysql_fetch_array($result2);
                $companies[] = $answer2;
            }
        }
        else
            echo "fail";

    $finish["chapters"] = $chapters;
    $finish["companies"] = $companies;

    echo json_encode($finish);

    mysql_free_result($result);
    mysql_close($link);
?>