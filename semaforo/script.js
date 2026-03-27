const luzes = {
    vermelho: document.getElementById("vermelho"),
    amarelo: document.getElementById("amarelo"),
    verde: document.getElementById("verde")
};

let timer;

const tempos = {
    1: { vermelho: 10000, verde: 10000, amarelo: 4000 },
    2: { vermelho: 7000, verde: 7000, amarelo: 2500  }, 
    3: { vermelho: 5000, verde: 5000, amarelo: 1000  } 
};

function alternar(corAtiva) {
    Object.values(luzes).forEach(luz => luz.classList.remove("ativo"));
    luzes[corAtiva].classList.add("ativo");
}

function iniciarSemaforo(modo) {
    parar();
    
    const rodar = (cor) => {
        alternar(cor);
        
        let proxima, milissegundos = tempos[modo][cor];

        if (cor === 'vermelho') proxima = 'verde';
        else if (cor === 'verde') proxima = 'amarelo';
        else proxima = 'vermelho';

        timer = setTimeout(() => rodar(proxima), milissegundos);
    };

    rodar('vermelho'); 
}

function parar() {
    clearTimeout(timer);
    Object.values(luzes).forEach(luz => luz.classList.remove("ativo"));
}