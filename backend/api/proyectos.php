<?php
// proyectos.php — Endpoint que devuelve los proyectos de la constructora desde MySQL

// Cabeceras CORS: permiten que Angular (corriendo en localhost:4200) pueda consumir
// este endpoint PHP (corriendo en localhost:80) sin que el navegador bloquee la petición
header('Access-Control-Allow-Origin: *');

// Indicamos al cliente que la respuesta siempre será JSON
header('Content-Type: application/json');

// Incluimos el archivo de conexión a la base de datos
// __DIR__ asegura que la ruta sea relativa a este archivo, no al directorio actual
require_once __DIR__ . '/../db.php';

// Solo respondemos a peticiones GET (lectura de datos)
// $_SERVER['REQUEST_METHOD'] contiene el método HTTP de la petición entrante
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // 405 = Method Not Allowed
    echo json_encode(['success' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

try {
    // Preparamos la consulta SQL para obtener todos los proyectos
    // query() se usa cuando no hay parámetros externos (no hay riesgo de inyección SQL)
    $stmt = $pdo->query('SELECT num, nombre, descripcion FROM proyectos ORDER BY num ASC');

    // fetchAll() obtiene todos los resultados como un array de arrays asociativos
    $proyectos = $stmt->fetchAll();

    // json_encode() convierte el array PHP a formato JSON que Angular puede leer
    echo json_encode($proyectos);

} catch (PDOException $e) {
    // Si la consulta SQL falla, devolvemos error 500 con un mensaje descriptivo
    http_response_code(500);
    echo json_encode(['success' => false, 'mensaje' => 'Error al obtener los proyectos.']);
}
