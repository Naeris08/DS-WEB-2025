var divResposta  = document.getElementById("resposta");
var inputCliente = document.getElementById("cliente");

document.addEventListener('DOMContentLoaded', getPedidos);
document.getElementById('botaoEnviar').addEventListener('click', postPedido);

async function getPedidos() {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos")
    var resposta = await requisicao.json()

    console.log(resposta);

    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.cliente}</td>
            <td>R$ ${item.total}</td>
            <td>
                <button onclick="deletePedido(${item.id})">Deletar</button>
                <a href="pedido.html?id=${item.id}">Ver Pedido</a>
            </td>
        </tr>
    `).join("");

    divResposta.innerHTML = `
        <table class="tabela">
            <thead>
                <tr>
                    <th colspan="4"><center>Pedidos Cadastrados</center></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;
}

async function postPedido() {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ cliente: inputCliente.value })
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    inputCliente.value = ""

    getPedidos()
}

async function deletePedido(id) {
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos/" + id, {
        method: "DELETE"
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    getPedidos()
}