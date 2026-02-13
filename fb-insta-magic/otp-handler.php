<?php
session_start();
header('Content-Type: application/json');

$GUPSHUP_USER = "2000250721";
$GUPSHUP_PASS = "pmLVHjnr";
$SENDER_ID = "IJPRIA";
$PE_ID = "1201173322291525916";
$TEMPLATE_ID = "1207173425011655385";


$MSG_TEMPLATE = "%s is the OTP to verify your mobile number with iJaipuria. Do not share this with anyone.";

/* ==========================================================
   INPUT READ
========================================================== */

$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';

/* ==========================================================
   SEND OTP
========================================================== */

if ($action === 'send_otp') {

    $phone = trim($input['phone'] ?? '');

    // Strict Indian number validation
    if (!preg_match('/^[6-9][0-9]{9}$/', $phone)) {
        echo json_encode(['status' => 'error', 'message' => 'Invalid phone number']);
        exit;
    }

    // International format
    $phone = '91' . $phone;

    // Generate OTP
    $otp = random_int(100000, 999999);

    // Save in session
    $_SESSION['otp_code'] = $otp;
    $_SESSION['otp_time'] = time();
    $_SESSION['otp_phone'] = $phone;

    // Prepare POST data
    $postData = [
        'method' => 'sendMessage',
        'send_to' => $phone,
        'msg' => sprintf($MSG_TEMPLATE, $otp),
        'msg_type' => 'TEXT',
        'userid' => $GUPSHUP_USER,
        'auth_scheme' => 'plain',
        'password' => $GUPSHUP_PASS,
        'v' => '1.1',
        'format' => 'json',
        'mask' => $SENDER_ID,
        'dltTemplateId' => $TEMPLATE_ID,
        'principalEntityId' => $PE_ID
    ];

    $ch = curl_init('https://enterprise.smsgupshup.com/GatewayAPI/rest');

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query($postData),
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Gateway connection failed'
        ]);
        exit;
    }


    echo json_encode([
        'status' => 'success',
        'message' => 'OTP sent successfully'
    ]);
    exit;
}

/* ==========================================================
   VERIFY OTP
========================================================== */

if ($action === 'verify_otp') {

    $userOtp = trim($input['otp'] ?? '');

    if (
        empty($_SESSION['otp_code']) ||
        empty($_SESSION['otp_time'])
    ) {
        echo json_encode([
            'status' => 'error',
            'message' => 'OTP expired, please resend'
        ]);
        exit;
    }

    // OTP expiry: 2 minutes
    if (time() - $_SESSION['otp_time'] > 120) {
        session_unset();
        echo json_encode([
            'status' => 'error',
            'message' => 'OTP expired'
        ]);
        exit;
    }

    if ($userOtp == $_SESSION['otp_code']) {
        unset($_SESSION['otp_code'], $_SESSION['otp_time']);

        echo json_encode([
            'status' => 'success',
            'message' => 'OTP verified'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Incorrect OTP'
        ]);
    }
    exit;
}

/* ==========================================================
   FALLBACK
========================================================== */

echo json_encode([
    'status' => 'error',
    'message' => 'Invalid request'
]);
