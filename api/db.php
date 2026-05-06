<?php

$host = "localhost";
$user = "root";
$pass = "";
$db = "xiaotu";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_errno) {
  http_response_code(500);
  header("Content-Type: application/json; charset=utf-8");
  echo json_encode(["error" => "db_connect_failed"]);
  exit;
}

$conn->set_charset("utf8mb4");
