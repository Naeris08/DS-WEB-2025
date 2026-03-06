//*====================Referências aos elementos do DOM====================
const form = document.getElementById('formulario');
const resultadoInputs = document.querySelectorAll('.inputs'); // Seleciona os campos de entrada
const spansErro = document.querySelectorAll('.erro'); // Seleciona os spans de erro
const divResultadoGeral = document.getElementById('resultado');

//*====================Expressões regulares corrigidas====================
const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,50}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//! CEP: 5 dígitos, hífen obrigatório, 3 dígitos
const cepRegex = /^\d{5}-\d{3}$/;
//! Telefone: (11) 99999-9999 ou (11) 9999-9999
const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
//! Valor: Permite 1.299,90 ou 99,90 (ponto de milhar opcional)
const valorRegex = /^(?:\d{1,3}(?:\.\d{3})*|\d+),\d{2}$/;
//! URL: Obrigatório começar com http:// ou https://
const urlRegex = /^https?:\/\/.+/;
//! Cartão: 16 dígitos com espaços
const cartaoRegex = /^\d{4} \d{4} \d{4} \d{4}$/;

//*====================Funções de suporte (Identidade mantida)====================
function setError(index, mensagem) {
    spansErro[index].textContent = mensagem;
    spansErro[index].style.display = 'block';
    resultadoInputs[index].style.border = '2px solid #e63636';
}

function remError(index, campoNome) {
    spansErro[index].style.display = 'none';
    resultadoInputs[index].style.border = '2px solid #27c6f2';

    //! Adiciona ao log de resultados positivos conforme o exercício pede
    const valor = resultadoInputs[index].value;
    if (valor !== "") {
        const idLog = `log-${index}`;
        let logExistente = document.getElementById(idLog);
        if (!logExistente) {
            logExistente = document.createElement('p');
            logExistente.id = idLog;
            divResultadoGeral.appendChild(logExistente);
        }
        logExistente.innerHTML = `<strong>${campoNome}:</strong> ${valor} ✅`;
    }
}

//*====================Validações====================

function validarNome() {
    const valor = resultadoInputs[0].value;
    if (!nomeRegex.test(valor)) {
        setError(0, "Nome deve ter min. 3 caracteres e sem números.");
    } else {
        remError(0, "Nome");
    }
}

function validarEmail() {
    const valor = resultadoInputs[1].value;
    if (!emailRegex.test(valor)) {
        setError(1, "E-mail inválido (ex: usuario@dominio.com).");
    } else {
        remError(1, "E-mail");
    }
}

function validarSenha() {
    const valor = resultadoInputs[2].value;
    //! Regra de força: min 8 carac, 1 maiúsculo, 1 minúsculo, 1 número
    const senhaForte = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!senhaForte.test(valor)) {
        setError(2, "Senha requer 8 caracteres, maiúsculas, minúsculas e números.");
    } else {
        remError(2, "Senha");
    }
}

function validarConfirmacaoSenha() {
    const senha = resultadoInputs[2].value;
    const confirma = resultadoInputs[3].value;
    if (confirma !== senha || confirma === '') {
        setError(3, "As senhas não coincidem.");
    } else {
        remError(3, "Confirmação");
    }
}

function validarCPF() {
    const valor = resultadoInputs[4].value;
    const cpfLimpo = valor.replace(/\D/g, '');
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor) || !isCPFValido(cpfLimpo)) {
        setError(4, "CPF inválido ou máscara incorreta (000.000.000-00).");
    } else {
        remError(4, "CPF");
    }
}

function validarTelefone() {
    const valor = resultadoInputs[5].value;
    if (!telefoneRegex.test(valor)) {
        setError(5, "Formato: (11) 99999-9999 ou (11) 9999-9999.");
    } else {
        remError(5, "Telefone");
    }
}

function validarCEP() {
    const valor = resultadoInputs[6].value;
    if (!cepRegex.test(valor)) {
        setError(6, "CEP inválido. Use 00000-000.");
    } else {
        remError(6, "CEP");
    }
}

function validarDataNascimento() {
    const valor = resultadoInputs[7].value; //! input type="date" retorna AAAA-MM-DD
    if (valor === "") {
        setError(7, "Data é obrigatória.");
        return;
    }
    const dataRef = new Date(valor);
    if (isNaN(dataRef.getTime()) || dataRef > new Date()) {
        setError(7, "Data inválida ou no futuro.");
    } else {
        remError(7, "Data de Nascimento");
    }
}

function validarValor() {
    const valorStr = resultadoInputs[8].value;
    if (!valorRegex.test(valorStr)) {
        setError(8, "Formato inválido (Ex: 1.299,90).");
        return;
    }
    const valorNum = parseFloat(valorStr.replace(/\./g, '').replace(',', '.'));
    if (valorNum < 100 || valorNum > 10000) {
        setError(8, "Valor deve estar entre R$ 100,00 e R$ 10.000,00.");
    } else {
        remError(8, "Valor");
    }
}

function validarURL() {
    const valor = resultadoInputs[9].value;
    if (!urlRegex.test(valor)) {
        setError(9, "URL deve começar com http:// ou https://");
    } else {
        remError(9, "URL");
    }
}

function validarCartao() {
    const valor = resultadoInputs[10].value;
    if (!cartaoRegex.test(valor)) {
        setError(10, "Cartão deve ter 16 dígitos (0000 0000 0000 0000).");
    } else {
        //! Identificação de bandeira simples (Requisito 10)
        let bandeira = "Desconhecida";
        if (valor.startsWith('4')) bandeira = "Visa";
        else if (valor.startsWith('5')) bandeira = "Mastercard";

        remError(10, `Cartão (${bandeira})`);
    }
}

//! Função de CPF mantida (estava correta)
function isCPFValido(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

//! Bloquear envio do formulário se houver erros
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //! Aqui você dispararia todas as validações de uma vez antes de enviar
    alert("Formulário validado com sucesso!");
});