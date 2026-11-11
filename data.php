<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Determine true project root directory
$baseDir = __DIR__;
if (basename($baseDir) === 'api') {
    $baseDir = dirname($baseDir);
}

$dbFile = $baseDir . '/data/database.json';
$targetFiles = [
    $dbFile,
    $baseDir . '/public/data/database.json',
    $baseDir . '/dist/data/database.json'
];

// GET: Return current database JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    foreach ($targetFiles as $file) {
        if (file_exists($file)) {
            $content = file_get_contents($file);
            if ($content !== false && strlen(trim($content)) > 0) {
                echo $content;
                exit;
            }
        }
    }

    http_response_code(404);
    echo json_encode(["success" => false, "message" => "Database belum diinisialisasi."]);
    exit;
}

// POST: Save and synchronize data to database.json
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    if (empty($rawInput)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Payload kosong."]);
        exit;
    }

    $input = json_decode($rawInput, true);
    if (!is_array($input)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Format JSON tidak valid."]);
        exit;
    }

    // Read current database
    $currentDb = [];
    foreach ($targetFiles as $file) {
        if (file_exists($file)) {
            $existing = file_get_contents($file);
            if ($existing) {
                $decoded = json_decode($existing, true);
                if (is_array($decoded) && count($decoded) > 0) {
                    $currentDb = $decoded;
                    break;
                }
            }
        }
    }

    // Check if partial update: { key: 'banners', data: [...] }
    if (isset($input['key']) && array_key_exists('data', $input)) {
        $key = $input['key'];
        $currentDb[$key] = $input['data'];
    } else {
        // Full update or multiple keys (banners, products, articles, team, branches, applications, contactMessages, financialReports, spiritualSocial, visitorStats, etc.)
        foreach ($input as $k => $v) {
            $currentDb[$k] = $v;
        }
    }

    $jsonString = json_encode($currentDb, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    $saved = false;
    foreach ($targetFiles as $file) {
        $dir = dirname($file);
        if (!file_exists($dir)) {
            @mkdir($dir, 0777, true);
        }
        if (file_put_contents($file, $jsonString) !== false) {
            $saved = true;
        }
    }

    if ($saved) {
        echo json_encode([
            "success" => true,
            "message" => "Data berhasil disimpan dan disinkronkan ke server secara global!",
            "updatedAt" => date('Y-m-d H:i:s')
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Gagal menulis file database.json di server."
        ]);
    }
    exit;
}
