/* ── Dados dos Produtos ── */
  const ORCAMENTO = 150;

  const PRODUTOS = {
    basics: [
      { id: 'arroz',    emoji: '🌾', nome: 'Arroz 5kg',     preco: 22, tipo: 'necessidade', smart: true,  dica: 'Arroz é base da dieta brasileira — ótima compra!' },
      { id: 'feijao',   emoji: '🫘', nome: 'Feijão 1kg',    preco:  8, tipo: 'necessidade', smart: true,  dica: 'Feijão com arroz é a combinação proteica mais econômica.' },
      { id: 'macarrao', emoji: '🍝', nome: 'Macarrão 500g', preco:  4, tipo: 'necessidade', smart: true,  dica: 'Carboidrato acessível e versátil.' },
      { id: 'oleo',     emoji: '🫙', nome: 'Óleo 900ml',    preco:  7, tipo: 'necessidade', smart: false, dica: 'Essencial para o preparo dos alimentos.' },
    ],
    proteins: [
      { id: 'frango',   emoji: '🍗', nome: 'Frango 1kg',    preco: 16, tipo: 'necessidade', smart: true,  dica: 'Proteína de alto valor nutritivo e menor custo.' },
      { id: 'ovos',     emoji: '🥚', nome: 'Ovos (dúzia)',  preco: 13, tipo: 'necessidade', smart: true,  dica: 'Proteína completa pelo menor preço.' },
      { id: 'atum',     emoji: '🐟', nome: 'Atum 170g',     preco:  7, tipo: 'necessidade', smart: false, dica: 'Boa fonte de proteína em conserva.' },
      { id: 'carne',    emoji: '🥩', nome: 'Carne moída 500g', preco: 20, tipo: 'necessidade', smart: false, dica: 'Proteína versátil — verifique promoções.' },
    ],
    veggies: [
      { id: 'banana',   emoji: '🍌', nome: 'Banana 1kg',    preco:  5, tipo: 'necessidade', smart: true,  dica: 'Fruta nutritiva e uma das mais baratas.' },
      { id: 'tomate',   emoji: '🍅', nome: 'Tomate 1kg',    preco:  7, tipo: 'necessidade', smart: false, dica: 'Rico em vitaminas — consumir na época certa é mais barato.' },
      { id: 'alface',   emoji: '🥬', nome: 'Alface un.',    preco:  4, tipo: 'necessidade', smart: true,  dica: 'Hortaliça acessível e muito nutritiva.' },
      { id: 'cenoura',  emoji: '🥕', nome: 'Cenoura 1kg',   preco:  4, tipo: 'necessidade', smart: true,  dica: 'Versátil, barata e de ótimo valor nutricional.' },
    ],
    extras: [
      { id: 'biscoito', emoji: '🍪', nome: 'Biscoito recheado', preco:  6, tipo: 'desejo', smart: false, dica: 'Guloseima — pode ser cortada se o orçamento apertar.' },
      { id: 'refri',    emoji: '🥤', nome: 'Refrigerante 2L',   preco:  9, tipo: 'desejo', smart: false, dica: 'Alto em açúcar e custo — água é sempre melhor.' },
      { id: 'sorvete',  emoji: '🍦', nome: 'Sorvete 1,5L',      preco: 14, tipo: 'desejo', smart: false, dica: 'Item extra — considere como recompensa pontual.' },
      { id: 'salgado',  emoji: '🥨', nome: 'Salgadinho 100g',   preco:  5, tipo: 'desejo', smart: false, dica: 'Poucos nutrientes e alto custo por grama.' },
      { id: 'choco',    emoji: '🍫', nome: 'Chocolate 170g',    preco:  8, tipo: 'desejo', smart: false, dica: 'Desejo — tudo bem de vez em quando, com planejamento.' },
    ],
  };

  /* ── Trilha de aprendizado ── */
  const TRILHA = [
    { id: 1, titulo: 'Monte sua lista antes de ir', desc: 'Liste o que realmente precisa. Evita compras por impulso.' },
    { id: 2, titulo: 'Separe necessidades de desejos', desc: 'Priorize alimentos essenciais. Extras ficam para o fim.' },
    { id: 3, titulo: 'Respeite o orçamento', desc: 'Defina um valor máximo e não ultrapasse — sem exceções.' },
    { id: 4, titulo: 'Compare preços por unidade', desc: 'Calcule o preço por kg ou litro para comparar de verdade.' },
    { id: 5, titulo: 'Revise antes de fechar', desc: 'Analise o carrinho: tem algo desnecessário? Troque ou retire.' },
  ];

  /* ── Estado ── */
  let carrinho = {};
  let trilhaAtual = 1;

  /* ── Renderiza produtos ── */
  function criarProduto(p) {
    const div = document.createElement('div');
    div.className = `product-item${p.smart ? ' highlight-economy' : ''}`;
    div.id = `prod-${p.id}`;
    div.setAttribute('role', 'article');
    div.setAttribute('aria-label', `${p.nome} — R$${p.preco.toFixed(2)}`);
    div.innerHTML = `
      <div class="prod-icon" aria-hidden="true">${p.emoji}</div>
      <div class="prod-info">
        <strong>${p.nome}</strong><br>
        R$${p.preco.toFixed(2)}<br>
        <em class="product-type product-type-${p.tipo}">${p.tipo}</em>
        ${p.smart ? '<br><span class="product-smart">🟢 melhor escolha</span>' : ''}
      </div>
      <button class="add-btn" data-produto-id="${p.id}" aria-label="${p.smart?'Melhor escolha: ':''}${p.nome} R$${p.preco.toFixed(2)}">
        + Adicionar
      </button>
    `;
    return div;
  }

  function renderPrateleiras() {
    ['basics', 'proteins', 'veggies', 'extras'].forEach(shelf => {
      const container = document.getElementById(`shelf-${shelf}`);
      container.innerHTML = '';
      PRODUTOS[shelf].forEach(p => container.appendChild(criarProduto(p)));
    });
  }

  /* ── Trilha ── */
  function renderTrilha() {
    const lista = document.getElementById('trail-list');
    lista.innerHTML = '';
    TRILHA.forEach(t => {
      const li = document.createElement('li');
      li.className = `trail-step${t.id < trilhaAtual ? ' done' : t.id === trilhaAtual ? ' active' : ''}`;
      li.innerHTML = `
        <div class="trail-num">${t.id < trilhaAtual ? '<i class="fa-solid fa-check trail-check-icon"></i>' : t.id}</div>
        <div class="trail-step-text"><strong>${t.titulo}</strong><br>${t.desc}</div>
      `;
      lista.appendChild(li);
    });
    document.getElementById('trail-progress-label').textContent = `${Math.min(trilhaAtual - 1, 5)}/5 etapas`;

    if (trilhaAtual <= TRILHA.length) {
      const atual = TRILHA[trilhaAtual - 1];
      document.getElementById('current-tip').innerHTML =
        `<strong>📖 Passo ${atual.id}:</strong> ${atual.titulo} — ${atual.desc}`;
    }
  }

  /* ── Toggle produto ── */
  function toggleItem(id) {
    const p = todosOsProdutos().find(x => x.id === id);
    if (!p) return;

    if (carrinho[id]) {
      delete carrinho[id];
    } else {
      carrinho[id] = p;
    }

    atualizarUI();
    avancarTrilha();
  }

  function avancarTrilha() {
    const total     = Object.keys(carrinho).length;
    const necessidades = Object.values(carrinho).filter(p => p.tipo === 'necessidade').length;
    const gastando  = calcTotal();

    if (total >= 1  && trilhaAtual < 2) trilhaAtual = 2;
    if (necessidades >= 2 && trilhaAtual < 3) trilhaAtual = 3;
    if (gastando > 0 && trilhaAtual < 4) trilhaAtual = 4;
    if (total >= 3  && trilhaAtual < 5) trilhaAtual = 5;

    renderTrilha();
  }

  /* ── Cálculos ── */
  function todosOsProdutos() {
    return [...PRODUTOS.basics, ...PRODUTOS.proteins, ...PRODUTOS.veggies, ...PRODUTOS.extras];
  }

  function calcTotal() {
    return Object.values(carrinho).reduce((s, p) => s + p.preco, 0);
  }

  /* ── Atualizar UI ── */
  function atualizarUI() {
    const total       = calcTotal();
    const qtd         = Object.keys(carrinho).length;
    const necessidades = Object.values(carrinho).filter(p => p.tipo === 'necessidade').length;
    const extras      = Object.values(carrinho).filter(p => p.tipo === 'desejo').length;
    const sobra       = ORCAMENTO - total;
    const pct         = Math.min((total / ORCAMENTO) * 100, 100);

    /* Cabeçalho */
    document.getElementById('header-budget-status').textContent =
      sobra >= 0 ? `R$${sobra.toFixed(2)} disponíveis` : `R$${Math.abs(sobra).toFixed(2)} acima do limite`;

    /* Carrinho sidebar */
    document.getElementById('cart-count').textContent = `${qtd} ${qtd === 1 ? 'item' : 'itens'}`;
    document.getElementById('cart-subtitle').textContent =
      qtd === 0 ? 'Adicione produtos nas prateleiras' : `${necessidades} essenciais · ${extras} extras`;

    /* Barra orçamento */
    const fill  = document.getElementById('budget-fill');
    const barWr = document.getElementById('budget-bar-wrap');
    fill.style.width = `${pct}%`;
    fill.classList.toggle('over', total > ORCAMENTO);
    barWr.setAttribute('aria-valuenow', Math.round(pct));

    const statusLabel = document.getElementById('budget-status-label');
    if (total > ORCAMENTO) {
      statusLabel.textContent = '⚠️ Acima do orçamento!';
      statusLabel.className   = 'budget-warn';
    } else if (pct >= 85) {
      statusLabel.textContent = '⚡ Quase no limite';
      statusLabel.className   = 'budget-warn';
    } else {
      statusLabel.textContent = '✅ Dentro do orçamento';
      statusLabel.className   = 'budget-ok';
    }

    /* Lista do carrinho */
    const lista = document.getElementById('cart-list');
    lista.innerHTML = '';
    if (qtd === 0) {
      lista.innerHTML = '<li class="empty-cart-message">Nenhum item adicionado ainda</li>';
    } else {
      Object.values(carrinho).forEach(p => {
        const li = document.createElement('li');
        li.title = 'Clique para remover';
        li.setAttribute('role', 'button');
        li.setAttribute('aria-label', `Remover ${p.nome}`);
        li.setAttribute('tabindex', '0');
        li.innerHTML = `
          <span>${p.emoji}</span>
          <span class="cart-item-name">${p.nome}</span>
          <span class="value cart-item-value ${p.tipo === 'necessidade' ? 'need' : 'want'}">
            R$${p.preco.toFixed(2)}
          </span>
        `;
        li.onclick   = () => toggleItem(p.id);
        li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(p.id); } };
        lista.appendChild(li);
      });
    }

    /* Total */
    const cartTotalEl = document.getElementById('cart-total');
    cartTotalEl.textContent = `R$${total.toFixed(2)}`;
    cartTotalEl.classList.toggle('cart-total-over', total > ORCAMENTO);
    cartTotalEl.classList.toggle('cart-total-ok', total <= ORCAMENTO);

    /* Botões dos produtos */
    todosOsProdutos().forEach(p => {
      const el  = document.getElementById(`prod-${p.id}`);
      const btn = el?.querySelector('.add-btn');
      if (!el || !btn) return;
      if (carrinho[p.id]) {
        el.classList.add('in-cart');
        btn.textContent = '✓ Adicionado';
      } else {
        el.classList.remove('in-cart');
        btn.textContent = '+ Adicionar';
      }
    });

    /* Feedback */
    const score = calcScore(necessidades, extras, total);
    document.getElementById('metric-necessidades').textContent = necessidades;
    document.getElementById('metric-extras').textContent       = extras;

    const economiaEl = document.getElementById('metric-economia');
    economiaEl.textContent = sobra >= 0 ? `+R$${sobra.toFixed(2)}` : `-R$${Math.abs(sobra).toFixed(2)}`;
    economiaEl.className   = sobra >= 0 ? '' : 'txt-warn';
    document.getElementById('metric-economia-label').textContent = sobra >= 0 ? 'sobra de orçamento' : 'excede orçamento';

    document.getElementById('feedback-score-label').textContent = `Pontuação de consumo consciente: ${score}%`;
    const feedbackBar = document.getElementById('feedback-bar');
    feedbackBar.style.width = `${score}%`;
    feedbackBar.classList.remove('score-high', 'score-mid', 'score-low');
    feedbackBar.classList.add(score >= 70 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low');

    const badge = document.getElementById('feedback-badge');
    if (qtd === 0) {
      badge.textContent = '';
    } else if (score >= 80) {
      badge.textContent = '🏆 Excelente escolha!';
    } else if (score >= 50) {
      badge.textContent = '👍 Bom planejamento';
    } else {
      badge.textContent = '💡 Pode melhorar';
    }
  }

  function calcScore(necessidades, extras, total) {
    if (necessidades + extras === 0) return 0;
    let score = 0;
    const ratioNecessidades = necessidades / (necessidades + extras);
    score += ratioNecessidades * 60;
    if (total <= ORCAMENTO) score += 30;
    else score += Math.max(0, 30 - ((total - ORCAMENTO) / ORCAMENTO) * 100);
    const smarts = Object.values(carrinho).filter(p => p.smart).length;
    score += Math.min(10, smarts * 2.5);
    return Math.round(Math.min(100, score));
  }

  /* ── Finalizar ── */
  function finalizarCompra() {
    trilhaAtual = 6;
    renderTrilha();

    const total        = calcTotal();
    const necessidades = Object.values(carrinho).filter(p => p.tipo === 'necessidade').length;
    const extras       = Object.values(carrinho).filter(p => p.tipo === 'desejo').length;
    const sobra        = ORCAMENTO - total;
    const score        = calcScore(necessidades, extras, total);

    const scoreEl = document.getElementById('modal-score');
    scoreEl.textContent = `${score}%`;
    scoreEl.className   = `modal-score ${score >= 80 ? 'score-excelente' : score >= 50 ? 'score-bom' : 'score-regular'}`;

    const msgs = [
      score >= 80 ? '🏆 Parabéns! Você planejou muito bem sua compra — priorizou o essencial e respeitou o orçamento.' :
      score >= 50 ? '👍 Boa compra! Ainda dá para melhorar priorizando mais itens essenciais.' :
                    '💡 Você pode melhorar! Foque nos alimentos básicos e respeite o orçamento.',
    ];
    document.getElementById('modal-msg').textContent = msgs[0];

    const itensDiv = document.getElementById('modal-items');
    itensDiv.innerHTML = '';
    if (Object.keys(carrinho).length === 0) {
      itensDiv.innerHTML = '<p class="modal-item modal-item-muted">Nenhum item adicionado.</p>';
    } else {
      Object.values(carrinho).forEach(p => {
        const div = document.createElement('div');
        div.className = `modal-item ${p.tipo === 'necessidade' ? 'good' : 'bad'}`;
        div.textContent = `${p.emoji} ${p.nome} — R$${p.preco.toFixed(2)} (${p.tipo})`;
        itensDiv.appendChild(div);
      });
      const totalDiv = document.createElement('div');
      totalDiv.className = 'modal-item modal-total-line';
      totalDiv.innerHTML = `Total: R$${total.toFixed(2)} ${sobra >= 0 ? `(sobrou R$${sobra.toFixed(2)})` : `(ultrapassou R$${Math.abs(sobra).toFixed(2)})`}`;
      itensDiv.appendChild(totalDiv);
    }

    const licoes = [];
    if (extras > necessidades) licoes.push({ tipo: 'bad', texto: 'Você comprou mais guloseimas do que alimentos essenciais.' });
    if (total > ORCAMENTO)    licoes.push({ tipo: 'bad', texto: 'O total ultrapassou o orçamento de R$150,00.' });
    if (necessidades >= 3)    licoes.push({ tipo: 'good', texto: 'Ótimo: você priorizou alimentos essenciais!' });
    if (sobra > 0)            licoes.push({ tipo: 'good', texto: `Você economizou R$${sobra.toFixed(2)} — pode guardar no cofre!` });
    if (Object.values(carrinho).filter(p => p.smart).length >= 2)
      licoes.push({ tipo: 'good', texto: 'Você escolheu produtos com melhor custo-benefício 🟢.' });
    if (licoes.length === 0)  licoes.push({ tipo: 'good', texto: 'Continue praticando para melhorar seu planejamento.' });

    const licoesDiv = document.getElementById('modal-lessons');
    licoesDiv.innerHTML = '';
    licoes.forEach(l => {
      const div = document.createElement('div');
      div.className = `modal-item ${l.tipo}`;
      div.textContent = l.texto;
      licoesDiv.appendChild(div);
    });

    document.getElementById('modal').classList.add('show');
    document.getElementById('modal').querySelector('.modal-box').focus?.();
  }

  function fecharModal() {
    document.getElementById('modal').classList.remove('show');
  }

  function recomecarModal() {
    fecharModal();
    resetarCompra();
  }

  function resetarCompra() {
    carrinho = {};
    trilhaAtual = 1;
    atualizarUI();
    renderTrilha();
  }

  function mostrarAjuda() {
    alert('Simulador de Planejamento de Compras\n\n1. Você tem um orçamento de R$150,00 para a semana.\n2. Adicione produtos às prateleiras clicando em "+ Adicionar".\n3. Clique em um item no carrinho para removê-lo.\n4. Tente priorizar alimentos essenciais (marcados em verde).\n5. Clique em "Finalizar Compra" para ver sua pontuação.');
  }

  /* ── Inicialização ── */
  function configurarEventos() {
    document.getElementById('btn-ajuda')?.addEventListener('click', mostrarAjuda);
    document.getElementById('btn-resetar')?.addEventListener('click', resetarCompra);
    document.getElementById('btn-finalizar')?.addEventListener('click', finalizarCompra);
    document.getElementById('btn-recomecar-modal')?.addEventListener('click', recomecarModal);
    document.getElementById('btn-fechar-modal')?.addEventListener('click', fecharModal);

    document.addEventListener('click', event => {
      const addButton = event.target.closest('.add-btn[data-produto-id]');
      if (addButton) toggleItem(addButton.dataset.produtoId);
    });
  }

  configurarEventos();
  renderPrateleiras();
  renderTrilha();
  atualizarUI();
