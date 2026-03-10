<?php

class documento{
    protected $numero;

    public function getNumero() {
        return $this->numero;
    }
    public function setNumero($numero) {
        $this->numero = $numero;
    }
}

   
class CPF extends Documento {

    public function validar(){
        $cpf = $this->getNumero();
        $cpf = preg_replace('/[^0-9]/', '', $cpf);
        if(strlen($cpf) != 11){
            return "CPF deve conter 11 digitos";
        }
        if(preg_match('/(\d)\1{10}/', $cpf)){
            return "CPF invalido";
        }
        for($t = 9; $t < 11; $t++){
            $soma = 0;
            for($i = 0; $i < $t; $i++){
                $soma += $cpf[$i] * (($t + 1) - $i);
            }
            $digito = ((10 * $soma) % 11) % 10;
            if($cpf[$t] != $digito){
                return "CPF invalido";
            }
        }
        return "CPF valido";
    }
}

$cpf = new CPF();
$cpf->setNumero("111.111.111-11");
echo $cpf->validar();

?>