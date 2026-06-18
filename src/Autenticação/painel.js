// ===== ESTADO =====
const estado = {
    turmas: [],   // { id, nome }
    alunos: [],   // { id, nome, turmaId }
    perfis: []    // { alunoId, perfil }
};

// ===== UTILS =====
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,5); }

function toast(msg, tipo = 'success') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = `toast ${tipo} show`;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 3000);
}

function salvarStorage() {
    localStorage.setItem('gomoneta_estado', JSON.stringify(estado));
}

function carregarStorage() {
    const raw = localStorage.getItem('gomoneta_estado');
    if (raw) {
        const salvo = JSON.parse(raw);
        estado.turmas  = salvo.turmas  || [];
        estado.alunos  = salvo.alunos  || [];
        estado.perfis  = salvo.perfis  || [];
    }
}

// ===== ATUALIZAR UI =====
function atualizarStats() {
    document.getElementById('stat-turmas').textContent = estado.turmas.length;
    document.getElementById('stat-alunos').textContent = estado.alunos.length;
    document.getElementById('stat-perfis').textContent = estado.perfis.length;

    const total = estado.turmas.length * 5;
    const pct   = total > 0 ? Math.min(100, Math.round((estado.alunos.length / total) * 100)) : 0;
    document.getElementById('progresso-periodo').style.width = pct + '%';
}

function atualizarSelectTurmas() {
    const sel = document.getElementById('select-turma-aluno');
    const val = sel.value;
    sel.innerHTML = '<option value="" disabled>Selecione uma turma...</option>';
    estado.turmas.forEach(t => {
        const op = document.createElement('option');
        op.value = t.id; op.textContent = t.nome;
        sel.appendChild(op);
    });
    sel.value = val;
}

function atualizarSelectAlunos() {
    const sel = document.getElementById('select-aluno-perfil');
    const val = sel.value;
    sel.innerHTML = '<option value="" disabled>Selecione um aluno...</option>';
    estado.alunos.forEach(a => {
        const turma = estado.turmas.find(t => t.id === a.turmaId);
        const op = document.createElement('option');
        op.value = a.id;
        op.textContent = `${a.nome} (${turma ? turma.nome : '—'})`;
        sel.appendChild(op);
    });
    sel.value = val;
}

