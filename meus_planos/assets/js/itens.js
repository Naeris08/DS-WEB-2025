var divResposta = document.getElementById("resposta");
const iteURL = 'http://localhost/meus-planos-api/itens';
const catURL = 'http://localhost/meus-planos-api/categorias';
// os inputs
var inputNome = document.getElementById("nome");
//~ var statusITE = document.getElementById("status");
var inputCategoriaId = document.getElementById("categoria_id");

document.addEventListener('DOMContentLoaded', () => {
    getProdutos();
    carregarCategorias();
});
document.getElementById('botaoEnviar').addEventListener('click', postProduto);

async function getProdutos() {
    var requisicao = await fetch(iteURL);
    var resposta = await requisicao.json()

    console.log(resposta);

    // Gera as linhas automaticamente para todos os itens do array
    const linhas = resposta.data.map(item => `
        <tr>
            <td><input type="checkbox" status-id="${item.id}" ${item.feito ? 'checked' : ''}></td>
            <td>${item.feito ? `<s>${item.nome}</s>` : item.nome}</td>
            <td>${item.categoria_nome ?? item.categoria_id ?? ''}</td>
            <td><button onclick="deleteProduto(${item.id})">Deletar</button></td>
        </tr>
    `).join("");

    divResposta.innerHTML = `
        <table class="sua-classe">
            <thead>
                <tr>
                    <th colspan="4">Itens Cadastrados</th>
                </tr>
                <tr>
                    <th>Status</th>
                    <th>Nome do Item</th>
                    <th>Categoria</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${linhas}
            </tbody>
        </table>
    `;

    //* Adiciona evento para atualizar status ao marcar/desmarcar
    document.querySelectorAll('input[type="checkbox"][status-id]').forEach(status => {
        status.addEventListener('change',
            async function () {
                const id = this.getAttribute('status-id');
                const novoStatus = this.checked;
                //! Desabilita o checkbox enquanto aguarda resposta
                this.disabled = true;
                try {
                    const resposta = await fetch(`${iteURL}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ feito: novoStatus ? 1 : 0 })
                    });
                    if (resposta.ok) {
                        getProdutos(); //! Só atualiza após sucesso
                    } else {
                        alert('Erro ao atualizar status!');
                        this.checked = !novoStatus;
                    }
                } catch (e) {
                    alert('Erro ao atualizar status!');
                    this.checked = !novoStatus;
                }
                finally {
                    this.disabled = false;
                }
            });
    });
}

async function postProduto() {
    //* Cria payload com validações básicas
    const payload = {
        nome: (inputNome.value || '').trim(),
        categoria_id: inputCategoriaId.value ? parseInt(inputCategoriaId.value) : null
    };

    if (!payload.nome) {
        alert('Informe o nome do produto.');
        return;
    }
    if (!payload.categoria_id || isNaN(payload.categoria_id)) {
        alert('Selecione uma categoria.');
        return;
    }

    var requisicao = await fetch(iteURL, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    var resposta = await requisicao.json();
    console.log(resposta);

    //Limpa os campos
    inputNome.value = "";
    inputCategoriaId.value = "";

    getProdutos();
}


async function deleteProduto(id) {
    var requisicao = await fetch(iteURL + "/" + id, {
        method: "DELETE"
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    getProdutos()
}

// Função para carregar categorias no select
async function carregarCategorias() {
    const selectCategoria = document.getElementById('categoria_id');
    // Limpa opções antigas, mantendo o primeiro
    selectCategoria.innerHTML = '<option value="">Selecione uma categoria</option>';
    try {
        const requisicao = await fetch(catURL);
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

async function deleteCategoria(id) {
    var requisicao = await fetch(catURL + "/" + id, {
        method: "DELETE"
    })

    var resposta = await requisicao.json()
    console.log(resposta)

    getCategorias()
}