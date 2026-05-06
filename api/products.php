<?php

require __DIR__ . "/db.php";

header("Content-Type: application/json; charset=utf-8");

$sql = "SELECT id, name, price, img FROM products ORDER BY id DESC LIMIT 12";
$result = $conn->query($sql);

if ($result === false) {
  http_response_code(500);
  echo json_encode(["error" => "query_failed"]);
  exit;
}

$rows = [];
while ($row = $result->fetch_assoc()) {
  $rows[] = $row;
}

echo json_encode($rows, JSON_UNESCAPED_UNICODE);
