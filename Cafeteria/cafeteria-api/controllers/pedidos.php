<?php

require_once 'database.php';
$database = new Database();

$method   = $_SERVER['REQUEST_METHOD'];
$path     = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path     = trim($path, '/');
$segments = explode('/', $path);

if (isset($segments[2])) {
    $id = $segments[2];
} else {
    $id = null;
}

switch($method){
    // -------------------------------------------------------
    // GET /pedidos
    // GET /pedidos/1
    // -------------------------------------------------------
    case 'GET':
        if ($id) {
            $resultado = $database->executeQuery(
                'SELECT * FROM pedidos WHERE id = :id',
                [':id' => $id]
            );
            $pedido = $resultado->fetch();

            if (!$pedido) {
                http_response_code(404);
                echo json_encode([
                    'status'  => 'error',
                    'message' => 'Pedido não encontrado.'
                ]);
                break;
            }

            echo json_encode([
                'status' => 'success',
                'data'   => $pedido
            ]);
            break;
        }

        $resultado = $database->executeQuery('SELECT * FROM pedidos ORDER BY criado_em DESC');
        $pedidos = $resultado->fetchAll();

        echo json_encode([
            'status' => 'success',
            'data'   => $pedidos
        ]);
        break;
    // -------------------------------------------------------
    // POST /pedidos
    // Body: { "cliente": "Nome do Cliente" }
    // -------------------------------------------------------
    case 'POST':
        $body    = json_decode(file_get_contents('php://input'), true);
        $cliente = trim($body['cliente']);

        if(!$cliente){
            echo json_encode([
                'status'  => 'error',
                'message' => 'Campo cliente não informado'
            ]);
            break;
        }

        $database->executeQuery(
            "INSERT INTO pedidos (cliente) VALUES (:cliente)",
            [ ':cliente' => $cliente ]
        );

        http_response_code(201);
        echo json_encode([
            'status'   => 'success',
            'message'  => 'Pedido cadastrado com sucesso',
            'idPedido' => $database->lastInsertId()
        ]);
        break;
    // -------------------------------------------------------
    // PUT /pedidos/1
    // Recalcula e atualiza o total do pedido com base nos itens
    // -------------------------------------------------------
    case 'PUT':
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o id do pedido na URL.'
            ]);
            break;
        }

        $stmt = $database->executeQuery(
            'SELECT SUM(quantidade * preco) as total FROM pedido_itens WHERE pedido_id = :pedido_id',
            [':pedido_id' => $id]
        );
        $resultado = $stmt->fetch();
        $total = $resultado['total'] ?? 0.00;

        $database->executeQuery(
            'UPDATE pedidos SET total = :total WHERE id = :id',
            [':total' => $total, ':id' => $id]
        );

        echo json_encode([
            'status'  => 'success',
            'message' => 'Total do pedido atualizado.',
            'total'   => number_format((float)$total, 2, '.', '')
        ]);
        break;
    // -------------------------------------------------------
    // DELETE /pedidos/1
    // -------------------------------------------------------
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o id do pedido na URL.'
            ]);
            break;
        }

        $stmt = $database->executeQuery(
            'DELETE FROM pedidos WHERE id = :id',
            [':id' => $id]
        );

        if ($stmt->rowCount() === 0) {
            http_response_code(404);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Pedido não encontrado.'
            ]);
            break;
        }

        echo json_encode([
            'status'  => 'success',
            'message' => 'Pedido removido com sucesso.'
        ]);
        break;
    // -------------------------------------------------------
    // Método não permitido
    // -------------------------------------------------------
    default:
        http_response_code(405);
        echo json_encode([
            'status'  => 'error',
            'message' => 'Método não permitido.'
        ]);
}