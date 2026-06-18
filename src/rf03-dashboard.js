/* ── Temas por perfil ── */
const TEMAS = {
  crianca: {
    bg: '#fff8e7',
    surface: '#ffffff',
    primary: '#e67e22',
    accent: '#2ecc71',
    text: '#2c3e50',
    muted: '#6b7280',
    border: '#f5d39a',
    highlight: '#fff2d6',
    h1: '32px',
    body: '17px',
    icon: 'fa-child-reaching',
    tag: 'Mundo Infantil',
  },
  adolescente: {
    bg: '#f5f7fb',
    surface: '#ffffff',
    primary: '#34495e',
    accent: '#e67e22',
    text: '#1f2937',
    muted: '#667085',
    border: '#d8e0e7',
    highlight: '#fff3e8',
    h1: '30px',
    body: '16px',
    icon: 'fa-bolt',
    tag: 'Modo Desafio',
  },
  jovemAdulto: {
    bg: '#f4f7f9',
    surface: '#ffffff',
    primary: '#2980b9',
    accent: '#2ecc71',
    text: '#2c3e50',
    muted: '#64748b',
    border: '#d8e0e7',
    highlight: '#eef8ff',
    h1: '28px',
    body: '16px',
    icon: 'fa-graduation-cap',
    tag: 'Jovem Adulto',
  },
  autonomo: {
    bg: '#f3f6f8',
    surface: '#ffffff',
    primary: '#2c3e50',
    accent: '#f1c40f',
    text: '#17212b',
    muted: '#64748b',
    border: '#d6dde5',
    highlight: '#fff8dc',
    h1: '27px',
    body: '15px',
    icon: 'fa-briefcase',
    tag: 'Autônomo',
  },
  educador: {
    bg: '#eff7fb',
    surface: '#ffffff',
    primary: '#2980b9',
    accent: '#1abc9c',
    text: '#1e3a4c',
    muted: '#5f7280',
    border: '#c8e2ef',
    highlight: '#e8f8f5',
    h1: '27px',
    body: '15px',
    icon: 'fa-chalkboard-user',
    tag: 'Educador(a)',
  },
};

