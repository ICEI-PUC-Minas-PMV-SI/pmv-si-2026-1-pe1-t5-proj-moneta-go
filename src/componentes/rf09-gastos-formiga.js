const CATEGORIAS = {
    cafes: {
        nome: 'Cafés',
        icone: '☕',
        valorInicial: 85
    },

    delivery: {
        nome: 'Delivery',
        icone: '🍔',
        valorInicial: 230
    },

    transporte: {
        nome: 'Transporte',
        icone: '🚕',
        valorInicial: 120
    },

    mercado: {
        nome: 'Compras rápidas',
        icone: '🛒',
        valorInicial: 95
    }
};

const GASTOS_INICIAIS = [
    {
        descricao: 'Café da manhã',
        categoria: 'cafes',
        valor: 12
    },
    {
        descricao: 'Lanche por aplicativo',
        categoria: 'delivery',
        valor: 39
    },
    {
        descricao: 'Corrida curta',
        categoria: 'transporte',
        valor: 18
    },
    {
        descricao: 'Compra rápida no mercado',
        categoria: 'mercado',
        valor: 21
    }
];

let gastosExtras = JSON.parse(
    localStorage.getItem('monetago_gastos_formiga') || '[]'
);

const modal = document.getElementById('modal-gasto');
const btnAdicionarGasto = document.getElementById('btn-adicionar-gasto');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');

const formGasto = document.getElementById('form-gasto');
const descricaoGasto = document.getElementById('descricao-gasto');
const valorGasto = document.getElementById('valor-gasto');
const erroGasto = document.getElementById('erro-gasto');

const listaGastos = document.getElementById('lista-gastos');
const textoAlerta = document.getElementById('texto-alerta');

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

function identificarCategoria(descricao) {
    const texto = descricao.toLowerCase();

    const palavrasDelivery = [
        'ifood',
        'delivery',
        'lanche',
        'hamburguer',
        'hambúrguer',
        'pizza',
        'restaurante',
        'mcdonald',
        'açai',
        'acai'
    ];

    const palavrasTransporte = [
        'uber',
        '99',
        'taxi',
        'táxi',
        'onibus',
        'ônibus',
        'metro',
        'metrô',
        'combustivel',
        'combustível',
        'gasolina'
    ];

    const palavrasCafe = [
        'cafe',
        'café',
        'padaria',
        'capuccino',
        'capuccino',
        'espresso'
    ];

    const palavrasMercado = [
        'mercado',
        'supermercado',
        'farmacia',
        'farmácia',
        'compra',
        'loja',
        'shopping'
    ];

    if (palavrasDelivery.some(palavra => texto.includes(palavra))) {
        return 'delivery';
    }

    if (palavrasTransporte.some(palavra => texto.includes(palavra))) {
        return 'transporte';
    }

    if (palavrasCafe.some(palavra => texto.includes(palavra))) {
        return 'cafes';
    }

    if (palavrasMercado.some(palavra => texto.includes(palavra))) {
        return 'mercado';
    }

    return 'mercado';
}

function abrirModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    formGasto.reset();
    erroGasto.classList.remove('show');
    descricaoGasto.focus();
}

function fecharModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    erroGasto.classList.remove('show');
}

function calcularTotais() {
    const totais = {
        cafes: CATEGORIAS.cafes.valorInicial,
        delivery: CATEGORIAS.delivery.valorInicial,
        transporte: CATEGORIAS.transporte.valorInicial,
        mercado: CATEGORIAS.mercado.valorInicial
    };

    gastosExtras.forEach(gasto => {
        totais[gasto.categoria] += gasto.valor;
    });

    return totais;
}

function atualizarCards(totais) {
    document.getElementById('total-cafes').textContent =
        formatarMoeda(totais.cafes);

    document.getElementById('total-delivery').textContent =
        formatarMoeda(totais.delivery);

    document.getElementById('total-transporte').textContent =
        formatarMoeda(totais.transporte);

    document.getElementById('total-mercado').textContent =
        formatarMoeda(totais.mercado);
}

function atualizarAlerta(totais) {
    const total =
        totais.cafes +
        totais.delivery +
        totais.transporte +
        totais.mercado;

    const economiaPossivel = total * 0.20;

    textoAlerta.innerHTML = `
        ⚠️ Você gastou <strong>${formatarMoeda(total)}</strong>
        em pequenos gastos este mês.
        Se economizar 20%, pode guardar cerca de
        <strong>${formatarMoeda(economiaPossivel)}</strong>.
    `;
}

function atualizarBarras(totais) {
    const total =
        totais.cafes +
        totais.delivery +
        totais.transporte +
        totais.mercado;

    Object.keys(CATEGORIAS).forEach(categoria => {
        const percentual = total > 0
            ? (totais[categoria] / total) * 100
            : 0;

        document.getElementById(`barra-${categoria}`).style.width =
            `${percentual}%`;

        document.getElementById(`percentual-${categoria}`).textContent =
            `${Math.round(percentual)}%`;
    });
}

function montarListaGastos() {
    const todosGastos = [...GASTOS_INICIAIS, ...gastosExtras];

    listaGastos.innerHTML = '';

    todosGastos
        .slice(-6)
        .reverse()
        .forEach(gasto => {
            const categoria = CATEGORIAS[gasto.categoria];

            const item = document.createElement('div');
            item.className = 'expense';

            item.innerHTML = `
                <span>${categoria.icone} ${gasto.descricao}</span>
                <span class="value">${formatarMoeda(gasto.valor)}</span>
            `;

            listaGastos.appendChild(item);
        });
}

function atualizarTela() {
    const totais = calcularTotais();

    atualizarCards(totais);
    atualizarAlerta(totais);
    atualizarBarras(totais);
    montarListaGastos();
}

btnAdicionarGasto.addEventListener('click', abrirModal);
btnFecharModal.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);

modal.addEventListener('click', event => {
    if (event.target === modal) {
        fecharModal();
    }
});

formGasto.addEventListener('submit', event => {
    event.preventDefault();

    const descricao = descricaoGasto.value.trim();
    const valor = Number(valorGasto.value);

    if (!descricao || !valor || valor <= 0) {
        erroGasto.classList.add('show');
        return;
    }

    const categoria = identificarCategoria(descricao);

    gastosExtras.push({
        id: Date.now(),
        descricao: descricao,
        categoria: categoria,
        valor: valor
    });

    localStorage.setItem(
        'monetago_gastos_formiga',
        JSON.stringify(gastosExtras)
    );

    atualizarTela();
    fecharModal();
});

atualizarTela();