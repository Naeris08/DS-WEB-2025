var nome = "João";
let idade = Number("16");
alert(nome);
console.log("Você tem "+idade+" anos de idade!");
//var resposta = window.confirm("Deseja continuar?");
//console.log(resposta);
let apagar = confirm("Tem certeza que deseja excluir?");
if (apagar){
    alert("Item apagado!");
}
else{
    alert("Ação cancelada!");
};
var name = prompt("Digite seu nome:");
console.log("Olá, "+name);
var number1 = Number(prompt("Digite o número que quer somar:"));
var number2 = Number(prompt("Digite o segundo número para somar:"));
console.log(number1+number2);