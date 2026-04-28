<?php
// db.php — Conexión a la base de datos MySQL usando PDO
// PDO (PHP Data Objects) es la forma recomendada de conectar a bases de datos en PHP
// porque protege contra inyección SQL y soporta múltiples motores de base de datos

// Datos de conexión — ajustar según el entorno (XAMPP, servidor, etc.)
$host     = 'localhost';
$dbname   = 'constructora_db';   // Nombre de la base de datos
$usuario  = 'root';              // Usuario de MySQL (en XAMPP suele ser 'root')
$password = '';                  // Contraseña (en XAMPP local suele estar vacía)

try {
    // Creamos la conexión PDO con el driver de MySQL
    // El DSN (Data Source Name) especifica el driver, host, nombre de BD y charset
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8",
        $usuario,
        $password
    );

    // PDO::ERRMODE_EXCEPTION hace que los errores de SQL lancen excepciones
    // esto permite capturarlos con try/catch en lugar de fallar silenciosamente
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // PDO::FETCH_ASSOC devuelve los resultados como arrays asociativos (clave => valor)
    // en lugar de arrays numéricos, lo que hace el código más legible
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Si la conexión falla, devolvemos un JSON de error con código HTTP 500
    // y detenemos la ejecución con die()
    http_response_code(500);
    die(json_encode(['success' => false, 'mensaje' => 'Error de conexión a la base de datos.']));
}
