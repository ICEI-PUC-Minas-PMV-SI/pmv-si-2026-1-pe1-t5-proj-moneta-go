const PERFIS = {
  crianca:     { fa: 'fa-child-reaching', nome: 'Criança',      desc: '6 a 12 anos'         },
  adolescente: { fa: 'fa-person',         nome: 'Adolescente',  desc: '13 a 17 anos'        },
  jovemAdulto: { fa: 'fa-graduation-cap', nome: 'Jovem Adulto', desc: '18 a 25 anos'        },
  autonomo:    { fa: 'fa-briefcase',      nome: 'Autônomo',     desc: '18+ anos'            },
  educador:    { fa: 'fa-chalkboard-user',nome: 'Educador',     desc: 'Professor / Pedagogo'},
};

const MSGS_SUCESSO = {
  crianca:     { fa: 'fa-gamepad',         texto: 'Bem-vindo(a) ao Mundo Lúdico! Prepare-se para uma aventura financeira incrível!' },
  adolescente: { fa: 'fa-bolt',            texto: 'Bem-vindo(a) ao Mundo Desafio! Hora de dominar suas finanças e conquistar seus sonhos!' },
  jovemAdulto: { fa: 'fa-chart-line',      texto: 'Bem-vindo(a) ao Mundo Fintech! Sua independência financeira começa agora.' },
  autonomo:    { fa: 'fa-briefcase',       texto: 'Bem-vindo(a) ao Moneta Go! Organize seus ganhos e construa sua reserva de emergência.' },
  educador:    { fa: 'fa-chalkboard-user', texto: 'Bem-vindo(a), Educador(a)! Sua turma espera por você.' },
};

let etapaAtual = 1;
let perfilSelecionado = null;
let idadeUsuario = null;

function calcIdade(dataStr) {
  const hoje = new Date();
  const nasc = new Date(dataStr);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
  return idade;
}

function setErro(inputId, errId, temErro) {
  document.getElementById(inputId).classList.toggle('err-field', temErro);
  const span = document.getElementById(errId);
  span.classList.toggle('show', temErro);
  return temErro;
}

function irEtapa(n) {
  const idAtual = etapaAtual === 'sucesso' ? 'step-sucesso' : `step-${etapaAtual}`;
  document.getElementById(idAtual).classList.remove('active');
  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById(`prog-${i}`);
    el.classList.remove('active', 'done');
    if (i < n)        el.classList.add('done');
    else if (i === n) el.classList.add('active');
  }
  etapaAtual = n;
  document.getElementById(`step-${n}`).classList.add('active');
  document.querySelector('.progress-steps').setAttribute('aria-valuenow', n);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById('form1').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome  = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const senha2= document.getElementById('senha2').value;
  const nasc  = document.getElementById('nascimento').value;

  let erro = false;
  erro = setErro('nome',       'err-nome',      nome.length < 3)                            || erro;
  erro = setErro('email',      'err-email',     !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || erro;
  erro = setErro('senha',      'err-senha',     senha.length < 6)                           || erro;
  erro = setErro('senha2',     'err-senha2',    senha !== senha2)                           || erro;
  erro = setErro('nascimento', 'err-nascimento',!nasc)                                      || erro;
  if (erro) return;

  const usuarios = JSON.parse(localStorage.getItem('monetago_usuarios') || '[]');
  if (usuarios.some(u => u.email === email)) {
    document.getElementById('email').classList.add('err-field');
    const span = document.getElementById('err-email');
    span.querySelector('i').nextSibling
      ? (span.lastChild.textContent = ' Este e-mail já está cadastrado')
      : span.appendChild(document.createTextNode(' Este e-mail já está cadastrado'));
    span.classList.add('show');
    return;
  }

  idadeUsuario = calcIdade(nasc);
  if (idadeUsuario < 6) {
    setErro('nascimento', 'err-nascimento', true);
    return;
  }

  montarGrid();
  irEtapa(2);
});

