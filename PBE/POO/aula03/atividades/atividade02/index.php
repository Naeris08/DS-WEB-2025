<?php

class artista {
    public $nome;
    public $genero;

    function __construct($novoNome, $novoGenero) {
        $this->nome = $novoNome;
        $this->genero = $novoGenero;
    }
}

class musica {
    public string $titulo;
    public string $duracao;
    public artista $artista;

    function __construct($novoTitulo, $novoArtista, $novaDuracao) {
        $this->titulo = $novoTitulo;
        $this->artista = $novoArtista;
        $this->duracao = $novaDuracao;
    }

    public function exibirInfo() {
        return $this->titulo." | Duração: ".$this->duracao."<br> Artista: ".$this->artista->nome." | Gênero: ".$this->artista->genero;
    }
}
$mibu = new artista("Michael Bublé", "Jazz/Blues");
$fg = new musica("Feeling Good", $mibu, "3:45");
echo $fg->exibirInfo();

?>