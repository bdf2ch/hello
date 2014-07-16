<?php
    header('Content-Type: application/json');
    include("config.php");

    $postdata = file_get_contents('php://input');
    $params = json_decode($postdata, true);
    $companyId = $params["companyId"];

    $link = mysql_connect("$host", "$user", "$password")
        or die("Could not connect : " . mysql_error());
    mysql_select_db("$dbname") or die("Could not select database");

    $query = "SELECT * FROM companies WHERE companies_id = $companyId";
    mysql_query("SET NAMES utf8");
    $result = mysql_query($query) or die("Query failed : " . mysql_error());

    for($i = 0; $i < mysql_num_rows($result); $i++){
         $org = mysql_fetch_array($result);
         $query2 = "SELECT * FROM addresses WHERE addresses_company_id = $org[companies_id]";
         $result2 = mysql_query($query2) or die("Error selecting addresses. ".mysql_error());

         for($x = 0; $x < mysql_num_rows($result2); $x++){
            $addresses = mysql_fetch_array($result2);
            $org['addresses'][$x] = $addresses;
            $query3 = "SELECT * FROM contacts WHERE contacts_address_id = $addresses[addresses_id]";
            $result3 = mysql_query($query3) or die("Error selecting contacts. ".mysql_error());

            for($y = 0; $y < mysql_num_rows($result3); $y++){
                $contacts = mysql_fetch_array($result3);
                $org['addresses'][$x]['contacts'][$y] = $contacts;
            }
         }
    }

    mysql_free_result($result);
    mysql_close($link);

    echo(json_encode($org));
?>