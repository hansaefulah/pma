<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Metode harus POST."]);
    exit;
}

// Determine true project root directory
$baseDir = __DIR__;
if (basename($baseDir) === 'api') {
    $baseDir = dirname($baseDir);
}

$targetDirs = [
    $baseDir . '/public/uploads',
    $baseDir . '/dist/uploads',
    $baseDir . '/uploads'
];

// Ensure upload directories exist
foreach ($targetDirs as $d) {
    if (!file_exists($d)) {
        @mkdir($d, 0777, true);
    }
}

$allowedExt = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'mp4', 'webm', 'ogg'];
$maxSize = 25 * 1024 * 1024; // 25 MB

// CASE 1: Standard multipart/form-data upload
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    if ($file['size'] > $maxSize) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Ukuran file melebihi batas 25MB."]);
        exit;
    }

    $originalName = pathinfo($file['name'], PATHINFO_FILENAME);
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($extension, $allowedExt)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Format file tidak didukung. Gunakan gambar (JPG, PNG, WebP) atau video (MP4)."]);
        exit;
    }

    $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', $originalName);
    if (strlen($cleanName) > 25) {
        $cleanName = substr($cleanName, 0, 25);
    }
    $newFilename = time() . '_' . rand(100, 999) . '_' . $cleanName . '.' . $extension;

    $successCount = 0;
    $firstDest = $targetDirs[0] . '/' . $newFilename;
    if (move_uploaded_file($file['tmp_name'], $firstDest)) {
        $successCount++;
        for ($i = 1; $i < count($targetDirs); $i++) {
            $dest = $targetDirs[$i] . '/' . $newFilename;
            if (@copy($firstDest, $dest)) {
                $successCount++;
            }
        }
    }

    if ($successCount > 0) {
        echo json_encode([
            "success" => true,
            "filename" => $newFilename,
            "url" => "./uploads/" . $newFilename,
            "message" => "File berhasil diunggah dan disimpan ke folder uploads!"
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Gagal memindahkan file upload ke direktori tujuan."]);
    }
    exit;
}

// CASE 2: Base64 JSON upload
$rawInput = file_get_contents('php://input');
if (!empty($rawInput)) {
    $input = json_decode($rawInput, true);
    if (is_array($input) && !empty($input['base64'])) {
        $filename = !empty($input['filename']) ? $input['filename'] : 'file_' . time() . '.png';
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        if (empty($extension)) $extension = 'png';

        if (!in_array($extension, $allowedExt)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Format file base64 tidak didukung."]);
            exit;
        }

        $base64Str = $input['base64'];
        if (strpos($base64Str, ';base64,') !== false) {
            $base64Str = explode(';base64,', $base64Str)[1];
        }

        $decodedData = base64_decode($base64Str);
        if ($decodedData === false) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Base64 string tidak valid."]);
            exit;
        }

        $cleanBase = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($filename, PATHINFO_FILENAME));
        if (strlen($cleanBase) > 25) $cleanBase = substr($cleanBase, 0, 25);
        $newFilename = time() . '_' . rand(100, 999) . '_' . $cleanBase . '.' . $extension;

        $saved = false;
        foreach ($targetDirs as $dir) {
            $dest = $dir . '/' . $newFilename;
            if (file_put_contents($dest, $decodedData) !== false) {
                $saved = true;
            }
        }

        if ($saved) {
            echo json_encode([
                "success" => true,
                "filename" => $newFilename,
                "url" => "./uploads/" . $newFilename,
                "message" => "File base64 berhasil disimpan ke folder uploads!"
            ]);
            exit;
        }
    }
}

http_response_code(400);
echo json_encode(["success" => false, "message" => "Tidak ada file atau payload base64 yang valid diterima."]);
