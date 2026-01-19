<?php
session_start();

// Store UTM from URL to session on first visit
if (!isset($_SESSION['utm_source']) && isset($_GET['utm_source'])) {
    $_SESSION['utm_source'] = $_GET['utm_source'];
    $_SESSION['utm_medium'] = $_GET['utm_medium'] ?? '';
    $_SESSION['utm_campaign'] = $_GET['utm_campaign'] ?? '';
    $_SESSION['utm_term'] = $_GET['utm_term'] ?? '';
    $_SESSION['utm_content'] = $_GET['utm_content'] ?? '';
}

// Step 1: Prepare form data 
$rawData = [
    "FirstName" => $_POST['fName'] ?? '',
    "LastName" => $_POST['lName'] ?? '',
    "EmailAddress" => $_POST['email'] ?? '',
    "Phone" => $_POST['phone'] ?? '',
    "mx_Experience_Level" => $_POST['experience'] ?? '',
    "mx_City" => $_POST['city'] ?? '',
    "Source" => 'CWM_Landing_Page',
    "mx_Course" => 'CWM_Landing_Page_AAFM',
];

$captureUtm = [
    'mx_utm_campaign' => $_POST['utm_campaign'] ?? '',
    'mx_utm_source' => $_POST['utm_source'] ?? '',
    'mx_utm_medium' => $_POST['utm_medium'] ?? '',
    'mx_utm_term' => $_POST['utm_term'] ?? '',
    'mx_utm_content' => $_POST['utm_content'] ?? ''
];



// Step 2: Convert to LeadSquared format

$data = [];
foreach ($rawData as $key => $value) {
    $data[] = ["Attribute" => $key, "Value" => $value];
}

$utmData = [];
foreach ($captureUtm as $key => $value) {
    $utmData[] = ["Attribute" => $key, "Value" => $value];

}

// Combine both arrays
$combinedData = array_merge($data, $utmData);
$jsonData = json_encode($combinedData);

// Step 3: API URL with accessKey and secretKey
$url = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";
$accessKey = 'u$r8f7221a5d822db8c6d1de8a0c8e7df3e';
$secretKey = 'eeaa5acad34ae6e79cfeeb125145038260e6b55a';

$query = http_build_query(['accessKey' => $accessKey, 'secretKey' => $secretKey]);

$fullUrl = $url . '?' . $query;

// Step 4: cURL call
$ch = curl_init($fullUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Step 5: Debug output
if ($httpCode === 200) {
    $response = ['statusCode' => 200, 'message' => 'Success! The operation was completed.'];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
} else {
    $response = ['statusCode' => $httpCode, 'message' => 'Something went wrong! Please try again.'];
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}