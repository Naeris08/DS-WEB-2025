<?php

class Pessoa {
    private $nome;
    private $idade;

    public function __construct($novoNome, $novoIdade) {
        $this->nome = $novoNome;
        $this->idade = $novoIdade;
    }

    public function exibirDados() {
        return "O nome é: " . $this->nome . " e a idade é: " . $this->idade;
    }
    public function alterarDados($novoNome, $novoIdade) {
        $this->nome = $novoNome;
        $this->idade = $novoIdade;
    }
}
$carol = new Pessoa("Carol", 17);
echo $carol->exibirDados();

$brunao = new Pessoa("Brunão",28);
echo $brunao->exibirDados();

?>