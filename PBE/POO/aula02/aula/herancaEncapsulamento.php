<?php
class Pessoa {
public $nome = "Rasmus";
protected $idade = 48;
private $senha = "12345";
public function verDados(){
echo $this->nome . "<br/>";
echo $this->idade . "<br/>";
echo $this->senha . "<br/>";
}
}
class Programador extends Pessoa {
public function verDados(){

//Exibe a Classe atual
echo get_class($this) . "<br/>";
echo $this->nome . "<br/>";
echo $this->idade . "<br/>";
echo $this->senha . "<br/>";
}
}
//*instanceando a classe pai
$guilherme = new Pessoa();
$guilherme->verDados();
//echo $objeto->nome . "<br/>";
echo "<hr/>";
//*instanceando a classe filha
$joao = new Programador();
$joao->verDados();

?>