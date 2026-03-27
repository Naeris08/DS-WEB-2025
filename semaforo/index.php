<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Semáforo|Arduino</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <h1>Semáforo|Arduino</h1>

    <div class="semaforo">
        <div id="vermelho" class="luz"></div>
        <div id="amarelo" class="luz"></div>
        <div id="verde" class="luz"></div>
    </div>

    <div class="controles">
        <button onclick="iniciarSemaforo(1)" style="background: #b3ff6d; color: rgb(0, 0, 0);">Velocidade 1
            (Lento)</button>
        <button onclick="iniciarSemaforo(2)" style="background: #e5fa5e; color: rgb(0, 0, 0);">Velocidade 2
            (Médio)</button>
        <button onclick="iniciarSemaforo(3)" style="background: #ff5252; color: rgb(0, 0, 0);">Velocidade 3
            (Rápido)</button>
        <br>
        <button onclick="parar()" style="background: #ff0000; color: rgb(0, 0, 0);">Parar</button>
    </div>

    <script src="script.js"></script>
</body>

</html>

<?php

require "arduino.php";

$arduino = new Arduino("COM3");
class semaforo
{
    public function iniciarSemaforo($velocidade)
    {
        global $arduino;
        switch ($velocidade) {
            case 1:
                $arduino->modoLento();
                break;
            case 2:
                $arduino->modoNormal();
                break;
            case 3:
                $arduino->modoRapido();
                break;
        }
    }
    public function parar(){
        global $arduino;
        $arduino->parar();
    }
}

?>