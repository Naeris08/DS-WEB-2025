//===================Eventoos do mouse===================
var area = document.getElementById("area");
var mensagem = document.getElementById("mensagem");
var coordenadas = document.getElementById("posicao");


area.addEventListener("click", function () {
    mensagem.textContent = "Clique simples detectado";
});

area.addEventListener("dblclick", function () {
    if (area.style.background == "lightgreen") {
        area.style.background = "lightblue";
    }
    else {
        area.style.background = "lightgreen";
    }

});

area.addEventListener("mouseenter", function () {
    mensagem.textContent = "O mouse entrou na área!";
});

area.addEventListener("mouseleave", function () {
    mensagem.textContent = "O mouse saiu da área!";
});

area.addEventListener("mousemove", function (event) {
    coordenadas.textContent = "X:" + event.clientX + " Y:"
        + event.clientY;
});

area.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    alert("Botão direito clicado!");
});
//===================Evento de teclado===================
document.addEventListener("keydown", function (event) {
    console.log("Tecla pressionada: " + event.key);
});

document.addEventListener("keyup", function (event) {
    console.log("Tecla liberada: " + event.key);
});

document.addEventListener("keypress", function (event) {
    console.log("Caractere digitado: " + event.key);
});

document.addEventListener("keydown", function (event) {
    // Exibe a tecla pressionada
    var campo = document.getElementById("resultado");
    campo.textContent = "Tecla pressionada: " + event.key;
    // Também mostra no console
    console.log("Tecla pressionada: " + event.key);
});
//===================Evento de formulário===================

//===================Evento da jabela===================