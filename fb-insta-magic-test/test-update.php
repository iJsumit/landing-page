<?php

$accessKey = 'u$r8f7221a5d822db8c6d1de8a0c8e7df3e';
$secretKey = 'eeaa5acad34ae6e79cfeeb125145038260e6b55a';

/* 👇 Yaha LSQ se ek existing lead ka ProspectID daalo */
$leadId = "350ab16f-d035-4d02-99d1-a3d2332be926";

$updateUrl = "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey=$accessKey&secretKey=$secretKey&LeadID=$leadId";

$data = [
    // ["Attribute" => "LeadID", "Value" => $leadId],
    ["Attribute" => "FirstName", "Value" => "surajpuriya"]
];

$ch = curl_init($updateUrl);

curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);

echo "<pre>";
echo "HTTP: $httpCode\n";
echo "ERROR: $curlError\n";
echo "RESPONSE: $response\n";
echo "</pre>";
