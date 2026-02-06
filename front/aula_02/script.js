//Funções em Javascript
function somarNumeros(num1,num2){
    return num1 + num2;
}

let resultado  = somarNumeros(25,25);
console.log(resultado);

// Trabalhando com data e hora
let dataAtual = new Date();
console.log(dataAtual.toISOString());

let ano = dataAtual.getFullYear();
let mes = dataAtual.getMonth()+1;
let dia  = dataAtual.getDay()+1;
let hora = dataAtual.getHours();
let minuto = dataAtual.getMinutes();
let segundo = dataAtual.getSeconds();

console.log(`${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`);

//=========================================================================================
//Outro exemplo de date

let hoje = new Date();
let diasParaAdicionar = 7;

//cria uma nova data a partir da data atual
let novaData = new Date(hoje);
novaData.setDate(novaData.getDate() + diasParaAdicionar);

console.log(novaData.toLocaleDateString());

//==========Diferença de datas===========
let data1 = new Date('2025-03-19');
let data2 = new Date('2025-03-25');

let diferencaMs = data2 - data1;
console.log(diferencaMs);


//============Manipulando o DOM============
document.getElementById("conteudo").innerHTML = "<p>Olá, mundo!</p>";

var valor = document.getElementById("conteudo").innerHTML;
console.log(valor);