<?php

    function generate_password(){
        $password = "";
        $length = rand(5,10); // длина пароля (от 5 до 10 сомволов)
        for($i = 0; $i < $length; $i++){
            $password .= chr(rand(33,126)); // символ из ASCII-table
        }
        return $password;
    };

    function generate_salt(){
        $salt = '';
        $length = rand(5,7); // длина соли (от 5 до 10 сомволов)
        for($i = 0; $i < $length; $i++){
            $salt .= chr(rand(33,126)); // символ из ASCII-table
        }
        return $salt;
    };

?>