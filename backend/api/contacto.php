<?php
// contacto.php — Endpoint que recibe el formulario de contacto desde Angular y lo guarda en MySQL

// Cabecera CORS: permite peticiones desde el origen de Angular
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Cabecera para peticiones OPTIONS (preflight): el navegador las envía automáticamente
// antes de un POST cross-origin para verificar que el servidor lo permite
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Si es una petición OPTIONS (preflight), respondemos OK y salimos
// El navegador enviará el POST real después de esto
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo procesamos peticiones POST (envío de datos)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

// Leemos el cuerpo de la petición HTTP
// Angular envía los datos como JSON en el body, no como form data tradicional
// php://input es el stream que contiene el body crudo de la petición
$body = file_get_contents('php://input');

// json_decode() convierte el JSON recibido a un objeto PHP
// true como segundo parámetro lo convierte a array asociativo
$datos = json_decode($body, true);

// Validación de campos: verificamos que los tres campos llegaron y no están vacíos
// isset() comprueba que la clave existe; trim() elimina espacios en blanco
if (
    !isset($datos['nombre'], $datos['email'], $datos['mensaje']) ||
    trim($datos['nombre']) === '' ||
    trim($datos['email']) === '' ||
    trim($datos['mensaje']) === ''
) {
    http_response_code(400); // 400 = Bad Request (datos incompletos)
    echo json_encode(['success' => false, 'mensaje' => 'Todos los campos son obligatorios.']);
    exit;
}

// Validación del formato del email usando filter_var con el filtro FILTER_VALIDATE_EMAIL
// Esta función de PHP verifica que el email tenga un formato válido (usuario@dominio.ext)
if (!filter_var($datos['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mensaje' => 'El email no tiene un formato válido.']);
    exit;
}

// Incluimos la conexión a la base de datos
require_once __DIR__ . '/../db.php';

try {
    // Usamos una consulta preparada (prepared statement) para insertar los datos
    // Los ? son parámetros que PDO reemplaza de forma segura, evitando inyección SQL
    // Si usáramos concatenación de strings directamente, un atacante podría inyectar SQL
    $stmt = $pdo->prepare(
        'INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)'
    );

    // execute() reemplaza los ? con los valores reales de forma segura
    // trim() elimina espacios extra al inicio y final de cada campo
    $stmt->execute([
        trim($datos['nombre']),
        trim($datos['email']),
        trim($datos['mensaje']),
    ]);

    // rowCount() devuelve cuántas filas fueron afectadas por la última operación
    if ($stmt->rowCount() > 0) {
        // El mensaje se guardó correctamente en la base de datos
        echo json_encode(['success' => true, 'mensaje' => '¡Mensaje recibido! Pronto nos pondremos en contacto.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'mensaje' => 'No se pudo guardar el mensaje.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mensaje' => 'Error al guardar el mensaje en la base de datos.']);
}
