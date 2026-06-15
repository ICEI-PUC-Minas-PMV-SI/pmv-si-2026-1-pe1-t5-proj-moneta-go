/* ── Temas por perfil ── */
  const TEMAS = {
    crianca: {
      bg: '#fff9e6', surface: '#ffffff', primary: '#e67e22',
      accent: '#2ecc71', text: '#2c3e50', muted: '#888',
      border: '#fdebd0', h1: '34px', body: '18px', radius: '20px',
      font: "'Nunito', 'Comic Sans MS', cursive, Arial",
      icon: 'fa-child-reaching', tag: 'Mundo Infantil 🌈',
    },
    adolescente: {
      bg: '#0f172a', surface: '#1e293b', primary: '#e94560',
      accent: '#a855f7', text: '#f1f5f9', muted: '#94a3b8',
      border: '#334155', h1: '30px', body: '16px', radius: '10px',
      font: "'Segoe UI', Roboto, Arial, sans-serif",
      icon: 'fa-bolt', tag: 'Modo Desafio ⚡',
    },
    jovemAdulto: {
      bg: '#f8fafc', surface: '#ffffff', primary: '#3b82f6',
      accent: '#10b981', text: '#1e293b', muted: '#64748b',
      border: '#e2e8f0', h1: '28px', body: '16px', radius: '12px',
      font: "'Segoe UI', Roboto, Arial, sans-serif",
      icon: 'fa-graduation-cap', tag: 'Jovem Adulto',
    },
    autonomo: {
      bg: '#f1f5f9', surface: '#ffffff', primary: '#334155',
      accent: '#f59e0b', text: '#0f172a', muted: '#64748b',
      border: '#cbd5e1', h1: '26px', body: '15px', radius: '8px',
      font: "'Segoe UI', Roboto, Arial, sans-serif",
      icon: 'fa-briefcase', tag: 'Autônomo',
    },
    educador: {
      bg: '#eff6ff', surface: '#ffffff', primary: '#1d4ed8',
      accent: '#059669', text: '#1e3a8a', muted: '#6b7280',
      border: '#bfdbfe', h1: '26px', body: '15px', radius: '8px',
      font: "'Segoe UI', Roboto, Arial, sans-serif",
      icon: 'fa-chalkboard-user', tag: 'Educador(a)',
    },
  };

  /* ── Conteúdo por perfil ── */
  const CONTEUDOS = {
    crianca: {
      saudacao: n => `Oi, ${n}! 🌟 Vamos guardar moedas hoje?`,
      sub: 'Cada moedin conta! Escolha sua aventura:',
      dica: {
        emoji: '🪙',
        titulo: 'Dica do Dia!',
        texto: 'Guardar um pouquinho todo dia faz seu cofre crescer muito rápido. Você consegue!',
      },
      stats: [
        { emoji: '🏆', valor: '3', label: 'Conquistas' },
        { emoji: '⭐', valor: 'Nível 2', label: 'Seu nível' },
        { emoji: '🪙', valor: '150', label: 'Moedas' },
      ],
      secao: '🎮 Minhas Aventuras',
      cards: [
        {
          icon: 'fa-piggy-bank', cor: '#f39c12',
          title: 'Cofre Mágico 🏦',
          desc: 'Guarde suas moedas e veja seu cofre ficar cheio de surpresas!',
          href: 'rf07-cofre-magico.html', cta: 'Abrir meu cofre',
        },
        {
          icon: 'fa-star', cor: '#e74c3c',
          title: 'Minhas Conquistas 🌈',
          desc: 'Veja todas as estrelas e medalhas que você já ganhou jogando!',
          href: '#', cta: 'Ver conquistas',
        },
        {
          icon: 'fa-cart-shopping', cor: '#27ae60',
          title: 'Planejar Compras 🛒',
          desc: 'Aprenda a escolher bem o que comprar com o dinheiro da mesada!',
          href: 'planejamento-compras.html', cta: 'Começar',
        },
        {
          icon: 'fa-ant', cor: '#9b59b6',
          title: 'Gastos Formiga 🐜',
          desc: 'Descubra para onde vão os trocados e aprenda a guardá-los!',
          href: 'rf09-gastos-formiga.html', cta: 'Descobrir',
        },
      ],
    },

    adolescente: {
      saudacao: n => `E aí, ${n}! 🔥 Qual é a missão de hoje?`,
      sub: 'Domine suas finanças. Conquiste seus sonhos.',
      dica: {
        emoji: '⚠️',
        titulo: 'Missão Urgente',
        texto: 'Uma aposta de R$50/semana vira R$2.600 no ano — perdidos. Invista no seu futuro, não no acaso.',
      },
      stats: [
        { emoji: '🔥', valor: '7', label: 'Dias seguidos' },
        { emoji: '⚡', valor: 'Rank #42', label: 'Ranking' },
        { emoji: '💰', valor: 'R$0', label: 'Guardado' },
      ],
      secao: '⚡ Suas Missões',
      cards: [
        {
          icon: 'fa-dice', cor: '#e94560',
          title: 'Simulador de Risco 🎰',
          desc: 'Descubra a diferença real entre apostar e investir — spoiler: não é o que te vendem.',
          href: 'Autenticação/rf06-simulador.html', cta: 'Jogar agora',
        },
        {
          icon: 'fa-piggy-bank', cor: '#a855f7',
          title: 'Cofre — Sua Meta',
          desc: 'Configure sua meta financeira (viagem, curso, trampo) e acompanhe o progresso.',
          href: 'rf07-cofre-magico.html', cta: 'Definir meta',
        },
        {
          icon: 'fa-ant', cor: '#3b82f6',
          title: 'Gastos Formiga 🐜',
          desc: 'R$5 por dia = R$1.825 por ano. Veja para onde seu dinheiro está escapando.',
          href: 'rf09-gastos-formiga.html', cta: 'Analisar gastos',
        },
        {
          icon: 'fa-cart-shopping', cor: '#10b981',
          title: 'Compra Consciente 🛒',
          desc: 'Aprenda a planejar compras e fazer o dinheiro render muito mais.',
          href: 'planejamento-compras.html', cta: 'Treinar',
        },
      ],
    },

    jovemAdulto: {
      saudacao: n => `Olá, ${n}. Sua jornada financeira continua.`,
      sub: 'Independência financeira em um só lugar.',
      dica: {
        emoji: '💡',
        titulo: 'Regra do Dia',
        texto: 'Regra 50/30/20: 50% para necessidades, 30% para desejos, 20% para poupança e investimentos.',
      },
      stats: [
        { emoji: '📊', valor: 'R$0', label: 'Saldo do mês' },
        { emoji: '🎯', valor: '0%', label: 'Meta cumprida' },
        { emoji: '📈', valor: '0', label: 'Trilhas concluídas' },
      ],
      secao: 'Ferramentas Financeiras',
      cards: [
        {
          icon: 'fa-ant', cor: '#3b82f6',
          title: 'Gastos Formiga',
          desc: 'Rastreie pequenas despesas recorrentes e identifique onde seu salário está indo.',
          href: 'rf09-gastos-formiga.html', cta: 'Ver gastos',
        },
        {
          icon: 'fa-wallet', cor: '#10b981',
          title: 'Controle Financeiro',
          desc: 'Registre ganhos e despesas com categorias personalizadas e metas de reserva.',
          href: 'rf10-financeiros.html', cta: 'Abrir controle',
        },
        {
          icon: 'fa-cart-shopping', cor: '#8b5cf6',
          title: 'Planejamento de Compras',
          desc: 'Simule compras domésticas e pratique consumo consciente no dia a dia.',
          href: 'planejamento-compras.html', cta: 'Planejar agora',
        },
        {
          icon: 'fa-piggy-bank', cor: '#f59e0b',
          title: 'Meta de Poupança',
          desc: 'Defina um objetivo financeiro e acompanhe o progresso do seu cofre.',
          href: 'rf07-cofre-magico.html', cta: 'Definir meta',
        },
      ],
    },

    autonomo: {
      saudacao: n => `Bem-vindo(a), ${n}.`,
      sub: 'Seus números. Sua reserva. Seu futuro.',
      dica: {
        emoji: '📋',
        titulo: 'Lembrete Financeiro',
        texto: 'Mantenha uma reserva de emergência equivalente a 6 meses de despesas fixas antes de pensar em investimentos.',
      },
      stats: [
        { emoji: '💼', valor: 'R$0', label: 'Ganhos este mês' },
        { emoji: '🏦', valor: 'R$0', label: 'Reserva de emergência' },
        { emoji: '📉', valor: 'R$0', label: 'Despesas fixas' },
      ],
      secao: 'Painel do Autônomo',
      cards: [
        {
          icon: 'fa-money-bill-wave', cor: '#334155',
          title: 'Registrar Ganhos',
          desc: 'Controle sua renda variável, despesas operacionais e separe impostos.',
          href: 'rf-financeiros.html', cta: 'Registrar',
        },
        {
          icon: 'fa-shield-halved', cor: '#f59e0b',
          title: 'Reserva de Emergência',
          desc: 'Calcule quanto você precisa guardar para cobrir períodos de baixa renda.',
          href: 'rf07-cofre-magico.html', cta: 'Calcular reserva',
        },
        {
          icon: 'fa-chart-pie', cor: '#059669',
          title: 'Relatório Financeiro',
          desc: 'Visualize gráficos de entradas, saídas e evolução do seu patrimônio.',
          href: '#', cta: 'Ver relatório',
        },
        {
          icon: 'fa-cart-shopping', cor: '#6366f1',
          title: 'Compras Domésticas',
          desc: 'Planejamento de compras para o orçamento doméstico e familiar.',
          href: 'planejamento-compras.html', cta: 'Planejar compras',
        },
      ],
    },

    educador: {
      saudacao: n => `Bom dia, Prof. ${n}.`,
      sub: 'Sua turma. Seu impacto. Sua missão educativa.',
      dica: {
        emoji: '🎓',
        titulo: 'Recurso Pedagógico',
        texto: 'Use o Simulador de Risco em sala para debater apostas vs. investimentos — conteúdo alinhado à BNCC de Educação Financeira.',
      },
      stats: [
        { emoji: '👥', valor: '0', label: 'Alunos ativos' },
        { emoji: '📚', valor: '0', label: 'Trilhas configuradas' },
        { emoji: '📊', valor: '0%', label: 'Engajamento médio' },
      ],
      secao: 'Ferramentas do Educador',
      cards: [
        {
          icon: 'fa-users', cor: '#1d4ed8',
          title: 'Painel da Turma',
          desc: 'Métricas de engajamento, desempenho por aluno e progresso nas trilhas.',
          href: 'Autenticação/rf12-painel-docente.html', cta: 'Acessar painel',
        },
        {
          icon: 'fa-route', cor: '#059669',
          title: 'Gestão de Trilhas',
          desc: 'Personalize trilhas de aprendizado para cada turma ou aluno individualmente.',
          href: 'Autenticação/rf13-gestao-trilhas.html', cta: 'Gerenciar trilhas',
        },
        {
          icon: 'fa-dice', cor: '#7c3aed',
          title: 'Simulador de Risco',
          desc: 'Atividade interativa para aulas sobre a diferença entre investimentos e apostas.',
          href: 'Autenticação/rf06-simulador.html', cta: 'Abrir simulador',
        },
        {
          icon: 'fa-cart-shopping', cor: '#0f766e',
          title: 'Módulo: Compras Conscientes',
          desc: 'Trilha sobre planejamento de compras domésticas — ideal para atividades em sala.',
          href: 'planejamento-compras.html', cta: 'Ver módulo',
        },
      ],
    },
  };

  /* ── Aplica tema ── */
  function aplicarTema(perfil) {
    const t = TEMAS[perfil] || TEMAS.jovemAdulto;
    const r = document.documentElement.style;
    r.setProperty('--theme-bg',      t.bg);
    r.setProperty('--theme-surface', t.surface);
    r.setProperty('--theme-primary', t.primary);
    r.setProperty('--theme-accent',  t.accent);
    r.setProperty('--theme-text',    t.text);
    r.setProperty('--theme-muted',   t.muted);
    r.setProperty('--theme-border',  t.border);
    r.setProperty('--theme-h1',      t.h1);
    r.setProperty('--theme-body',    t.body);
    r.setProperty('--theme-radius',  t.radius);
    r.setProperty('--theme-font',    t.font);
  }

  /* ── Renderiza dashboard ── */
  function renderDashboard(sessao) {
    const perfil  = sessao.perfil || 'jovemAdulto';
    const nome    = sessao.nome.split(' ')[0];
    const c       = CONTEUDOS[perfil] || CONTEUDOS.jovemAdulto;
    const t       = TEMAS[perfil]     || TEMAS.jovemAdulto;

    aplicarTema(perfil);

  document.getElementById('user-pill').classList.remove('is-hidden');
  document.getElementById('btn-sair').classList.remove('is-hidden');
    document.getElementById('user-icon').className = `fa-solid ${t.icon}`;
    document.getElementById('user-name').textContent = nome;

    document.getElementById('main').innerHTML = `
      <div class="welcome">
        <h1 class="welcome-greeting">${c.saudacao(nome)}</h1>
        <p class="welcome-sub">${c.sub}</p>
        <span class="perfil-tag">
          <i class="fa-solid ${t.icon}" aria-hidden="true"></i> ${t.tag}
        </span>
      </div>

      <div class="tip-banner" role="note" aria-label="Dica do dia">
        <div class="tip-emoji" aria-hidden="true">${c.dica.emoji}</div>
        <div class="tip-content">
          <h3>${c.dica.titulo}</h3>
          <p>${c.dica.texto}</p>
        </div>
      </div>

      <div class="stats-row" aria-label="Seu resumo">
        ${c.stats.map(s => `
          <div class="stat-card">
            <div class="stat-emoji" aria-hidden="true">${s.emoji}</div>
            <div class="stat-value">${s.valor}</div>
            <div class="stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <div class="cards-section">
        <h2 class="section-title">${c.secao}</h2>
        <div class="cards-grid" role="list">
          ${c.cards.map(card => `
            <a href="${card.href}" class="feature-card" role="listitem" aria-label="${card.title.replace(/[🏦🌈🛒🐜🎰⚡]/gu, '')}">
              <div class="card-icon" style="background:${card.cor}" aria-hidden="true">
                <i class="fa-solid ${card.icon}"></i>
              </div>
              <div class="card-title">${card.title}</div>
              <div class="card-desc">${card.desc}</div>
              <span class="card-cta">
                ${card.cta}
                <i class="fa-solid fa-arrow-right" style="font-size:10px" aria-hidden="true"></i>
              </span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  function sair() {
    localStorage.removeItem('monetago_sessao');
    window.location.href = 'Autenticação/rf01-login.html';
  }

  /* ── Inicialização ── */
const sessao = JSON.parse(localStorage.getItem('monetago_sessao') || 'null');
document.getElementById('btn-sair').addEventListener('click', sair);

if (sessao && sessao.nome && sessao.perfil) {
  renderDashboard(sessao);
} else {
  document.getElementById('no-session').classList.remove('is-hidden');
}
