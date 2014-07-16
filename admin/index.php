<?php
    include("basic/php/xtemplate.class.php");
    $template = new XTemplate("basic/templates/server/index.html");

    if(isset($_COOKIE["id"]) && $_COOKIE["id"] != null){
        $template -> assign_file("CONTENT", "basic/templates/server/control_panel.html");
    } else {
        $template -> assign_file("CONTENT", "basic/templates/server/login.html");
    }

    $template -> parse("main");
    $template -> out("main");
?>