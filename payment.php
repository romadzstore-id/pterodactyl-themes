<?php
/*
 * Backend Payment Gateway Handler untuk Sapura Cloud
 * File: api/payment.php
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfigurasi
$config = [
    'api_key' => 'yourapikeyxxxxxxxxxxx',
    'api_url' => 'https://atlantich2h.com',
    'webhook_secret' => 'your_webhook_secret_here',
    'db_host' => 'localhost',
    'db_name' => 'sapuracloud',
    'db_user' => 'root',
    'db_pass' => ''
];

// Database connection (contoh menggunakan MySQLi)
function getDBConnection() {
    global $config;
    static $conn = null;
    
    if ($conn === null) {
        $conn = new mysqli(
            $config['db_host'],
            $config['db_user'],
            $config['db_pass'],
            $config['db_name']
        );
        
        if ($conn->connect_error) {
            error_log("Database connection failed: " . $conn->connect_error);
            return null;
        }
        
        $conn->set_charset("utf8mb4");
    }
    
    return $conn;
}

// Create transaction
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'create') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['username']) || !isset($input['package'])) {
        echo json_encode([
            'status' => false,
            'message' => 'Data tidak lengkap',
            'code' => 400
        ]);
        exit;
    }
    
    // Generate reference ID
    $reff_id = 'SC' . time() . substr(str_shuffle('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 6);
    
    // Determine product code based on package
    $package_code = getPackageCode($input['package']);
    
    // Call Atlantic Pedia API
    $api_data = [
        'api_key' => $config['api_key'],
        'code' => $package_code,
        'reff_id' => $reff_id,
        'target' => $input['username'],
        'limit_price' => $input['package']['price']
    ];
    
    $ch = curl_init($config['api_url'] . '/transaksi/create');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($api_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/x-www-form-urlencoded'
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code !== 200) {
        echo json_encode([
            'status' => false,
            'message' => 'Gagal menghubungi payment gateway',
            'code' => $http_code
        ]);
        exit;
    }
    
    $api_response = json_decode($response, true);
    
    // Save to database
    if ($api_response['status']) {
        saveTransactionToDB($api_response['data'], $input);
    }
    
    echo json_encode($api_response);
    exit;
}

// Check transaction status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'status') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['transaction_id'])) {
        echo json_encode([
            'status' => false,
            'message' => 'Transaction ID required',
            'code' => 400
        ]);
        exit;
    }
    
    // Check database first
    $transaction = getTransactionFromDB($input['transaction_id']);
    
    if ($transaction && $transaction['status'] === 'paid') {
        echo json_encode([
            'status' => true,
            'message' => 'Pembayaran berhasil',
            'data' => [
                'status' => 'paid',
                'sn' => $transaction['sn'],
                'credentials' => [
                    'username' => $transaction['username'],
                    'password' => decryptPassword($transaction['password']),
                    'panel_url' => 'https://panel.sapuracloud.id',
                    'expiry_date' => date('Y-m-d', strtotime('+30 days'))
                ]
            ]
        ]);
        exit;
    }
    
    // If not in DB or not paid, check API
    $api_data = [
        'api_key' => $config['api_key'],
        'id' => $input['transaction_id']
    ];
    
    $ch = curl_init($config['api_url'] . '/transaksi/status');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($api_data));
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    echo $response;
    exit;
}

// Webhook handler for payment notifications
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'webhook') {
    $signature = $_SERVER['HTTP_X_SIGNATURE'] ?? '';
    $payload = file_get_contents('php://input');
    
    // Verify signature
    $expected_signature = hash_hmac('sha256', $payload, $config['webhook_secret']);
    
    if (!hash_equals($expected_signature, $signature)) {
        http_response_code(401);
        echo json_encode(['status' => false, 'message' => 'Invalid signature']);
        exit;
    }
    
    $data = json_decode($payload, true);
    
    if ($data['status'] === 'paid') {
        // Update transaction in database
        updateTransactionStatus($data['data']['id'], 'paid', $data['data']['sn']);
        
        // Send notification email/WhatsApp (optional)
        sendPaymentNotification($data['data']);
    }
    
    echo json_encode(['status' => true, 'message' => 'Webhook processed']);
    exit;
}

// Helper functions
function getPackageCode($package) {
    $name = strtolower($package['name']);
    
    $codes = [
        '1gb' => 'PLN1GB',
        '2gb' => 'PLN2GB',
        '3gb' => 'PLN3GB',
        '4gb' => 'PLN4GB',
        '5gb' => 'PLN5GB',
        'reseller' => 'PLNRSL'
    ];
    
    foreach ($codes as $key => $code) {
        if (strpos($name, $key) !== false) {
            return $code;
        }
    }
    
    return 'PLN1GB';
}

function saveTransactionToDB($api_data, $input) {
    $conn = getDBConnection();
    if (!$conn) return false;
    
    $stmt = $conn->prepare("
        INSERT INTO transactions 
        (transaction_id, reff_id, username, password, package, price, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $encrypted_password = encryptPassword($input['password']);
    
    $stmt->bind_param(
        "sssssiss",
        $api_data['id'],
        $api_data['reff_id'],
        $input['username'],
        $encrypted_password,
        $api_data['layanan'],
        $api_data['price'],
        $api_data['status'],
        $api_data['created_at']
    );
    
    return $stmt->execute();
}

function getTransactionFromDB($transaction_id) {
    $conn = getDBConnection();
    if (!$conn) return null;
    
    $stmt = $conn->prepare("
        SELECT * FROM transactions 
        WHERE transaction_id = ?
    ");
    
    $stmt->bind_param("s", $transaction_id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    return $result->fetch_assoc();
}

function updateTransactionStatus($transaction_id, $status, $sn) {
    $conn = getDBConnection();
    if (!$conn) return false;
    
    $stmt = $conn->prepare("
        UPDATE transactions 
        SET status = ?, sn = ?, updated_at = NOW()
        WHERE transaction_id = ?
    ");
    
    $stmt->bind_param("sss", $status, $sn, $transaction_id);
    return $stmt->execute();
}

function encryptPassword($password) {
    // Use OpenSSL for encryption in production
    $method = 'aes-256-cbc';
    $key = hash('sha256', 'your_encryption_key_here', true);
    $iv = openssl_random_pseudo_bytes(16);
    
    $encrypted = openssl_encrypt($password, $method, $key, 0, $iv);
    return base64_encode($iv . $encrypted);
}

function decryptPassword($encrypted) {
    $method = 'aes-256-cbc';
    $key = hash('sha256', 'your_encryption_key_here', true);
    
    $data = base64_decode($encrypted);
    $iv = substr($data, 0, 16);
    $encrypted_password = substr($data, 16);
    
    return openssl_decrypt($encrypted_password, $method, $key, 0, $iv);
}

function sendPaymentNotification($transaction) {
    // Implement notification logic (email, WhatsApp, etc.)
    // This is optional
}

// Default response for invalid requests
echo json_encode([
    'status' => false,
    'message' => 'Invalid request',
    'code' => 404
]);
?>