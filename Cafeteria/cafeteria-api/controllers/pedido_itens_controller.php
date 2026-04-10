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
    // GET /pedido_itens?pedido_id=1
    // Retorna todos os itens de um pedido com o nome do produto
    // -------------------------------------------------------
    case 'GET':
        $pedido_id = $_GET['pedido_id'] ?? null;

        if (!$pedido_id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o pedido_id como query string.'
            ]);
            break;
        }

        $resultado = $database->executeQuery(
            'SELECT pi.id, pi.pedido_id, pi.produto_id, p.nome as produto_nome, pi.quantidade, pi.preco
             FROM pedido_itens pi
             INNER JOIN produtos p ON p.id = pi.produto_id
             WHERE pi.pedido_id = :pedido_id',
            [':pedido_id' => $pedido_id]
        );
        $itens = $resultado->fetchAll();

        echo json_encode([
            'status' => 'success',
            'data'   => $itens
        ]);
        break;
    // -------------------------------------------------------
    // POST /pedido_itens
    // Body: { "pedido_id": 1, "produto_id": 2, "quantidade": 3 }
    // -------------------------------------------------------
    case 'POST':
        $body        = json_decode(file_get_contents('php://input'), true);
        $pedido_id   = $body['pedido_id']  ?? null;
        $produto_id  = $body['produto_id'] ?? null;
        $quantidade  = $body['quantidade'] ?? null;

        if (!$pedido_id || !$produto_id || !$quantidade) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Campos pedido_id, produto_id e quantidade são obrigatórios.'
            ]);
            break;
        }

        // Busca o preço atual do produto
        $stmt   = $database->executeQuery(
            'SELECT preco FROM produtos WHERE id = :id',
            [':id' => $produto_id]
        );
        $produto = $stmt->fetch();

        if (!$produto) {
            http_response_code(404);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Produto não encontrado.'
            ]);
            break;
        }

        $preco = $produto['preco'];

        $database->executeQuery(
            "INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco) VALUES (:pedido_id, :produto_id, :quantidade, :preco)",
            [
                ':pedido_id'  => $pedido_id,
                ':produto_id' => $produto_id,
                ':quantidade' => $quantidade,
                ':preco'      => $preco
            ]
        );

        // Atualiza o total do pedido automaticamente
        $stmtTotal = $database->executeQuery(
            'SELECT SUM(quantidade * preco) as total FROM pedido_itens WHERE pedido_id = :pedido_id',
            [':pedido_id' => $pedido_id]
        );
        $resultado = $stmtTotal->fetch();
        $total = $resultado['total'] ?? 0.00;

        $database->executeQuery(
            'UPDATE pedidos SET total = :total WHERE id = :id',
            [':total' => $total, ':id' => $pedido_id]
        );

        http_response_code(201);
        echo json_encode([
            'status'  => 'success',
            'message' => 'Item adicionado ao pedido.',
            'idItem'  => $database->lastInsertId(),
            'total'   => number_format((float)$total, 2, '.', '')
        ]);
        break;
    // -------------------------------------------------------
    // DELETE /pedido_itens/1
    // -------------------------------------------------------
    case 'DELETE':
        if (!$id) {
            http_response_code(400);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Informe o id do item na URL.'
            ]);
            break;
        }

        // Busca o pedido_id antes de deletar para recalcular o total
        $stmtItem = $database->executeQuery(
            'SELECT pedido_id FROM pedido_itens WHERE id = :id',
            [':id' => $id]
        );
        $item = $stmtItem->fetch();

        if (!$item) {
            http_response_code(404);
            echo json_encode([
                'status'  => 'error',
                'message' => 'Item não encontrado.'
            ]);
            break;
        }

        $pedido_id = $item['pedido_id'];

        $database->executeQuery(
            'DELETE FROM pedido_itens WHERE id = :id',
            [':id' => $id]
        );

        // Recalcula o total do pedido após remover o item
        $stmtTotal = $database->executeQuery(
            'SELECT SUM(quantidade * preco) as total FROM pedido_itens WHERE pedido_id = :pedido_id',
            [':pedido_id' => $pedido_id]
        );
        $resultado = $stmtTotal->fetch();
        $total = $resultado['total'] ?? 0.00;

        $database->executeQuery(
            'UPDATE pedidos SET total = :total WHERE id = :id',
            [':total' => $total, ':id' => $pedido_id]
        );

        echo json_encode([
            'status'  => 'success',
            'message' => 'Item removido do pedido.',
            'total'   => number_format((float)$total, 2, '.', '')
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
