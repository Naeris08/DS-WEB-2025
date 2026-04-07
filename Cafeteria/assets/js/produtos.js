
var divResposta = document.getElementById("resposta");

// os inputs
var inputNome = document.getElementById("nome");
var inputPreco = document.getElementById("preco");
var inputCategoriaId = document.getElementById("categoria_id");

document.addEventListener('DOMContentLoaded', getProdutos);
document.getElementById('botaoEnviar').addEventListener('click', postProduto);

async function getProdutos() {
    var requisicao = await fetch("http://localhost/cafeteria-api/produtos")
    var resposta = await requisicao.json()

    console.log(resposta);

    // Gera as linhas automaticamente para todos os itens do array
    const linhas = resposta.data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.nome}</td>
            <td>${item.preco ?? ''}</td>
            <td>${item.categoria_id ?? ''}</td>
            <td><button onclick="deleteProduto(${item.id})">Deletar</button></td>
        </tr>
    `).join("");
    
    console.log(linhas)
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="5">Produtos Cadastrados</th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Categoria ID</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;
}

async function postProduto() {
    // Cria payload com validações básicas
    const payload = {
        nome: (inputNome.value || '').trim(),
        preco: inputPreco.value ? parseFloat(inputPreco.value) : null,
        categoria_id: inputCategoriaId.value ? parseInt(inputCategoriaId.value) : null
    };

    if (!payload.nome) {
        alert('Informe o nome do produto.');
        return;
    }
    if (payload.preco === null || isNaN(payload.preco)) {
        alert('Informe o preço do produto.');
        return;
    }
    if (payload.categoria_id === null || isNaN(payload.categoria_id)) {
        alert('Informe o ID da categoria.');
        return;
    }

    var requisicao = await fetch("http://localhost/cafeteria-api/produtos", {
        method:  "POST",
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload)
    });

    var resposta = await requisicao.json();
    console.log(resposta);

    //Limpa os campos
    inputNome.value = "";
    inputPreco.value = "";
    inputCategoriaId.value = "";

    getProdutos();
}


async function deleteProduto(id) {
    var requisicao = await fetch("http://localhost/cafeteria-api/produtos/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getProdutos()
}