function renderListaTurmas() {
    const container = document.getElementById('lista-turmas-alunos');
    if (estado.turmas.length === 0) {
        container.innerHTML = '<p class="empty-state">Nenhuma turma criada ainda.</p>';
        return;
    }
    container.innerHTML = '';
    estado.turmas.forEach(turma => {
        const alunosDaTurma = estado.alunos.filter(a => a.turmaId === turma.id);
        const grupo = document.createElement('div');
        grupo.className = 'turma-grupo';
        const header = document.createElement('div');
        header.className = 'turma-header';
        header.innerHTML = `📂 ${turma.nome} <span style="font-weight:400; color:#888;">(${alunosDaTurma.length} aluno${alunosDaTurma.length !== 1 ? 's' : ''})</span>
            <button class="btn-remover" style="float:right" data-turma="${turma.id}" title="Excluir turma">×</button>`;
        grupo.appendChild(header);

        const ul = document.createElement('ul');
        ul.className = 'item-list';

        if (alunosDaTurma.length === 0) {
            ul.innerHTML = '<li><span class="item-info" style="color:#aaa;font-weight:400;">Nenhum aluno nesta turma.</span></li>';
        } else {
            alunosDaTurma.forEach(aluno => {
                const perfVinculo = estado.perfis.find(p => p.alunoId === aluno.id);
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <div class="item-info">👤 ${aluno.nome}</div>
                        <div class="item-meta">Perfil: ${perfVinculo ? perfVinculo.perfil : 'Não vinculado'}</div>
                    </div>
                    <button class="btn-remover" data-aluno="${aluno.id}" title="Remover aluno">×</button>`;
                ul.appendChild(li);
            });
        }

        grupo.appendChild(ul);
        container.appendChild(grupo);
    });

    container.querySelectorAll('[data-turma]').forEach(btn => {
        btn.addEventListener('click', () => removerTurma(btn.dataset.turma));
    });
    container.querySelectorAll('[data-aluno]').forEach(btn => {
        btn.addEventListener('click', () => removerAluno(btn.dataset.aluno));
    });
}

function renderListaPerfis() {
    const ul = document.getElementById('lista-perfis');
    if (estado.perfis.length === 0) {
        ul.innerHTML = '<li class="empty-state">Nenhum vínculo registrado.</li>';
        return;
    }
    ul.innerHTML = '';
    estado.perfis.forEach(p => {
        const aluno = estado.alunos.find(a => a.id === p.alunoId);
        if (!aluno) return;
        const turma = estado.turmas.find(t => t.id === aluno.turmaId);
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <div class="item-info">🧠 ${aluno.nome}</div>
                <div class="item-meta">${p.perfil} · ${turma ? turma.nome : '—'}</div>
            </div>
            <button class="btn-remover" data-perfil="${p.alunoId}" title="Remover vínculo">×</button>`;
        ul.appendChild(li);
    });
    ul.querySelectorAll('[data-perfil]').forEach(btn => {
        btn.addEventListener('click', () => removerPerfil(btn.dataset.perfil));
    });
}

function renderTudo() {
    atualizarStats();
    atualizarSelectTurmas();
    atualizarSelectAlunos();
    renderListaTurmas();
    renderListaPerfis();
}

// ===== AÇÕES =====
function removerTurma(id) {
    const alunosDaTurma = estado.alunos.filter(a => a.turmaId === id);
    if (alunosDaTurma.length > 0) {
        toast('Remova os alunos da turma antes de excluí-la.', 'error');
        return;
    }
    estado.turmas = estado.turmas.filter(t => t.id !== id);
    salvarStorage(); renderTudo();
    toast('Turma removida.', 'success');
}

function removerAluno(id) {
    estado.alunos  = estado.alunos.filter(a => a.id !== id);
    estado.perfis  = estado.perfis.filter(p => p.alunoId !== id);
    salvarStorage(); renderTudo();
    toast('Aluno removido.', 'success');
}

function removerPerfil(alunoId) {
    estado.perfis = estado.perfis.filter(p => p.alunoId !== alunoId);
    salvarStorage(); renderTudo();
    toast('Vínculo de perfil removido.', 'success');
}

// ===== FORMULÁRIOS =====
document.getElementById('form-turma').addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('input-turma').value.trim();
    if (!nome) return;
    if (estado.turmas.find(t => t.nome.toLowerCase() === nome.toLowerCase())) {
        toast('Já existe uma turma com esse nome.', 'error'); return;
    }
    estado.turmas.push({ id: uid(), nome });
    e.target.reset();
    salvarStorage(); renderTudo();
    toast(`Turma "${nome}" criada com sucesso! ✅`);
});

document.getElementById('form-aluno').addEventListener('submit', e => {
    e.preventDefault();
    const nome    = document.getElementById('input-aluno-nome').value.trim();
    const turmaId = document.getElementById('select-turma-aluno').value;
    if (!nome || !turmaId) return;
    estado.alunos.push({ id: uid(), nome, turmaId });
    e.target.reset();
    salvarStorage(); renderTudo();
    toast(`Aluno "${nome}" adicionado! ✅`);
});

document.getElementById('form-perfil').addEventListener('submit', e => {
    e.preventDefault();
    const alunoId = document.getElementById('select-aluno-perfil').value;
    const perfil  = document.getElementById('select-perfil').value;
    if (!alunoId || !perfil) return;
    const idx = estado.perfis.findIndex(p => p.alunoId === alunoId);
    if (idx >= 0) estado.perfis[idx].perfil = perfil;
    else estado.perfis.push({ alunoId, perfil });
    e.target.reset();
    salvarStorage(); renderTudo();
    toast(`Perfil vinculado com sucesso! 🧠`);
});

// ===== INICIAR =====
carregarStorage();
renderTudo();
