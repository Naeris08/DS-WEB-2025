<?php

class Arduino {
    private $porta;
//~ Declarando o construtor para inicializar a porta de comunicação com o Arduino
    public function __construct($porta) {
        $this->porta = $porta;
    }
//! Método para enviar comandos para o Arduino
    public function enviarComando($comando) {
        $cmd = "echo " . $comando . " > " . $this->porta;
        exec($cmd);
    }
//* P - Parar o semáforo
    public function parar() {
        $this->enviarComando("P");
    }
//* L,N,R - Modo de piscar o LED: lento, normal ou rápido
    public function modoLento(){
        $this->enviarComando("L");
    }
    public function modoNormal(){
        $this->enviarComando("N");
    }
    public function modoRapido(){
        $this->enviarComando("R");
}
}


?>