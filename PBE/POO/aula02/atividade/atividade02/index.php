<?php

abstract class Animal
{
    abstract public function fazerSom();

    public function mover()
    {
        return "anda.";
    }
}

class Sapo extends Animal
{
    public function fazerSom()
    {
        return "Coachar";
    }
}

class Tartaruga extends Animal
{
    public function fazerSom()
    {
        return "Som de tartaruga (silencioso)";
    }
}

class Cavalo extends Animal
{
    public function fazerSom()
    {
        return "Relinchar";
    }

    public function mover()
    {
        return parent::mover() . " E também: Galopa e anda";
    }
}

$animais = [
    new Sapo(),
    new Cavalo(),
    new Tartaruga()
];

foreach ($animais as $animal) {
    echo "Animal: " . get_class($animal) . "<br>";
    echo "Som: " . $animal->fazerSom() . "<br>";
    echo "Movimento: " . $animal->mover() . "<br><br>";
}

?>
