<?php
header('Content-Type: application/json');

// ===== Razorpay Secret =====
$razorSecret = "WxjkAJ2B5425fH9LO9o0zyl6";

// ===== LeadSquared Keys =====
$accessKey = 'u$r8f7221a5d822db8c6d1de8a0c8e7df3e';
$secretKey = 'eeaa5acad34ae6e79cfeeb125145038260e6b55a';
$updateUrl = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=$accessKey&secretKey=$secretKey&LeadID=$leadId";

// ===== Receive Razorpay Response =====
$input = json_decode(file_get_contents("php://input"), true);

$orderId = $input['razorpay_order_id'] ?? '';
$paymentId = $input['razorpay_payment_id'] ?? '';
$signature = $input['razorpay_signature'] ?? '';
$email = $input['email'] ?? '';  // We will send email from JS

// ===== Signature Verify =====
$generatedSignature = hash_hmac(
    'sha256',
    $orderId . "|" . $paymentId,
    $razorSecret
);

if ($generatedSignature !== $signature) {
    echo json_encode(["status" => "failed"]);
    exit;
}

// ===== Update Lead as Paid =====
$leadId = $input['leadId'] ?? '';

$data = [
    ["Attribute" => "mx_Payment_Status", "Value" => "success"],
    ["Attribute" => "mx_Razorpay_Payment_ID", "Value" => $paymentId]
];


$ch = curl_init($updateUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_exec($ch);

echo json_encode(["status" => "success"]);