function montarGrid() {
  const grid = document.getElementById('profile-grid');
  grid.innerHTML = '';
  perfilSelecionado = null;

  let opcoes;
  const badge = document.getElementById('badge-auto');

  if (idadeUsuario >= 6 && idadeUsuario <= 12) {
    opcoes = ['crianca', 'educador'];
    badge.classList.add('show');
    selPerfil('crianca');
  } else if (idadeUsuario >= 13 && idadeUsuario <= 17) {
    opcoes = ['adolescente', 'educador'];
    badge.classList.add('show');
    selPerfil('adolescente');
  } else {
    opcoes = ['jovemAdulto', 'autonomo', 'educador'];
    badge.classList.remove('show');
  }

  opcoes.forEach(key => {
    const p = PERFIS[key];
    const card = document.createElement('div');
    card.className = 'profile-card' + (perfilSelecionado === key ? ' selected' : '');
    card.setAttribute('role',        'radio');
    card.setAttribute('aria-checked', perfilSelecionado === key ? 'true' : 'false');
    card.setAttribute('tabindex',    '0');
    card.setAttribute('aria-label',  `${p.nome}: ${p.desc}`);
    card.dataset.key = key;
    card.innerHTML = `
      <div class="pc-icon"><i class="fa-solid ${p.fa}"></i></div>
      <div class="pc-name">${p.nome}</div>
      <div class="pc-desc">${p.desc}</div>
    `;
    card.addEventListener('click',   () => selPerfil(key));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selPerfil(key); }
    });
    grid.appendChild(card);
  });
}

function selPerfil(key) {
  perfilSelecionado = key;
  document.querySelectorAll('.profile-card').forEach(c => {
    const sel = c.dataset.key === key;
    c.classList.toggle('selected', sel);
    c.setAttribute('aria-checked', sel ? 'true' : 'false');
  });
  document.getElementById('educador-fields').style.display = key === 'educador' ? 'block' : 'none';
  document.getElementById('err-perfil').style.display = 'none';
}

document.getElementById('btn2').addEventListener('click', function() {
  if (!perfilSelecionado) {
    document.getElementById('err-perfil').style.display = 'flex';
    return;
  }
  if (perfilSelecionado === 'educador') {
    let erro = false;
    erro = setErro('escola', 'err-escola', document.getElementById('escola').value.trim().length < 3) || erro;
    erro = setErro('area',   'err-area',   !document.getElementById('area').value)                    || erro;
    if (erro) return;
  }
  const menor = idadeUsuario < 18;
  document.getElementById('aviso-lgpd').classList.toggle('show', menor);
  document.getElementById('ck-responsavel-wrap').style.display = menor ? 'flex' : 'none';
  irEtapa(3);
});

document.getElementById('btn-finalizar').addEventListener('click', function() {
  const ckT = document.getElementById('ck-termos').checked;
  const ckP = document.getElementById('ck-privacidade').checked;
  const ckR = idadeUsuario < 18 ? document.getElementById('ck-responsavel').checked : true;

  if (!ckT || !ckP || !ckR) {
    document.getElementById('err-termos').classList.add('show');
    return;
  }
  document.getElementById('err-termos').classList.remove('show');

  const novoUsuario = {
    id:             Date.now(),
    nome:           document.getElementById('nome').value.trim(),
    email:          document.getElementById('email').value.trim(),
    senha:          btoa(document.getElementById('senha').value),
    dataNascimento: document.getElementById('nascimento').value,
    perfil:         perfilSelecionado,
    escola:         perfilSelecionado === 'educador' ? document.getElementById('escola').value.trim() : null,
    area:           perfilSelecionado === 'educador' ? document.getElementById('area').value          : null,
    criadoEm:       new Date().toISOString(),
  };

  const usuarios = JSON.parse(localStorage.getItem('monetago_usuarios') || '[]');
  usuarios.push(novoUsuario);
  localStorage.setItem('monetago_usuarios', JSON.stringify(usuarios));

  const msg = MSGS_SUCESSO[perfilSelecionado];
  document.getElementById('sucesso-icon').innerHTML = `<i class="fa-solid ${msg.fa}"></i>`;
  document.getElementById('sucesso-msg').textContent = msg.texto;

  document.getElementById('step-3').classList.remove('active');
  document.getElementById('step-sucesso').classList.add('active');
  document.querySelector('.progress-steps').style.display = 'none';
  etapaAtual = 'sucesso';
});
