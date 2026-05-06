<?php

require __DIR__ . "/db.php";

header("Content-Type: application/json; charset=utf-8");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "method_not_allowed"]);
  exit;
}

$name = trim($_POST["name"] ?? "");
$price = $_POST["price"] ?? "";
$img = trim($_POST["img"] ?? "");

if ($name === "" || $price === "" || $img === "") {
  http_response_code(400);
  echo json_encode(["error" => "missing_fields"]);
  exit;
}

if (!is_numeric($price)) {
  http_response_code(400);
  echo json_encode(["error" => "price_not_numeric"]);
  exit;
}

$stmt = $conn->prepare("INSERT INTO products (name, price, img) VALUES (?, ?, ?)");
if (!$stmt) {
  http_response_code(500);
  echo json_encode(["error" => "prepare_failed"]);
  exit;
}

$priceInt = (int)$price;
$stmt->bind_param("sis", $name, $priceInt, $img);

if (!$stmt->execute()) {
  http_response_code(500);
  echo json_encode(["error" => "insert_failed"]);
  exit;
}

echo json_encode(["ok" => true, "id" => $stmt->insert_id], JSON_UNESCAPED_UNICODE);
