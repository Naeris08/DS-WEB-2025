
var divResposta = document.getElementById("resposta");
const apiUrl = 'http://localhost/cafeteria-api/pedidos';
// os inputs
var inputNome = document.getElementById("nome");
//~var inputPreco = document.getElementById("preco");
//~var inputCategoriaId = document.getElementById("categoria_id");

document.addEventListener('DOMContentLoaded', () => {
    getPedidos();
    //carregarCategorias(); // Descomente se for usar categorias
});
document.getElementById('botaoEnviar').addEventListener('click', postPedido);

async function getPedidos() {
    var requisicao = await fetch(apiUrl)
    var resposta = await requisicao.json()

    console.log(resposta);

    // Gera as linhas automaticamente para todos os itens do array
    const linhas = resposta.data.map(cliente => `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.cliente}</td>
            <td>${cliente.total ?? ''}</td>
            <td>${cliente.criado_em ?? ''}</td>
            <td>
                <button onclick="deleteProduto(${cliente.id})">Deletar</button>
                <a href="editar-pedido.html?id=${cliente.id}"><button>Editar</button></a>
            </td>
        </tr>
    `).join("");
    
    console.log(linhas)
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="5">Pedidos Cadastrados</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Horário</th>
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
    // Cria payload com validações básicas

    const payload = {
        nome: (inputNome.value || '').trim()
    };

    if (!payload.nome) {
        alert('Informe o nome do cliente.');
        return;
    }
    var requisicao = await fetch(apiUrl, {
        method:  "POST",
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
    });

    var resposta = await requisicao.json();
    console.log(resposta);

    //Limpa os campos

    inputNome.value = "";

    getPedidos();
}


async function deleteProduto(id) {
    var requisicao = await fetch(apiUrl + "/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getPedidos()
}

// Função para carregar categorias no select
/*
async function carregarCategorias() {
    const selectCategoria = document.getElementById('categoria_id');
    //! Limpa opções antigas, mantendo o primeiro
    selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
    try {
        const requisicao = await fetch('http://localhost/cafeteria-api/categorias');
        const resposta = await requisicao.json();
        if (resposta.data && Array.isArray(resposta.data)) {
            resposta.data.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.nome;
                selectCategoria.appendChild(option);
            });
        }
    } catch (e) {
        console.error('Erro ao carregar categorias:', e);
    }
}
*/