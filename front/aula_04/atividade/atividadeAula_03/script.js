// Variável para contar o número de itens adicionados
var newItem = 0;
function addItem() {
 // Criando um novo item e incrementando o contador
    newItem++;

// Criando um novo elemento de lista e preenchendo-o com os dados do formulário
    let item = document.createElement("li");
    let name = document.getElementById("nome");
    let rm = document.getElementById("rm");
    let telefone = document.getElementById("telefone");
    let turma = document.getElementById("turma");
    item.innerText = "Item " + newItem + " - Nome: " + name.value + ", RM: " + rm.value + ", Telefone: " + telefone.value + ", Turma: " + turma.value;    
    // Adicionando o item à lista
    document.getElementById("list").appendChild(item);
// Atribuindo um ID único ao item para facilitar a remoção
    item.setAttribute("id", newItem);
// Criando um botão de remoção para cada item
    let botaoRemover = document.createElement("button");
    botaoRemover.innerText = "Remover";
    botaoRemover.setAttribute("onclick", "removeItem(" + newItem + ")");
    item.appendChild(botaoRemover);
}