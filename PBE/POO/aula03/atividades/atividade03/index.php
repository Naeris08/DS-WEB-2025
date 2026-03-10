<?php

class fabricante{
    public string $nome;
    public string $paisOrigem;
    public function __construct($nome, $paisOrigem){
        $this->nome = $nome;
        $this->paisOrigem = $paisOrigem;
    }
}
class motor{
    public string $potencia;
    public string $combustivel;
    public function __construct($potencia, $combustivel){
        $this->potencia = $potencia;
        $this->combustivel = $combustivel;
    }
}
class carro{
    public string $modelo;
    public string $ano;
    public fabricante $fabricante;
    public motor $motor;
    public function __construct($modelo,  $ano, fabricante $fabricante, motor $motor){
        $this->modelo = $modelo;
        $this->ano = $ano;
        $this->fabricante = $fabricante;
        $this->motor = $motor;
    }
}
$mustang = new carro("Mustang Boss 302", "1969", new fabricante("Ford", "EUA"), new motor("450cv", "Gasolina"));
echo $mustang->modelo." | ".$mustang->ano."<br> Fabricante: ".$mustang->fabricante->nome." | ".$mustang->fabricante->paisOrigem."<br> Motor: ".$mustang->motor->potencia." | ".$mustang->motor->combustivel;

?>