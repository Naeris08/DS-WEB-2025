<?php

require_once 'database.php';
$database = new Database();

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = trim($path, '/');
$segments = explode('/', $path);

if (isset($segments[2])) {
    $id = $segments[2];
} else {
    $id = null;
}

switch ($method) {
    // -------------------------------------------------------
    // GET /categorias 
    // GET /categorias/1
    // -------------------------------------------------------
    case 'GET':
        $database->executeQuery(
            "SELECT categorias (nome) FROM categorias WHERE id = :id",
            [':id' => $id]
        );
        break;
    // -------------------------------------------------------
    // POST /categorias
    // Body: { "nome": "Bebidas" }
    // -------------------------------------------------------
    case 'POST':
        $body = json_decode(file_get_contents('php://input'), true);
        $nome = trim($body['nome']);

        if (!$nome) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Campo nome não informado.'
            ]);
        }
        $database->executeQuery(
            "INSERT INTO categorias (nome) VALUES (:nome)",
            [':nome' => $nome]
        );
        echo json_encode([
            'status' => 'success',
            'message' => 'Categoria criada com sucesso.',
            'idCategoria' => $database->lastInsertId()
        ]);
        break;
    // -------------------------------------------------------
    // PUT /categorias/1
    // Body: { "nome": "Salgados" }
    // -------------------------------------------------------
    case 'PUT':

        break;
    // -------------------------------------------------------
    // DELETE /categorias/1
    // -------------------------------------------------------
    case 'DELETE':

        break;
    // -------------------------------------------------------
    // Método não permitido
    // -------------------------------------------------------
    default:
        http_response_code(405);
        echo json_encode([
            'status' => 'error',
            'message' => 'Método não permitido.'
        ]);
}


?>