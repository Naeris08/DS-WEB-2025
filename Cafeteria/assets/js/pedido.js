var divResposta   = document.getElementById("resposta");
var nomeCliente   = document.getElementById("nomeCliente");
var selectProduto = document.getElementById("produto_id");
var inputQtd      = document.getElementById("quantidade");

// Pega o id do pedido da URL: pedido.html?id=1
var params    = new URLSearchParams(window.location.search);
var pedido_id = params.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (!pedido_id) {
        nomeCliente.textContent = "Pedido não encontrado.";
        return;
    }
    getPedido();
    carregarProdutos();
    getItens();
});

document.getElementById('botaoAdicionarItem').addEventListener('click', postItem);

async function getPedido() {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos/" + pedido_id)
    var resposta = await requisicao.json()

    console.log(resposta);

    nomeCliente.textContent = resposta.data.cliente;
}

async function carregarProdutos() {
    selectProduto.innerHTML = '<option value="">Selecione um produto</option>';
    try {
        var requisicao = await fetch("http://localhost/cafeteria-api/produtos")
        var resposta = await requisicao.json()

        if (resposta.data && Array.isArray(resposta.data)) {
            resposta.data.forEach(produto => {
                var option = document.createElement('option');
                option.value = produto.id;
                option.textContent = produto.nome + " - R$ " + produto.preco;
                selectProduto.appendChild(option);
            });
        }
    } catch (e) {
        console.error('Erro ao carregar produtos:', e);
    }
}

async function getItens() {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedido_itens?pedido_id=" + pedido_id)
    var resposta = await requisicao.json()

    console.log(resposta);

    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.produto_nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco}</td>
            <td>R$ ${(item.quantidade * item.preco).toFixed(2)}</td>
            <td><button onclick="deleteItem(${item.id})">Deletar</button></td>
        </tr>
    `).join("");

    divResposta.innerHTML = `
        <table class="tabela">
            <thead>
                <tr>
                    <th colspan="6"><center>Itens do Pedido</center></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unit.</th>
                    <th>Subtotal</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;
}

async function postItem() {
    var produto_id = selectProduto.value;
    var quantidade = inputQtd.value;

    if (!produto_id) {
        alert('Selecione um produto.');
        return;
    }
    if (!quantidade || quantidade < 1) {
        alert('Informe uma quantidade válida.');
        return;
    }

    var requisicao = await fetch("http://localhost/cafeteria-api/pedido_itens", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
            pedido_id:  parseInt(pedido_id),
            produto_id: parseInt(produto_id),
            quantidade: parseInt(quantidade)
        })
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    selectProduto.value = "";
    inputQtd.value = "1";

    getItens();
}

async function deleteItem(id) {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedido_itens/" + id, {
        method: "DELETE"
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    getItens();
}