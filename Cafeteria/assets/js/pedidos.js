var divResposta = document.getElementById("resposta");
var inputCliente = document.getElementById("cliente"); // Captura do input de cliente

document.addEventListener('DOMContentLoaded', getPedidos);
document.getElementById('botaoEnviar').addEventListener('click', postPedido);

async function getPedidos() {
    // Adicionado .php na URL para garantir a comunicação no XAMPP
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos.php")
    var resposta = await requisicao.json()

    console.log(resposta);

    // Gera as linhas automaticamente para todos os itens do array
    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.cliente}</td>
            <td>R$ ${item.total}</td>
            <td>
                <button onclick="deletePedido(${item.id})">Deletar</button>
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
    // Envio do JSON com a chave "cliente" que o PHP espera
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos.php", {
        method:  "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ cliente: inputCliente.value })
    })

    var resposta = await requisicao.json()
    console.log(resposta)
    
    //Limpa o campo
    inputCliente.value = ""

    getPedidos()
}

async function deletePedido(id) {
    // Adicionado .php na URL
    var requisicao = await fetch("http://localhost/cafeteria-api/pedidos.php/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getPedidos()
}