<?php
    //header("Content-Type: application/json; charset=utf-8");
    include("config.php");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $email = $params["email"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "SELECT * FROM users WHERE users_email = '$email' LIMIT 1";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : ".mysql_error());
    if($result != false && mysql_num_rows($result) > 0){
        $user = mysql_fetch_array($result);

        $chars="qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
        $max=10;
        $size=StrLen($chars)-1;
        $password=null;

        while($max--)
            $password.=$chars[rand(0,$size)];

        $salt = $user["users_salt"];
        $passwd = md5(md5($password).md5($salt));
        echo "success";

    } else
        echo "fail";

        mysql_free_result($result);
        mysql_close($link);
?>