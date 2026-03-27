var divResposta = document.getElementById('resposta');
var botaoHello = document.getElementById('botaoHello');

botaoHello.addEventListener('click', requisicaoHello);
async function requisicaoHello() {
    var requisicao = await fetch('http://localhost/primeiraAPI/hello');
    var resposta = await requisicao.json();
    console.log(resposta);

    divResposta.innerHTML = "Status: " + resposta.status + '<br>' + "Mensagem: " + resposta.message;
}
var botaoEcho = document.getElementById('botaoEcho');
botaoEcho.addEventListener('click', requisicaoEcho);
async function requisicaoEcho() {
    var inputEcho = document.getElementById('inputEcho').value;
    var requisicao = await fetch('http://localhost/primeiraAPI/echo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputEcho })
    });
    var resposta = await requisicao.json();
    console.log(resposta.echo.message);

    divResposta.innerHTML = "Status: " + resposta.status + '<br>' + "Mensagem: " + resposta.echo.message;
}