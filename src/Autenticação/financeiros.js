// ===== ESTADO =====
const estado = {
    transacoes: [],     // { id, tipo, valor, data, categoria, descricao }
    categorias: [       // default + personalizadas
        { nome: 'Salário',      tipo: 'ganho'    },
        { nome: 'Freelance',    tipo: 'ganho'    },
        { nome: 'Alimentação',  tipo: 'despesa'  },
        { nome: 'Transporte',   tipo: 'despesa'  },
    ],
    reserva: { atual: 0, meta: 10000 }
};

// ===== UTILS =====
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,5); }

function fmt(n) {
    return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function fmtData(str) {
    if (!str) return '';
    const [y, m, d] = str.split('-');
    return `${d}/${m}/${y}`;
}

function toast(msg, tipo = 'success') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast ${tipo} show`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

function salvarStorage() {
    localStorage.setItem('gomoneta_fin', JSON.stringify(estado));
}
function carregarStorage() {
    const raw = localStorage.getItem('gomoneta_fin');
    if (raw) {
        const s = JSON.parse(raw);
        estado.transacoes = s.transacoes || [];
        estado.categorias = s.categorias || estado.categorias;
        estado.reserva    = s.reserva    || estado.reserva;
    }
}

// ===== RENDER =====
function atualizarResumo() {
    const ganhos   = estado.transacoes.filter(t => t.tipo === 'ganho').reduce((a, t) => a + t.valor, 0);
    const despesas = estado.transacoes.filter(t => t.tipo === 'despesa').reduce((a, t) => a + t.valor, 0);
    const saldo    = ganhos - despesas;

    document.getElementById('resumo-ganhos').textContent   = fmt(ganhos);
    document.getElementById('resumo-despesas').textContent = fmt(despesas);
    const elSaldo = document.getElementById('resumo-saldo');
    elSaldo.textContent = fmt(saldo);
    elSaldo.style.color = saldo < 0 ? '#e74c3c' : 'var(--belize-blue)';
}

function atualizarSelectCategorias() {
    const tipo = document.querySelector('input[name="tipo-transacao"]:checked')?.value || 'ganho';
    const sel  = document.getElementById('categoria-transacao');
    const val  = sel.value;
    sel.innerHTML = '<option value="" disabled>Selecione uma categoria...</option>';
    estado.categorias.filter(c => c.tipo === tipo).forEach(c => {
        const op = document.createElement('option');
        op.value = c.nome; op.textContent = c.nome;
        sel.appendChild(op);
    });
    sel.value = val;
}

function renderTransacoes() {
    const ul = document.getElementById('lista-transacoes');
    if (estado.transacoes.length === 0) {
        ul.innerHTML = '<li class="empty-state">Nenhum lançamento ainda.</li>';
        return;
    }
    ul.innerHTML = '';
    [...estado.transacoes].reverse().forEach(tx => {
        const li = document.createElement('li');
        li.className = tx.tipo;
        li.innerHTML = `
            <div class="tx-info">
                <div class="tx-desc">${tx.descricao}</div>
                <div class="tx-meta">${tx.categoria} · ${fmtData(tx.data)}</div>
            </div>
            <div class="tx-actions">
                <span class="tx-valor ${tx.tipo}">${tx.tipo === 'ganho' ? '+' : '-'}${fmt(tx.valor)}</span>
                <button class="btn-remover" data-id="${tx.id}" title="Remover">×</button>
            </div>`;
        ul.appendChild(li);
    });
    ul.querySelectorAll('[data-id]').forEach(btn => {
        btn.addEventListener('click', () => removerTransacao(btn.dataset.id));
    });
}

function renderCategorias() {
    const ul = document.getElementById('lista-categorias');
    const personalizadas = estado.categorias.slice(4);
    if (personalizadas.length === 0) {
        ul.innerHTML = '<li class="empty-state">Nenhuma categoria personalizada.</li>';
        return;
    }
    ul.innerHTML = '';
    personalizadas.forEach((c, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${c.nome}</span>
            <div style="display:flex;gap:8px;align-items:center">
                <span class="cat-badge ${c.tipo}">${c.tipo}</span>
                <button class="btn-remover" data-cat="${i + 4}" title="Remover">×</button>
            </div>`;
        ul.appendChild(li);
    });
    ul.querySelectorAll('[data-cat]').forEach(btn => {
        btn.addEventListener('click', () => removerCategoria(parseInt(btn.dataset.cat)));
    });
}

