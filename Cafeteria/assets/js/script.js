

/*
var divResposta = document.getElementById("resposta")


var botaoHello = document.getElementById("botaoHello");

botaoHello.addEventListener("click", endpointHello)

async function endpointHello() {
    var requisicao = await fetch("http://localhost/primeira-api/hello")
    var resposta = await requisicao.json()

    console.log(resposta)
    divResposta.innerHTML = resposta.status + "<br>" + resposta.message
    
}


var botaoEcho = document.getElementById("botaoEcho");

botaoEcho.addEventListener("click", endpointEcho)

async function endpointEcho() {
    var echo = document.getElementById("bodyEcho").value
    
    var requisicao = await fetch("http://localhost/primeira-api/echo",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message : echo})
    })
    var resposta = await requisicao.json()
    
    console.log(resposta)
    divResposta.innerHTML = resposta.status + "<br>" + resposta.echo
}

*/