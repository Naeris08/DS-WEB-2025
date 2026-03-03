<?php
class Pessoa
{
    public $nome;
    protected $idade;
}
class funcionario extends Pessoa
{
    public $salario;

    public function calcularBonus($salario){
    }
}
class Gerente extends funcionario
{

    public function calcularBonus($salario){
        return $this->salario * 0.20;
    }
}
class desenvolvedor extends funcionario
{

    public function calcularBonus($salario){
        return $this->salario * 0.10;
    }
}

$fafas = new Gerente;
$fafas->nome = "Fafas";
$fafas->salario = 10000;
echo "O bônus do gerente foi de R$ " . $fafas->calcularBonus($fafas->salario);

echo"<br>";

$bruno = new desenvolvedor;
$bruno->nome = "Bruno";
$bruno->salario = 5000;
echo $bruno->calcularBonus($bruno->salario);
?>