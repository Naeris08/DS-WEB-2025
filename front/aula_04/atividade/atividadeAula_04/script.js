const dog = document.getElementById('cachorro');
const screenGameOver = document.getElementById('gameOver');
const screenTimer = document.getElementById('timerTela');
const txtContagem = document.getElementById('contagem');

let mouseX = 0, mouseY = 0;
let dogX = 0, dogY = 0;
let jogando = false;
let podePerseguir = false;

let tempo = 3;
const timer = setInterval(() => {
    tempo--;
    if (tempo > 0) {
        txtContagem.innerText = tempo;
    } else {
        clearInterval(timer);
        comecarJogo();
    }
}, 1000);

function comecarJogo() {
    screenTimer.style.display = 'none';
    screenGameOver.style.display = 'none'; // Oculta game over ao iniciar
    jogando = true;
    podePerseguir = true;
}

window.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function update() {
    if (jogando && podePerseguir) {
        let dx = mouseX - dogX;
        let dy = mouseY - dogY;

        dogX += dx * 0.04;
        dogY += dy * 0.04;

        dog.style.left = (dogX - 50) + 'px';
        dog.style.top = (dogY - 50) + 'px';

        if (dx < 0) {
            dog.style.transform = "scaleX(-1)";
        } else {
            dog.style.transform = "scaleX(1)";
        }

        if (Math.abs(dx) < 40 && Math.abs(dy) < 40) {
            finalizarJogo();
        }
    }
    requestAnimationFrame(update);
}

function finalizarJogo() {
    jogando = false;
    podePerseguir = false;
    screenGameOver.style.display = 'block';
}

update();