/* ── Conteúdo por perfil: atende ao RF-03 ── */
const CONTEUDOS = {
  crianca: {
    saudacao: n => `Oi, ${n}! Vamos guardar moedas hoje?`,
    sub: 'Uma experiência com linguagem simples, visual mais lúdico e passos curtos para aprender brincando.',
    adaptacao: {
      faixa: 'Criança - 6 a 12 anos',
      complexidade: 'Baixa: tarefas guiadas e frases curtas',
      foco: 'Mesada, cofre, escolhas simples e recompensas',
    },
    dica: {
      emoji: '🪙',
      titulo: 'Dica do Dia',
      texto: 'Guardar um pouquinho todo dia faz seu cofre crescer. Comece com uma meta pequena e comemore cada avanço.',
    },
    stats: [
      { emoji: '🏆', valor: '3', label: 'Conquistas' },
      { emoji: '⭐', valor: 'Nível 2', label: 'Seu nível' },
      { emoji: '🪙', valor: '150', label: 'Moedas' },
    ],
    secao: 'Minhas Aventuras',
    secaoIcon: 'fa-gamepad',
    cards: [
      {
        icon: 'fa-piggy-bank', cor: '#e67e22',
        title: 'Cofre Mágico',
        desc: 'Guarde moedas, acompanhe sua meta e veja seu progresso crescer.',
        href: 'rf07-cofre-magico.html', cta: 'Abrir cofre',
      },
      {
        icon: 'fa-star', cor: '#f1c40f',
        title: 'Minhas Conquistas',
        desc: 'Veja medalhas, estrelas e desafios financeiros já concluídos.',
        href: '#', cta: 'Ver conquistas',
      },
      {
        icon: 'fa-cart-shopping', cor: '#2ecc71',
        title: 'Planejar Compras',
        desc: 'Aprenda a escolher bem o que comprar com o dinheiro da mesada.',
        href: 'planejamento-compras.html', cta: 'Começar',
      },
      {
        icon: 'fa-ant', cor: '#2980b9',
        title: 'Gastos Formiga',
        desc: 'Descubra para onde vão os trocados e aprenda a guardá-los.',
        href: 'rf09-gastos-formiga.html', cta: 'Descobrir',
      },
    ],
  },

  adolescente: {
    saudacao: n => `E aí, ${n}! Qual é a missão financeira de hoje?`,
    sub: 'Conteúdo mais direto, com desafios, comparações reais e decisões rápidas para treinar autonomia.',
    adaptacao: {
      faixa: 'Adolescente - 13 a 17 anos',
      complexidade: 'Média: missões, risco e consequência',
      foco: 'Consumo, metas, apostas, renda inicial e escolhas do dia a dia',
    },
    dica: {
      emoji: '⚠️',
      titulo: 'Missão Urgente',
      texto: 'Uma aposta de R$50 por semana vira R$2.600 no ano. Direcione esse dinheiro para uma meta que jogue a seu favor.',
    },
    stats: [
      { emoji: '🔥', valor: '7', label: 'Dias seguidos' },
      { emoji: '⚡', valor: 'Rank #42', label: 'Ranking' },
      { emoji: '💰', valor: 'R$0', label: 'Guardado' },
    ],
    secao: 'Suas Missões',
    secaoIcon: 'fa-bolt',
    cards: [
      {
        icon: 'fa-dice', cor: '#34495e',
        title: 'Simulador de Risco',
        desc: 'Compare apostas e investimentos para entender onde está o risco real.',
        href: 'Autenticação/rf06-simulador.html', cta: 'Jogar agora',
      },
      {
        icon: 'fa-piggy-bank', cor: '#e67e22',
        title: 'Cofre da Meta',
        desc: 'Configure uma meta financeira e acompanhe o progresso até chegar lá.',
        href: 'rf07-cofre-magico.html', cta: 'Definir meta',
      },
      {
        icon: 'fa-ant', cor: '#2980b9',
        title: 'Gastos Formiga',
        desc: 'R$5 por dia podem virar R$1.825 por ano. Veja onde o dinheiro escapa.',
        href: 'rf09-gastos-formiga.html', cta: 'Analisar gastos',
      },
      {
        icon: 'fa-cart-shopping', cor: '#2ecc71',
        title: 'Compra Consciente',
        desc: 'Treine compras planejadas e faça seu dinheiro render mais.',
        href: 'planejamento-compras.html', cta: 'Treinar',
      },
    ],
  },

  jovemAdulto: {
    saudacao: n => `Olá, ${n}. Sua jornada financeira continua.`,
    sub: 'Painel objetivo para organizar entradas, gastos, metas e decisões de consumo com mais independência.',
    adaptacao: {
      faixa: 'Jovem adulto - 18 a 25 anos',
      complexidade: 'Média-alta: orçamento, reserva e metas',
      foco: 'Independência financeira, controle mensal e consumo consciente',
    },
    dica: {
      emoji: '💡',
      titulo: 'Regra do Dia',
      texto: 'Use a regra 50/30/20: 50% para necessidades, 30% para desejos e 20% para poupança ou investimentos.',
    },
    stats: [
      { emoji: '📊', valor: 'R$0', label: 'Saldo do mês' },
      { emoji: '🎯', valor: '0%', label: 'Meta cumprida' },
      { emoji: '📈', valor: '0', label: 'Trilhas concluídas' },
    ],
    secao: 'Ferramentas Financeiras',
    secaoIcon: 'fa-chart-line',
    cards: [
      {
        icon: 'fa-ant', cor: '#2980b9',
        title: 'Gastos Formiga',
        desc: 'Rastreie pequenas despesas recorrentes e identifique padrões.',
        href: 'rf09-gastos-formiga.html', cta: 'Ver gastos',
      },
      {
        icon: 'fa-wallet', cor: '#2ecc71',
        title: 'Controle Financeiro',
        desc: 'Registre ganhos, despesas, categorias personalizadas e reserva.',
        href: 'rf10-financeiros.html', cta: 'Abrir controle',
      },
      {
        icon: 'fa-cart-shopping', cor: '#1abc9c',
        title: 'Planejamento de Compras',
        desc: 'Simule compras domésticas e pratique consumo consciente.',
        href: 'planejamento-compras.html', cta: 'Planejar agora',
      },
      {
        icon: 'fa-piggy-bank', cor: '#f1c40f',
        title: 'Meta de Poupança',
        desc: 'Defina um objetivo financeiro e acompanhe o progresso do cofre.',
        href: 'rf07-cofre-magico.html', cta: 'Definir meta',
      },
    ],
  },

  autonomo: {
    saudacao: n => `Bem-vindo(a), ${n}.`,
    sub: 'Resumo mais enxuto para renda variável, reserva e compras domésticas sem perder o controle do mês.',
    adaptacao: {
      faixa: 'Adulto independente',
      complexidade: 'Alta: renda variável, reserva e previsibilidade',
      foco: 'Ganhos, despesas fixas, emergência e planejamento familiar',
    },
    dica: {
      emoji: '📋',
      titulo: 'Lembrete Financeiro',
      texto: 'Mantenha uma reserva de emergência equivalente a 6 meses de despesas fixas antes de assumir novos riscos.',
    },
    stats: [
      { emoji: '💼', valor: 'R$0', label: 'Ganhos este mês' },
      { emoji: '🏦', valor: 'R$0', label: 'Reserva' },
      { emoji: '📉', valor: 'R$0', label: 'Despesas fixas' },
    ],
    secao: 'Painel do Autônomo',
    secaoIcon: 'fa-briefcase',
    cards: [
      {
        icon: 'fa-money-bill-wave', cor: '#2c3e50',
        title: 'Registrar Ganhos',
        desc: 'Controle renda variável, despesas operacionais e separação de impostos.',
        href: 'rf10-financeiros.html', cta: 'Registrar',
      },
      {
        icon: 'fa-shield-halved', cor: '#f1c40f',
        title: 'Reserva de Emergência',
        desc: 'Calcule quanto guardar para cobrir períodos de baixa renda.',
        href: 'rf07-cofre-magico.html', cta: 'Calcular reserva',
      },
      {
        icon: 'fa-chart-pie', cor: '#1abc9c',
        title: 'Relatório Financeiro',
        desc: 'Visualize entradas, saídas e evolução do seu patrimônio.',
        href: '#', cta: 'Ver relatório',
      },
      {
        icon: 'fa-cart-shopping', cor: '#2980b9',
        title: 'Compras Domésticas',
        desc: 'Planeje compras para proteger o orçamento familiar.',
        href: 'planejamento-compras.html', cta: 'Planejar compras',
      },
    ],
  },

  educador: {
    saudacao: n => `Bom dia, Prof. ${n}.`,
    sub: 'Ferramentas pedagógicas para acompanhar turmas, adaptar trilhas e usar simulações em sala de aula.',
    adaptacao: {
      faixa: 'Educador(a)',
      complexidade: 'Pedagógica: dados de turma e trilhas personalizadas',
      foco: 'Engajamento, desempenho, trilhas e atividades aplicadas',
    },
    dica: {
      emoji: '🎓',
      titulo: 'Recurso Pedagógico',
      texto: 'Use o Simulador de Risco em sala para debater apostas e investimentos com exemplos próximos da realidade dos alunos.',
    },
    stats: [
      { emoji: '👥', valor: '0', label: 'Alunos ativos' },
      { emoji: '📚', valor: '0', label: 'Trilhas' },
      { emoji: '📊', valor: '0%', label: 'Engajamento' },
    ],
    secao: 'Ferramentas do Educador',
    secaoIcon: 'fa-chalkboard-user',
    cards: [
      {
        icon: 'fa-users', cor: '#2980b9',
        title: 'Painel da Turma',
        desc: 'Acompanhe engajamento, desempenho por aluno e progresso nas trilhas.',
        href: 'Autenticação/rf12-painel-docente.html', cta: 'Acessar painel',
      },
      {
        icon: 'fa-route', cor: '#2ecc71',
        title: 'Gestão de Trilhas',
        desc: 'Personalize trilhas por turma, aluno ou contexto pedagógico.',
        href: 'Autenticação/rf13-gestao-trilhas.html', cta: 'Gerenciar',
      },
      {
        icon: 'fa-dice', cor: '#34495e',
        title: 'Simulador de Risco',
        desc: 'Atividade interativa sobre a diferença entre investimentos e apostas.',
        href: 'Autenticação/rf06-simulador.html', cta: 'Abrir simulador',
      },
      {
        icon: 'fa-cart-shopping', cor: '#1abc9c',
        title: 'Compras Conscientes',
        desc: 'Trilha sobre planejamento de compras domésticas para atividades em sala.',
        href: 'planejamento-compras.html', cta: 'Ver módulo',
      },
    ],
  },
};

