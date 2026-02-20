//* Criando o contador de Itens
var item = 0

function add(){
    //* Incrementando o contador de Itens
    item ++

    //* Crio o Item
    let novoItem = document.createElement("li");
    let nome = document.getElementById("nome").value
    let email = document.getElementById("email").value
    let RM = document.getElementById("RM").value
    let telefone = document.getElementById("telefone").value
    let turma = document.getElementById("turma").value

    //* Adiciono texto ao meu Item
    novoItem.innerHTML = 
    item + " - <br>" +
    "Nome: " + nome + "<br>" +
    "Email: " + email + "<br>" +
    "RM: " + RM + "<br>" +
    "Telefone: " + telefone + "<br>" +
    "Turma: " + turma + "<br>";


    //* Atribuo um ID
    novoItem.setAttribute("id", item);

    //* Cria o botão de remover
    let botaoRemover = document.createElement("button")

    //* Adiciona texto ao botão
    botaoRemover.textContent = "Remover"

    //* Adiciona uma função ao botão
    botaoRemover.setAttribute("onclick",`remover(${item})`)

    //* Adiciona o Botão ao novo item
    novoItem.appendChild(botaoRemover);
    document.getElementById("lista").appendChild(novoItem);
}


function remover(itemLista){
    var item1 = document.getElementById(itemLista);
    document.getElementById("lista").removeChild(item1);
}