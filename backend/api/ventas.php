<?php
// ventas.php — Endpoint que devuelve los proyectos disponibles en venta desde MySQL

// Cabecera CORS necesaria para que Angular pueda hacer peticiones a este PHP
// desde un origen diferente (distinto puerto o dominio)
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// Incluimos la conexión a la base de datos compartida
require_once __DIR__ . '/../db.php';

// Verificamos que la petición sea GET antes de procesar
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'mensaje' => 'Método no permitido.']);
    exit;
}

try {
    // Consultamos todos los proyectos en venta con sus datos de disponibilidad
    $stmt = $pdo->query('SELECT proyecto, ubicacion, estado, precio FROM ventas ORDER BY id ASC');
    $ventas = $stmt->fetchAll();

    // Enviamos el resultado como JSON al cliente Angular
    echo json_encode($ventas);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'mensaje' => 'Error al obtener los proyectos en venta.']);
}
