<?php

abstract class Produto {
    public $nome;
    public $preco;
    public $estoque;

    public function setInformacao($nome, $preco, $estoque) {
        $this->nome = $nome;
        $this->preco = $preco;
        $this->estoque = $estoque;
    }

    abstract public function calcularDesconto();

    public function exibirPrecoFinal(): string {
        $descontoBase = $this->calcularDesconto();
        $precoComDesconto = $this->preco - $descontoBase;

        if ($this->estoque < 5) {
            $precoComDesconto -= ($precoComDesconto * 0.10);
            $msgEstoque = " (Incluindo 10% extra por baixo estoque!)";
        } else {
            $msgEstoque = "";
        }

        return "Produto: {$this->nome} | Estoque: {$this->estoque} | Preço Final: R$ " . number_format($precoComDesconto, 2, ',', '.') . $msgEstoque;
    }
}

class Eletronico extends Produto {

    public function calcularDesconto() {
        return $this->preco * 0.10;
    }
}

class Roupa extends Produto {
    public function calcularDesconto() {
        return $this->preco * 0.20;
    }
}

$celular = new Eletronico;
$celular->nome = 'Smartphone';
$celular->preco = "2000";
$celular->estoque = 3;
$celular->desconto = $celular->calcularDesconto();
$camiseta = new Roupa;
$camiseta->setInformacao("Camiseta Algodão", 100.00, 10);
$camiseta->calcularDesconto();
echo "========= LOJA VIRTUAL =========<br>";
echo $celular->exibirPrecoFinal() . "<br>";
echo $camiseta->exibirPrecoFinal() . "<br>";

?>