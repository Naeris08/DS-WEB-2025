<?php

class Veiculo {
    public $marca;
    public $modelo;
    private $velocidade = 0;

    public function __construct($marca, $modelo) {
        $this->marca = $marca;
        $this->modelo = $modelo;
    }

    public function setVelocidade($valor) {
        if ($valor >= 0) {
            $this->velocidade = $valor;
        }
    }

    public function getVelocidade() {
        return $this->velocidade;
    }
}

class Carro extends Veiculo {
    public function acelerar() {
        $novaVelocidade = $this->getVelocidade() + 10;
        $this->setVelocidade($novaVelocidade);
        return "O carro acelerou para {$this->getVelocidade()} km/h.";
    }
}

class Moto extends Veiculo {
    public function acelerar() {
        $novaVelocidade = $this->getVelocidade() + 20;
        $this->setVelocidade($novaVelocidade);
        return "A moto deu um grau e acelerou para {$this->getVelocidade()} km/h.";
    }
}

$meuCarro = new Carro("Toyota", "Corolla");
$minhaMoto = new Moto("Honda", "CB 300");

echo "========= Teste do Carro =========<br>";
echo "Veículo: {$meuCarro->marca} {$meuCarro->modelo}<br>";
echo $meuCarro->acelerar() . "<br>";
echo $meuCarro->acelerar() . "<br><br>";

echo "========= Teste da Moto =========<br>";
echo "Veículo: {$minhaMoto->marca} {$minhaMoto->modelo}<br>";
echo $minhaMoto->acelerar() . "<br>";
echo $minhaMoto->acelerar() . "<br>";

?>