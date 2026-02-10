<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// ==========================================================
// 👇 STEP 1: LEADSQUARED CREDENTIALS
// ==========================================================
$accessKey = 'u$r8f7221a5d822db8c6d1de8a0c8e7df3e';
$secretKey = 'eeaa5acad34ae6e79cfeeb125145038260e6b55a';

// API URL (India accounts ke liye usually api-in21 hota hai)
$url = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=$accessKey&secretKey=$secretKey";

// ==========================================================

// 1. Receive JSON Data (IMPORTANT: $_POST will not work with fetch JSON)
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Fallback: Agar JSON empty hai to blank array maan lo
if (!$input) {
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit();
}

// 2. Map JS Data to Your Schema
// JS sends: fName, lName, email, phone, utm_source...
$rawData = [
    "FirstName" => $input['fName'] ?? '',
    "LastName" => $input['lName'] ?? '',
    "EmailAddress" => $input['email'] ?? '',
    "Phone" => $input['phone'] ?? '',
    "Source" => 'FB Insta via OTP - New',
    "mx_Course" => 'FB Insta',
];

$captureUtm = [
    'mx_utm_campaign' => $input['utm_campaign'] ?? '',
    'mx_utm_source' => $input['utm_source'] ?? '',
    'mx_utm_medium' => $input['utm_medium'] ?? '',
    'mx_utm_term' => $input['utm_term'] ?? '',
    'mx_utm_content' => $input['utm_content'] ?? ''
];

// 3. Convert to LeadSquared Format [{"Attribute": "x", "Value": "y"}]
$data = [];
foreach ($rawData as $key => $value) {
    if (!empty($value)) { // Empty values bhejne ka faida nahi
        $data[] = ["Attribute" => $key, "Value" => $value];
    }
}
foreach ($captureUtm as $key => $value) {
    if (!empty($value)) {
        $data[] = ["Attribute" => $key, "Value" => $value];
    }
}

// 4. Send to LeadSquared via cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// 5. Return Response to JS (Taaki JS ko pata chale kya hua)
// Note: Humara JS 'finally' block me redirect karega hi karega, chahe yahan error aaye.
if ($httpCode === 200 && !$curlError) {
    echo json_encode([
        'status' => 'success',
        'message' => 'Lead Captured Successfully',
        'lsq_response' => json_decode($response)
    ]);
} else {
    // Agar LSQ fail hua, tab bhi hum error return karenge, 
    // lekin JS ise ignore karke redirect kar dega (Fail-safe logic).
    echo json_encode([
        'status' => 'error',
        'message' => 'LSQ Failed',
        'debug' => $httpCode
    ]);
}
?>