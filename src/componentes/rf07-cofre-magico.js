const META_COFRE = 3000;

let saldoCofre = Number(
    localStorage.getItem('monetago_saldo_cofre') || 1350
);

const modal = document.getElementById('modal-deposito');
const btnDepositar = document.getElementById('btn-depositar');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const formDeposito = document.getElementById('form-deposito');
const inputDeposito = document.getElementById('valor-deposito');
const erroDeposito = document.getElementById('erro-deposito');

const valorCofre = document.getElementById('valor-cofre');
const moedasCofre = document.getElementById('moedas-cofre');
const barraProgresso = document.getElementById('barra-progresso');
const mensagemProgresso = document.getElementById('mensagem-progresso');

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function atualizarCofre() {
    const percentual = Math.min((saldoCofre / META_COFRE) * 100, 100);

    valorCofre.textContent = `${formatarMoeda(saldoCofre)} / ${formatarMoeda(META_COFRE)}`;
    moedasCofre.textContent = `🟡 ${saldoCofre} moedas acumuladas`;
    barraProgresso.style.width = `${percentual}%`;

    if (saldoCofre >= META_COFRE) {
        mensagemProgresso.textContent = '🎉 Parabéns! Você atingiu sua meta de poupança.';
        btnDepositar.disabled = true;
        btnDepositar.textContent = 'Meta concluída';
        return;
    }

    const falta = META_COFRE - saldoCofre;
    mensagemProgresso.textContent =
        `Faltam ${formatarMoeda(falta)} para completar sua meta!`;

    btnDepositar.disabled = false;
    btnDepositar.textContent = 'Depositar moedas';
}

function abrirModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    inputDeposito.value = '';
    erroDeposito.classList.remove('show');
    inputDeposito.focus();
}

function fecharModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    erroDeposito.classList.remove('show');
}

btnDepositar.addEventListener('click', abrirModal);

btnFecharModal.addEventListener('click', fecharModal);

btnCancelar.addEventListener('click', fecharModal);

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        fecharModal();
    }
});

formDeposito.addEventListener('submit', function(event) {
    event.preventDefault();

    const valorDigitado = Number(inputDeposito.value);
    const falta = META_COFRE - saldoCofre;

    if (!valorDigitado || valorDigitado <= 0) {
        erroDeposito.textContent = 'Informe um valor maior que zero.';
        erroDeposito.classList.add('show');
        return;
    }

    if (valorDigitado > falta) {
        erroDeposito.textContent =
            `Você pode depositar no máximo ${formatarMoeda(falta)} para atingir a meta.`;
        erroDeposito.classList.add('show');
        return;
    }

    saldoCofre += valorDigitado;

    localStorage.setItem(
        'monetago_saldo_cofre',
        saldoCofre.toString()
    );

    atualizarCofre();
    fecharModal();
});

atualizarCofre();