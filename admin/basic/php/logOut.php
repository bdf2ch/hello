<?php
    //session_start();
    if(isset($_COOKIE["id"])){
        //unset($_COOKIE["id"]);
        setcookie ("id", '', time()-3600, "/");
        //echo "success";
        //echo " ".$_COOKIE["id"];
    }
?>