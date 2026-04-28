<?php
// crear-proyecto.php — Endpoint que recibe un nuevo proyecto desde Angular y lo inserta en MySQL

// Cabeceras CORS para permitir peticiones desde Angular (localhost:4200)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responde al preflight del navegador (verificación CORS antes del POST real)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Solo aceptamos peticiones POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

// Leemos el JSON enviado por Angular desde el body de la petición
$body = file_get_contents('php://input');

// Convertimos el JSON a array asociativo PHP
$datos = json_decode($body, true);

// Validamos que los tres campos llegaron y no están vacíos
if (
    !isset($datos['num'], $datos['nombre'], $datos['descripcion']) ||
    trim($datos['num']) === '' ||
    trim($datos['nombre']) === '' ||
    trim($datos['descripcion']) === ''
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'mensaje' => 'Todos los campos son obligatorios.']);
    exit;
}

// Incluimos la conexión a la base de datos
require_once __DIR__ . '/../db.php';

try {
    // Prepared statement para insertar el nuevo proyecto de forma segura
    // Los ? evitan inyección SQL al separar la consulta de los datos
    $stmt = $pdo->prepare(
        'INSERT INTO proyectos (num, nombre, descripcion) VALUES (?, ?, ?)'
    );

    $stmt->execute([
        trim($datos['num']),
        trim($datos['nombre']),
        trim($datos['descripcion']),
    ]);

    if ($stmt->rowCount() > 0) {
        // El INSERT fue exitoso: devolvemos confirmación a Angular
        echo json_encode(['success' => true, 'mensaje' => 'Proyecto creado correctamente.']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'mensaje' => 'No se pudo guardar el proyecto.']);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mensaje' => 'Error al guardar en la base de datos.']);
}
