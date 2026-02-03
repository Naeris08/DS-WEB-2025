alert("Escreva os próximos dados para descobrir o montante!")
//==========Entrada de dados=========
var c  = Number(prompt("Qual o capital inicial de seu investimento?"));
var i = Number(prompt("Qual a taxa de juros(em percentual)?"));
var t = Number(prompt("Quanto tempo pretende deixar esse capital rendendo(em meses)?"));

//==========Cálculo do montante=========
var m = Number(c*(1+i/100)**t);

//==========Saída de dados=========
console.log("O montante de seu investimento é "+m.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}));