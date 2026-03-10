<?php

class dono {
    public $nome;
    public $telefone;
    public function __construct($novoNome, $novoTelefone) {
        $this->nome = $novoNome;
        $this->telefone = $novoTelefone;
    }
}
class cachorro {
    public String $nome;
    public String $raca;
    public Dono $dono;

    public function __construct($novoNome, $novaRaca, $novoDono) {
        $this->nome = $novoNome;
        $this->raca = $novaRaca;
        $this->dono = $novoDono;
    }
}

$dono = new dono("Joao", "123456789");

$tuco = new cachorro("Tuco", "Vira-lata", $dono);

echo $tuco->nome." | ".$tuco->raca."<br>";
echo "Dono: ".$tuco->dono->nome." | Telefone: ".$tuco->dono->telefone;  


?>
