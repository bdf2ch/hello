<?php
    header("Content-Type: application/json; charset=utf-8");
    include("config.php");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $source = $params["source"];
    $final_result;

    /** Подключение к БД и установка кодировки соединения **/
    $link = mysql_connect("$host", "$user", "$password") or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");
    mysql_query("SET NAMES utf8");

    /* Выбор типа  */
    switch($operation){
        case "load": load(); break;
        case "add": add(); break;
        case "delete": remove(); break;
        case "edit": edit(); break;
        default: break;
    }

        /** Загрузка пользователей **/
        function load(){
            global $final_result;
            $users = array();

            $query = "SELECT * FROM users";
            $result = mysql_query($query) or die("Loading users failed: ".mysql_error());
            if($result != FALSE){
                for($i = 0; $i < mysql_num_rows($result); $i++){
                    $user = mysql_fetch_array($result);
                    $users[] = $user;
                }
                $final_result = json_encode($users);
            } else
                $final_result = "fail";
            mysql_free_result($result);
        };

         /** Добавление пользователя **/
        function add(){
            global $final_result;
            global $params;
            $user;
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

            $salt = generate_salt();
            $encoded_password = md5(md5($pass).md5($salt));

            $query = "INSERT INTO users (users_group_id, users_login, users_password, users_surname, users_name, users_fname, users_email, users_allow_add, users_allow_edit, users_allow_delete, users_salt)
                                 VALUES ($group_id, '$login', '$encoded_password', '$surname', '$name', '$fname', '$email', $allow_add, $allow_edit, $allow_delete, '$salt')";
            $result = mysql_query($query) or die("Adding user failed: ".mysql_error());
            if($result != FALSE){
                $id = mysql_insert_id();
                $query2 = "SELECT * FROM users WHERE users_id = $id";
                $result2 = mysql_query($query2) or die("Query failed : " . mysql_error());
                $user = mysql_fetch_array($result2);
                $final_result = json_encode($user);
                //mysql_free_result($result2);
            } else
                $final_result = "fail";
            //mysql_free_result($result);
        };

        mysql_close($link);
        echo $final_result;


?>