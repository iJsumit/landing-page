<?php
header('Content-Type: application/json');

// ===== LeadSquared Keys =====
$accessKey = 'u$r8f7221a5d822db8c6d1de8a0c8e7df3e';
$secretKey = 'eeaa5acad34ae6e79cfeeb125145038260e6b55a';
$lsqUrl = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture?accessKey=$accessKey&secretKey=$secretKey";

// ===== Razorpay Keys =====
$razorKey = "rzp_test_SEq1sCg5k0PlrU";
$razorSecret = "WxjkAJ2B5425fH9LO9o0zyl6";

// ===== Receive JSON =====
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    echo json_encode(['status' => 'error']);
    exit;
}

// ===== 1. Capture Lead =====
$leadData = [
    ["Attribute" => "FirstName", "Value" => $input['fName'] ?? ''],
    ["Attribute" => "LastName", "Value" => $input['lName'] ?? ''],
    ["Attribute" => "EmailAddress", "Value" => $input['email'] ?? ''],
    ["Attribute" => "Phone", "Value" => $input['phone'] ?? ''],
    ["Attribute" => "mx_Course", "Value" => "FB Insta"],
    ["Attribute" => "mx_Payment", "Value" => "Processing"]
];

$ch = curl_init($lsqUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($leadData));
curl_exec($ch);

// ===== 2. Create Razorpay Order =====
$orderData = [
    "amount" => 150000, // amount in paise (adjust properly)
    "currency" => "INR",
    "receipt" => "order_" . time()
];

$ch = curl_init("https://api.razorpay.com/v1/orders");
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERPWD => $razorKey . ":" . $razorSecret,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($orderData),
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"]
]);

$response = curl_exec($ch);

$lsqResponse = json_decode($response, true);
$leadId = $lsqResponse['Message']['Id'] ?? null;

$order = json_decode($response, true);

echo json_encode([
    "status" => "success",
    "order_id" => $order['id'],
    "amount" => $order['amount'],
    "key" => $razorKey,
    "LeadID" => $leadId
]);