function aplicarTema(perfil) {
  const tema = TEMAS[perfil] || TEMAS.jovemAdulto;
  const root = document.documentElement.style;

  root.setProperty('--theme-bg', tema.bg);
  root.setProperty('--theme-surface', tema.surface);
  root.setProperty('--theme-primary', tema.primary);
  root.setProperty('--theme-accent', tema.accent);
  root.setProperty('--theme-text', tema.text);
  root.setProperty('--theme-muted', tema.muted);
  root.setProperty('--theme-border', tema.border);
  root.setProperty('--theme-highlight', tema.highlight);
  root.setProperty('--theme-h1', tema.h1);
  root.setProperty('--theme-body', tema.body);
}

function escapeHTML(valor) {
  return String(valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderDashboard(sessao) {
  const perfil = sessao.perfil || 'jovemAdulto';
  const conteudo = CONTEUDOS[perfil] || CONTEUDOS.jovemAdulto;
  const tema = TEMAS[perfil] || TEMAS.jovemAdulto;
  const nome = (sessao.nome || 'visitante').trim().split(/\s+/)[0] || 'visitante';
  const nomeSeguro = escapeHTML(nome);

  aplicarTema(perfil);

  document.getElementById('user-pill').classList.remove('is-hidden');
  document.getElementById('btn-sair').classList.remove('is-hidden');
  document.getElementById('user-icon').className = `fa-solid ${tema.icon}`;
  document.getElementById('user-name').textContent = nome;

  document.getElementById('main').innerHTML = `
    <section class="profile-hero" aria-label="Painel personalizado">
      <div class="welcome">
        <span class="welcome-kicker">
          <i class="fa-solid ${tema.icon}" aria-hidden="true"></i>
          RF-03: Experiência adaptativa
        </span>
        <h1 class="welcome-greeting">${conteudo.saudacao(nomeSeguro)}</h1>
        <p class="welcome-sub">${conteudo.sub}</p>
        <span class="perfil-tag">
          <i class="fa-solid ${tema.icon}" aria-hidden="true"></i>
          ${tema.tag}
        </span>
      </div>

      <aside class="adaptation-card" aria-label="Ajustes automáticos do perfil">
        <div class="adaptation-header">
          <span class="adaptation-icon" aria-hidden="true">
            <i class="fa-solid fa-sliders"></i>
          </span>
          <div>
            <div class="adaptation-title">Como o painel se ajustou</div>
            <div class="adaptation-subtitle">Linguagem, visual e complexidade</div>
          </div>
        </div>
        <div class="adaptation-grid">
          <div class="adaptation-item">
            <span class="adaptation-label">Faixa / perfil</span>
            <span class="adaptation-value">${conteudo.adaptacao.faixa}</span>
          </div>
          <div class="adaptation-item">
            <span class="adaptation-label">Complexidade</span>
            <span class="adaptation-value">${conteudo.adaptacao.complexidade}</span>
          </div>
          <div class="adaptation-item">
            <span class="adaptation-label">Foco</span>
            <span class="adaptation-value">${conteudo.adaptacao.foco}</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="tip-banner" role="note" aria-label="Dica contextual">
      <div class="tip-emoji" aria-hidden="true">${conteudo.dica.emoji}</div>
      <div class="tip-content">
        <h3>${conteudo.dica.titulo}</h3>
        <p>${conteudo.dica.texto}</p>
      </div>
    </section>

    <section class="stats-row" aria-label="Resumo do usuário">
      ${conteudo.stats.map(item => `
        <article class="stat-card">
          <div class="stat-emoji" aria-hidden="true">${item.emoji}</div>
          <div>
            <div class="stat-value">${item.valor}</div>
            <div class="stat-label">${item.label}</div>
          </div>
        </article>
      `).join('')}
    </section>

    <section class="cards-section">
      <h2 class="section-title">
        <i class="fa-solid ${conteudo.secaoIcon}" aria-hidden="true"></i>
        ${conteudo.secao}
      </h2>
      <div class="cards-grid" role="list">
        ${conteudo.cards.map(card => `
          <a href="${card.href}" class="feature-card" role="listitem" aria-label="${card.title}">
            <div class="card-icon" style="background:${card.cor}" aria-hidden="true">
              <i class="fa-solid ${card.icon}"></i>
            </div>
            <div class="card-title">${card.title}</div>
            <div class="card-desc">${card.desc}</div>
            <span class="card-cta">
              ${card.cta}
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </span>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function sair() {
  localStorage.removeItem('monetago_sessao');
  window.location.href = 'Autenticação/rf01-login.html';
}

const sessao = JSON.parse(localStorage.getItem('monetago_sessao') || 'null');
document.getElementById('btn-sair').addEventListener('click', sair);

if (sessao && sessao.nome && sessao.perfil) {
  renderDashboard(sessao);
} else {
  document.getElementById('no-session').classList.remove('is-hidden');
}
