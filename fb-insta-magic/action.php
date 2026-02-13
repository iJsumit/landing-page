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
    echo json_encode(['status' => 'error', 'message' => 'Invalid Input']);
    exit;
}

// ===== 1. Capture Lead (LeadSquared) =====
$leadData = [
    ["Attribute" => "FirstName", "Value" => $input['fName'] ?? ''],
    ["Attribute" => "LastName", "Value" => $input['lName'] ?? ''],
    ["Attribute" => "EmailAddress", "Value" => $input['email'] ?? ''],
    ["Attribute" => "mx_State", "Value" => $input['state'] ?? ''],
    ["Attribute" => "Phone", "Value" => $input['phone'] ?? ''],
    ["Attribute" => "mx_Course", "Value" => "FB Insta"],
    ["Attribute" => "Source", "Value" => "FB Insta - Magic Checkout"],
    ["Attribute" => "mx_Payment", "Value" => "pending"]
];

$chLsq = curl_init($lsqUrl);
curl_setopt($chLsq, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chLsq, CURLOPT_POST, true);
curl_setopt($chLsq, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($chLsq, CURLOPT_POSTFIELDS, json_encode($leadData));

// Yahan response capture karna zaroori hai
$lsqRawResponse = curl_exec($chLsq);

// $lsqData = json_decode($lsqRawResponse, true);
// LeadSquared mein Lead ID 'Message' field mein aati hai
// $LeadID = $lsqData['Message']['id'] ?? 'Not-Generated';
echo "$lsqRawResponse";
exit;

// ===== 2. Create Razorpay Order =====
$orderData = [
    "amount" => 150000, // 1500 INR
    "currency" => "INR",
    "receipt" => "order_" . time(),
    "notes" => [
        "lead_id" => $LeadID // Optional: Razorpay dashboard mein bhi ID dikhegi
    ]
];

$chRzp = curl_init("https://api.razorpay.com/v1/orders");
curl_setopt_array($chRzp, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERPWD => $razorKey . ":" . $razorSecret,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($orderData),
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"]
]);

$rzpRawResponse = curl_exec($chRzp);

$order = json_decode($rzpRawResponse, true);

// ===== Final Response to Frontend =====
echo json_encode([
    "status" => "success",
    "order_id" => $order['id'],
    "amount" => $order['amount'],
    "key" => $razorKey,
    "LeadID" => $LeadID // Ab ye frontend par access ho jayega
]);