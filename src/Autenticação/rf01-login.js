const PERFIS = {
  crianca:     { fa: 'fa-child-reaching', label: 'Criança',      redirect: '../rf-painel.html'              },
  adolescente: { fa: 'fa-person',         label: 'Adolescente',  redirect: '../rf-painel.html'              },
  jovemAdulto: { fa: 'fa-graduation-cap', label: 'Jovem Adulto', redirect: '../rf-painel.html'              },
  autonomo:    { fa: 'fa-briefcase',      label: 'Autônomo',     redirect: '../rf-painel.html'              },
  educador:    { fa: 'fa-chalkboard-user',label: 'Educador',     redirect: '../rf-painel.html'              },
};

const MSGS = {
  crianca:     'Que bom ter você aqui! Vamos guardar moedas e aprender a cuidar do dinheiro? 🪙',
  adolescente: 'Pronto para o desafio? Suas finanças, suas regras. Bora lá!',
  jovemAdulto: 'Continue construindo sua independência financeira. Você está no caminho certo!',
  autonomo:    'Seus ganhos organizados, sua reserva crescendo. Vamos nessa!',
  educador:    'Sua turma está esperando por você, Educador(a)!',
};

function mostrarAlerta(tipo, msg) {
  ['alert-erro', 'alert-sucesso'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('show');
    el.innerHTML = '';
  });
  const alvo = document.getElementById(tipo === 'erro' ? 'alert-erro' : 'alert-sucesso');
  const icon = tipo === 'erro'
    ? '<i class="fa-solid fa-circle-xmark"></i>'
    : '<i class="fa-solid fa-circle-check"></i>';
  alvo.innerHTML = `${icon} <span>${msg}</span>`;
  alvo.classList.add('show');
}

function setErro(inputId, errId, temErro) {
  document.getElementById(inputId).classList.toggle('err-field', temErro);
  document.getElementById(errId).classList.toggle('show', temErro);
  return temErro;
}

document.getElementById('form-login').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  let erro = false;
  erro = setErro('email', 'err-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || erro;
  erro = setErro('senha', 'err-senha', !senha) || erro;
  if (erro) return;

  const usuarios = JSON.parse(localStorage.getItem('monetago_usuarios') || '[]');
  const usuario  = usuarios.find(u => u.email === email && u.senha === btoa(senha));

  if (!usuario) {
    mostrarAlerta('erro', 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.');
    return;
  }

  localStorage.setItem('monetago_sessao', JSON.stringify({
    id:      usuario.id,
    nome:    usuario.nome,
    email:   usuario.email,
    perfil:  usuario.perfil,
    loginEm: new Date().toISOString(),
  }));

  mostrarAlerta('ok', 'Login realizado com sucesso! Redirecionando...');
  setTimeout(() => exibirPosLogin(usuario), 1200);
});

function exibirPosLogin(usuario) {
  document.getElementById('form-area').style.display = 'none';
  const p = PERFIS[usuario.perfil];
  const primeiroNome = usuario.nome.split(' ')[0];

  document.getElementById('pl-icon').innerHTML  = `<i class="fa-solid ${p.fa}"></i>`;
  document.getElementById('pl-badge').innerHTML = `<i class="fa-solid ${p.fa}"></i> ${p.label}`;
  document.getElementById('pl-nome').textContent = `Olá, ${primeiroNome}!`;
  document.getElementById('pl-msg').textContent  = MSGS[usuario.perfil];
  document.getElementById('pos-login').style.display = 'block';

  // Descomentar quando dashboards existirem:
  // window.location.href = p.redirect;
}

function sair() {
  localStorage.removeItem('monetago_sessao');
  window.location.reload();
}

const sessao = JSON.parse(localStorage.getItem('monetago_sessao') || 'null');
if (sessao) {
  const usuarios = JSON.parse(localStorage.getItem('monetago_usuarios') || '[]');
  const usuario  = usuarios.find(u => u.id === sessao.id);
  if (usuario) exibirPosLogin(usuario);
}
