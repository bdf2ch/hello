<?php
    header('Content-Type: application/json; charset=utf-8');
    include("config.php");

    $link = mysql_connect("$host", "$user", "$password")
            or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $name = mysql_real_escape_string($params["name"]);
    $nameEnc = iconv("UTF-8", "Windows-1251", $name);

    $email = mysql_real_escape_string($params["email"]);
    $emailEnc = iconv("UTF-8", "Windows-1251", $email);

    $message = mysql_real_escape_string($params["message"]);
    $messageEnc = iconv("UTF-8", "Windows-1251", $message);

    $browser = mysql_real_escape_string($params["browser"]);

    $ip = $_SERVER["REMOTE_ADDR"];
    $date = mktime();


    $query = "INSERT INTO feedback (feedback_name, feedback_email, feedback_message, feedback_browser, feedback_ip, feedback_date)
              VALUES ('$name', '$email', '$message', '$browser', '$ip', '$date')";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());
    if($result != FALSE){
        //$id = mysql_insert_id();
        //$query = "SELECT * FROM addresses WHERE addresses_id = $id";
        //$result = mysql_query($query) or die("Query failed : " . mysql_error());
        //$answer = mysql_fetch_array($result);
        //echo(json_encode($answer));
        $to = "c-media.tel@yandex.ru";
        $subject = "Сообщение от www.ВесьМурманскПлюс.рф";
        $message = "<html>
                        <title>Сообщение от www.ВесьМурманскПлюс.рф</title>
                        <body>
                            <b>Имя:</b> $name<br>
                            <b>E-mail:</b> $email<br><br>
                            <b>Сообщение:</b><br>
                            $message
                        </dody>
                    </html>";
    //$msgBR = nl2br($message, false);
    $msgBR = str_replace("\\n", "<br>", $message);
    $msgBR = str_replace("\\'", "&prime;", $msgBR);
    $msgBR = str_replace('\\"', "&quot;", $msgBR);

        $headers  = "Content-type: text/html; charset=utf-8";
        mail($to, $subject, $msgBR, $headers);
        echo "success";
    }
    else
        echo "fail";


    //mysql_free_result($result);
    mysql_close($link);
?>