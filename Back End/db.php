<?php

function getConnection() {
    $host = getenv('DB_HOST') ?: "localhost";
    $db_name = getenv('DB_NAME') ?: "perpustakaan";
    $username = getenv('DB_USER') ?: "root";
    $password = getenv('DB_PASS') ?: "";

    $conn = new mysqli($host, $username, $password, $db_name);

    if ($conn->connect_error) {
        die("Connection failed: ".$conn->connect_error);
    }

    return $conn;
}