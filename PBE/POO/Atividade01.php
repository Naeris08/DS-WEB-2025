<?php
class arma{
    public $tipo;
    public $dano;
    public $tempo;
    public $modelo;
    public $distancia;

    public function limpar(){
        return "Você limpou a ".$this->tipo." do modelo ".$this->modelo.".<br>";
    }
    public function causarDano(){
        return "Você causou dano ".$this->dano." em ".$this->tempo." segundos.<br>";
    }
    public function ameacar(){
        return "Você ameaçou algo ou alguém usando uma ".$this->tipo." a uma distância de ".$this->distancia." metros.<br>";
    }
    public function proteger(){
        return "Você protegeu alguém usando uma arma de ".$this->tipo.".<br>";
    }
}
//==========Kark98==========
$kark98 = new arma();
$kark98->tipo = "Arma de fogo";
$kark98->modelo = "Kark98";
$kark98->dano = "perfurante";
$kark98->tempo = "1,4";
$kark98->distancia = "20";
echo $kark98->limpar();
echo $kark98->causarDano();
echo $kark98->ameacar();
echo $kark98->proteger();
//==========Rapieira==========
$rapieira = new arma();
$rapieira->tipo = "espada";
$rapieira->modelo = "Rapieira";
$rapieira->dano = "perfurante";
$rapieira->tempo = "0,9";
$rapieira->distancia = "1,5";
echo $rapieira->limpar();
echo $rapieira->causarDano();
echo $rapieira->ameacar();
echo $rapieira->proteger();
//==========Kopesh==========
$kopesh = new arma();
$kopesh->tipo = "espada";
$kopesh->modelo = "Kopesh";
$kopesh->dano = "cortante";
$kopesh->tempo = "1,4";
$kopesh->distancia = "1";
echo $kopesh->limpar();
echo $kopesh->causarDano();
echo $kopesh->ameacar();
echo $kopesh->proteger();
class jogos{
    public $nome;
    public $genero;
    public $empresa;
    public $ano;
    public $historia;

    public function jogar(){
        return "Você está jogando o jogo ".$this->nome." do gênero ".$this->genero.".";
    }
    public function estressar(){
        return "A empresa ".$this->empresa." fez você ficar estressado ao lançar o jogo ".$this->nome;
    }
    public function subirDeNivel(){
        return "Você subiu de nível no jogo ".$this->nome.".";
    }
}
//==========Red Dead Redempition==========
$rdr = new jogos();
$rdr->nome = "Red Dead Redempition";
$rdr->genero = "Mundo aberto";
$rdr->empresa = "Rockstar";
echo $rdr->jogar();
echo $rdr->estressar();
echo $rdr->subirDeNivel();
//==========Horizon zero dawn==========
$hzd = new jogos();
$hzd->nome = "Horizon Zero Dawn";
$hzd->genero = "RPG";
$hzd->empresa = "Guerrila";
echo $hzd->jogar();
echo $hzd->estressar();
echo $hzd->subirDeNivel();
//==========Hollow Knight==========
$hk = new jogos();
$hk->nome = "Hollow Knight";
$hk->genero = "Metroidvania";
$hk->empresa = "Team Cherry";
echo $hk->jogar();
echo $hk->estressar();
echo $hk->subirDeNivel();
class estudo{
    public $materia;
    public $tempo;
    public $horario;
    public $grade;
    public $professor;