function renderMeta() {
    const { atual, meta } = estado.reserva;
    const pct = meta > 0 ? Math.min(100, Math.round((atual / meta) * 100)) : 0;
    document.getElementById('meta-atual').textContent    = fmt(atual);
    document.getElementById('meta-objetivo').textContent = fmt(meta);
    document.getElementById('meta-barra').style.width   = pct + '%';
    document.getElementById('meta-pct').textContent     = `${pct}% concluído`;
}

function renderTudo() {
    atualizarResumo();
    atualizarSelectCategorias();
    renderTransacoes();
    renderCategorias();
    renderMeta();
}

// ===== AÇÕES =====
function removerTransacao(id) {
    estado.transacoes = estado.transacoes.filter(t => t.id !== id);
    salvarStorage(); renderTudo();
    toast('Lançamento removido.');
}

function removerCategoria(idx) {
    const nome = estado.categorias[idx]?.nome;
    if (estado.transacoes.find(t => t.categoria === nome)) {
        toast('Não é possível remover: categoria em uso.', 'error'); return;
    }
    estado.categorias.splice(idx, 1);
    salvarStorage(); renderTudo();
    toast('Categoria removida.');
}

// ===== FORMULÁRIOS =====
document.querySelectorAll('input[name="tipo-transacao"]').forEach(r => {
    r.addEventListener('change', atualizarSelectCategorias);
});

document.getElementById('form-transacao').addEventListener('submit', e => {
    e.preventDefault();
    const tipo      = document.querySelector('input[name="tipo-transacao"]:checked').value;
    const valor     = parseFloat(document.getElementById('valor').value);
    const data      = document.getElementById('data').value;
    const categoria = document.getElementById('categoria-transacao').value;
    const descricao = document.getElementById('descricao').value.trim();

    if (!valor || !data || !categoria || !descricao) return;

    estado.transacoes.push({ id: uid(), tipo, valor, data, categoria, descricao });
    e.target.reset();
    document.querySelector('input[name="tipo-transacao"][value="ganho"]').checked = true;
    salvarStorage(); renderTudo();
    toast(`Lançamento salvo! ${tipo === 'ganho' ? '📈' : '📉'}`);
});

document.getElementById('form-categoria').addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome-categoria').value.trim();
    const tipo = document.getElementById('tipo-categoria').value;
    if (!nome) return;
    if (estado.categorias.find(c => c.nome.toLowerCase() === nome.toLowerCase())) {
        toast('Já existe uma categoria com esse nome.', 'error'); return;
    }
    estado.categorias.push({ nome, tipo });
    e.target.reset();
    salvarStorage(); renderTudo();
    toast(`Categoria "${nome}" criada! 🏷️`);
});

document.getElementById('form-meta').addEventListener('submit', e => {
    e.preventDefault();
    const novoObj   = document.getElementById('novo-objetivo').value;
    const adicionar = parseFloat(document.getElementById('atualizar-reserva').value);

    if (novoObj) estado.reserva.meta = parseFloat(novoObj);
    if (!isNaN(adicionar) && adicionar > 0) estado.reserva.atual += adicionar;

    e.target.reset();
    salvarStorage(); renderTudo();
    toast('Reserva atualizada! 💰');
});

// ===== INICIAR =====
carregarStorage();
document.getElementById('data').valueAsDate = new Date();
renderTudo();
