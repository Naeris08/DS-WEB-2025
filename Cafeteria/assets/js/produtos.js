
var divResposta = document.getElementById("resposta");

// os inputs var inputNome   = document.getElementById("nome")

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
            <td><button onclick="deleteProduto(${item.id})">Deletar</button></td>
        </tr>
    `).join("");
    
    console.log(linhas)
    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="3" ><center>Produtos Cadastrados</center></th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
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
    var requisicao = await fetch("http://localhost/cafeteria-api/produtos", {
        method:  "POST",
        body:    JSON.stringify({ nome: inputNome.value })
    })

    var resposta = await requisicao.json()
    console.log(resposta)
    
    //Limpa o campo
    inputNome.value = ""

    getProdutos()
}


async function deleteProduto(id) {
    var requisicao = await fetch("http://localhost/cafeteria-api/produtos/" + id, {
        method: "DELETE"
    })
 
    var resposta = await requisicao.json()
    console.log(resposta)
 
    getProdutos()
}