<?php
session_start();
require __DIR__ . '/config.php';

/* -------------------------
   SECURITY BASICS
--------------------------*/
ini_set('display_errors', 0);
error_reporting(0);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit;
}

/* -------------------------
   STORE UTM ON FIRST VISIT
--------------------------*/
if (!isset($_SESSION['utm_source']) && isset($_GET['utm_source'])) {
    $_SESSION['utm_source'] = $_GET['utm_source'];
    $_SESSION['utm_medium'] = $_GET['utm_medium'] ?? '';
    $_SESSION['utm_campaign'] = $_GET['utm_campaign'] ?? '';
    $_SESSION['utm_term'] = $_GET['utm_term'] ?? '';
    $_SESSION['utm_content'] = $_GET['utm_content'] ?? '';
}

/* -------------------------
   BASIC VALIDATION
--------------------------*/
$email = trim($_POST['email'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'statusCode' => 400,
        'message' => 'Invalid email'
    ]);
    exit;
}

/* -------------------------
   FORM DATA
--------------------------*/
$rawData = [
    "FirstName" => trim($_POST['fName'] ?? ''),
    "LastName" => trim($_POST['lName'] ?? ''),
    "EmailAddress" => $email,
    "Phone" => trim($_POST['phone'] ?? ''),
    "mx_Experience_Level" => $_POST['experience'] ?? '',
    "mx_State" => $_POST['state'] ?? '',
    "Source" => 'CWM+AI_Landing_Page',
    "mx_Course" => 'CWM+AI_Landing_Page_AAFM',
];

/* -------------------------
   UTM FROM SESSION (FIXED)
--------------------------*/
$utmData = [
    'mx_utm_campaign' => $_SESSION['utm_campaign'] ?? '',
    'mx_utm_source' => $_SESSION['utm_source'] ?? '',
    'mx_utm_medium' => $_SESSION['utm_medium'] ?? '',
    'mx_utm_term' => $_SESSION['utm_term'] ?? '',
    'mx_utm_content' => $_SESSION['utm_content'] ?? ''
];

/* -------------------------
   PREPARE API PAYLOAD
--------------------------*/
$data = [];
foreach (array_merge($rawData, $utmData) as $key => $value) {
    $data[] = [
        "Attribute" => $key,
        "Value" => $value
    ];
}

$jsonData = json_encode($data);

/* -------------------------
   API CONFIG (FROM ENV)
--------------------------*/
$apiUrl = $_ENV['LS_API_URL'];
$accessKey = $_ENV['LS_ACCESS_KEY'];
$secretKey = $_ENV['LS_SECRET_KEY'];

$fullUrl = $apiUrl . '?' . http_build_query([
    'accessKey' => $accessKey,
    'secretKey' => $secretKey
]);

/* -------------------------
   CURL REQUEST
--------------------------*/
$ch = curl_init($fullUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => $jsonData
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

/* -------------------------
   FINAL RESPONSE
--------------------------*/
header('Content-Type: application/json');

if ($httpCode === 200) {
    echo json_encode([
        'statusCode' => 200,
        'message' => 'Success'
    ]);
} else {
    echo json_encode([
        'statusCode' => $httpCode,
        'message' => 'Something went wrong'
    ]);
}