    public function revisar(){
        return "Você está revisando a matéria de ".$this->materia." do professor(a) ".$this->professor.".";
    }
    public function estudar(){
        return "Você está estudando a matéria ".$this->materia." do professor".$this->professor.".";
    }
    public function tirarDuvida(){
        return "Você tirou uma dúvida com o professor ".$this->professor." sobre a matéria de ".$this->materia.".";
    }
}
//==========Matemática==========
$mat = new estudo();
$mat->materia = "Matemática";
$mat->professor = "Joara";
echo $mat->revisar();
echo $mat->estudar();
echo $mat->tirarDuvida();
//==========Física==========
$fis = new estudo();
$fis->materia = "Física";
$fis->professor = "Erik";
echo $fis->revisar();
echo $fis->estudar();
echo $fis->tirarDuvida();
//==========Filosofia==========
$filo = new estudo();
$filo->materia = "Filosofia";
$filo->professor = "Fabrício";
echo $filo->revisar();
echo $filo->estudar();
echo $filo->tirarDuvida();
class roupas{
    public $tipo;
    public $tamanho;
    public $marca;
    public $material;
    public $preco;

    public function vestir(){
        return "Você vestiu uma ".$this->tipo." do tamanho ".$this->tamanho.".";
    }
    public function lavar(){
        return "Você lavou uma ".$this->tipo." feita de ".$this->material.".";
    }
    public function guardar(){
        return "Você guardou uma ".$this->tipo." da marca ".$this->marca." que te custou ".$this->preco.".";
    }
}
//==========Camiseta==========
$camiseta = new roupas();
$camiseta->tipo = "Camiseta";
$camiseta->tamanho = "M";
$camiseta->marca = "Nike";
$camiseta->material = "Algodão";
$camiseta->preco = "R$ 50,00";
echo $camiseta->vestir();
echo $camiseta->lavar();
echo $camiseta->guardar();
//==========Calça Jeans==========
$calca = new roupas();
$calca->tipo = "Calça Jeans";
$calca->tamanho = "G";
$calca->marca = "Levi's";
$calca->material = "Denim";
$calca->preco = "R$ 120,00";
echo $calca->vestir();
echo $calca->lavar();
echo $calca->guardar();
//==========Jaqueta==========
$jaqueta = new roupas();
$jaqueta->tipo = "Jaqueta";
$jaqueta->tamanho = "P";
$jaqueta->marca = "Adidas";
$jaqueta->material = "Poliéster";
$jaqueta->preco = "R$ 200,00";
echo $jaqueta->vestir();
echo $jaqueta->lavar();
echo $jaqueta->guardar();
class comida{
    public $tipo;
    public $quantidade;
    public $preparo;
    public $paisOrigem;
    public $qualidade;

    public function preparar(){
        return "Você preparou um(a) ".$this->tipo."."
    }
    public function comer(){
        return "Você comeu um(a) ".$this->tipo." originário do(a) ".$this->paisOrigem.".";
    }
    public function temperar(){
        return "Você temperou um(a) ".$this->tipo." usando as qualidades de tempero ".$this->qualidade.".";
    }
}
//==========Pizza==========
$pizza = new comida();
$pizza->tipo = "Pizza";
$pizza->quantidade = "1";
$pizza->preparo = "Forno a 200°C";
$pizza->paisOrigem = "Itália";
$pizza->qualidade = "Orégano, pimenta e alho";
echo $pizza->preparar();
echo $pizza->comer();
echo $pizza->temperar();
//==========Sushi==========
$sushi = new comida();
$sushi->tipo = "Sushi";
$sushi->quantidade = "8 peças";
$sushi->preparo = "Feito à mão com arroz e peixe";
$sushi->paisOrigem = "Japão";
$sushi->qualidade = "Wasabi, gengibre e molho de soja";
echo $sushi->preparar();
echo $sushi->comer();
echo $sushi->temperar();
//==========Brigadeiro==========
$brigadeiro = new comida();
$brigadeiro->tipo = "Brigadeiro";
$brigadeiro->quantidade = "12 unidades";
$brigadeiro->preparo = "Fogão médio por 15 minutos";
$brigadeiro->paisOrigem = "Brasil";
$brigadeiro->qualidade = "Chocolate em pó e calda doce";
echo $brigadeiro->preparar();
echo $brigadeiro->comer();
echo $brigadeiro->temperar();
>