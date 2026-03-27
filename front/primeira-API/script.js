var divResposta = document.getElementById('.resposta');
var botaoHello = document.getElementById('.botaoHello');7

botaoHello.addEventListener('click', requisicaoHello);
async function requisicaoHello(){
    var requisicao = await fetch('http://localhost/primeira-API/hello');
    var resposta = await requisicao.json();
    console.log(resposta);
}