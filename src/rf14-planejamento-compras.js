/* ── Dados dos Produtos ── */
const ORCAMENTO = 150;
const formatarMoeda = valor => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(valor);

const PRODUTOS = {
  basics: [
    { id: 'arroz', emoji: '🌾', nome: 'Arroz 5kg', preco: 22, tipo: 'necessidade', smart: true, dica: 'Base da dieta brasileira e rende várias refeições.' },
    { id: 'feijao', emoji: '🫘', nome: 'Feijão 1kg', preco: 8, tipo: 'necessidade', smart: true, dica: 'Boa proteína vegetal e combina com arroz.' },
    { id: 'macarrao', emoji: '🍝', nome: 'Macarrão 500g', preco: 4, tipo: 'necessidade', smart: true, dica: 'Carboidrato acessível para refeições rápidas.' },
    { id: 'oleo', emoji: '🫙', nome: 'Óleo 900ml', preco: 7, tipo: 'necessidade', smart: false, dica: 'Essencial no preparo, mas vale comparar marcas.' },
  ],
  proteins: [
    { id: 'frango', emoji: '🍗', nome: 'Frango 1kg', preco: 16, tipo: 'necessidade', smart: true, dica: 'Proteína nutritiva com bom custo por porção.' },
    { id: 'ovos', emoji: '🥚', nome: 'Ovos (dúzia)', preco: 13, tipo: 'necessidade', smart: true, dica: 'Proteína completa, versátil e econômica.' },
    { id: 'atum', emoji: '🐟', nome: 'Atum 170g', preco: 7, tipo: 'necessidade', smart: false, dica: 'Prático, mas pode pesar se comprado toda semana.' },
    { id: 'carne', emoji: '🥩', nome: 'Carne moída 500g', preco: 20, tipo: 'necessidade', smart: false, dica: 'Boa opção quando há promoção ou preparo planejado.' },
  ],
  veggies: [
    { id: 'banana', emoji: '🍌', nome: 'Banana 1kg', preco: 5, tipo: 'necessidade', smart: true, dica: 'Fruta barata, nutritiva e fácil de levar.' },
    { id: 'tomate', emoji: '🍅', nome: 'Tomate 1kg', preco: 7, tipo: 'necessidade', smart: false, dica: 'Compre na época certa para pagar menos.' },
    { id: 'alface', emoji: '🥬', nome: 'Alface un.', preco: 4, tipo: 'necessidade', smart: true, dica: 'Hortaliça acessível para complementar refeições.' },
    { id: 'cenoura', emoji: '🥕', nome: 'Cenoura 1kg', preco: 4, tipo: 'necessidade', smart: true, dica: 'Barata, versátil e dura bem na geladeira.' },
  ],
  extras: [
    { id: 'biscoito', emoji: '🍪', nome: 'Biscoito recheado', preco: 6, tipo: 'desejo', smart: false, dica: 'Pode entrar como extra se ainda houver orçamento.' },
    { id: 'refri', emoji: '🥤', nome: 'Refrigerante 2L', preco: 9, tipo: 'desejo', smart: false, dica: 'Desejo com baixo valor nutritivo; planeje a frequência.' },
    { id: 'sorvete', emoji: '🍦', nome: 'Sorvete 1,5L', preco: 14, tipo: 'desejo', smart: false, dica: 'Boa recompensa pontual, mas não deve vir antes do essencial.' },
    { id: 'salgado', emoji: '🥨', nome: 'Salgadinho 100g', preco: 5, tipo: 'desejo', smart: false, dica: 'Alto custo por grama e pouco nutritivo.' },
    { id: 'choco', emoji: '🍫', nome: 'Chocolate 170g', preco: 8, tipo: 'desejo', smart: false, dica: 'Tudo bem comprar às vezes, desde que caiba no plano.' },
  ],
};

/* ── Trilha de aprendizado: atende ao RF-14 ── */
const TRILHA = [
  { id: 1, titulo: 'Monte sua lista antes de ir', desc: 'Liste o que realmente precisa para evitar compras por impulso.' },
  { id: 2, titulo: 'Separe necessidades de desejos', desc: 'Priorize alimentos essenciais e deixe extras para o fim.' },
  { id: 3, titulo: 'Respeite o orçamento', desc: 'Defina um valor máximo e acompanhe o total a cada escolha.' },
  { id: 4, titulo: 'Compare custo-benefício', desc: 'Observe rendimento, porções e preço antes de decidir.' },
  { id: 5, titulo: 'Revise antes de fechar', desc: 'Retire o que não é necessário e confira se sobrou dinheiro.' },
];

let carrinho = {};
let trilhaAtual = 1;

function todosOsProdutos() {
  return [...PRODUTOS.basics, ...PRODUTOS.proteins, ...PRODUTOS.veggies, ...PRODUTOS.extras];
}

function criarProduto(produto) {
  const div = document.createElement('div');
  div.className = `product-item${produto.smart ? ' highlight-economy' : ''}`;
  div.id = `prod-${produto.id}`;
  div.setAttribute('role', 'article');
  div.setAttribute('aria-label', `${produto.nome} - ${formatarMoeda(produto.preco)}`);
  div.innerHTML = `
    <div class="prod-icon" aria-hidden="true">${produto.emoji}</div>
    <div class="prod-info">
      <strong>${produto.nome}</strong>
      <span>${formatarMoeda(produto.preco)}</span>
      <em class="product-type product-type-${produto.tipo}">${produto.tipo}</em>
      ${produto.smart ? '<span class="product-smart">Melhor custo-benefício</span>' : ''}
    </div>
    <p class="product-tip">${produto.dica}</p>
    <button class="add-btn" data-produto-id="${produto.id}" aria-label="Adicionar ${produto.nome}">
      <i class="fa-solid fa-plus" aria-hidden="true"></i>
      Adicionar
    </button>
  `;
  return div;
}

function renderPrateleiras() {
  ['basics', 'proteins', 'veggies', 'extras'].forEach(shelf => {
    const container = document.getElementById(`shelf-${shelf}`);
    container.innerHTML = '';
    PRODUTOS[shelf].forEach(produto => container.appendChild(criarProduto(produto)));
  });
}

function renderTrilha() {
  const lista = document.getElementById('trail-list');
  lista.innerHTML = '';

  TRILHA.forEach(etapa => {
    const li = document.createElement('li');
    li.className = `trail-step${etapa.id < trilhaAtual ? ' done' : etapa.id === trilhaAtual ? ' active' : ''}`;
    li.innerHTML = `
      <div class="trail-num">${etapa.id < trilhaAtual ? '<i class="fa-solid fa-check trail-check-icon" aria-hidden="true"></i>' : etapa.id}</div>
      <div class="trail-step-text"><strong>${etapa.titulo}</strong><br>${etapa.desc}</div>
    `;
    lista.appendChild(li);
  });

  document.getElementById('trail-progress-label').textContent = `${Math.min(trilhaAtual - 1, TRILHA.length)}/${TRILHA.length} etapas`;

  if (trilhaAtual <= TRILHA.length) {
    const atual = TRILHA[trilhaAtual - 1];
    document.getElementById('current-tip').innerHTML =
      `<strong>📖 Passo ${atual.id}:</strong> ${atual.titulo} - ${atual.desc}`;
  } else {
    document.getElementById('current-tip').innerHTML =
      '<strong>✅ Trilha concluída:</strong> revise o carrinho, veja sua pontuação e pense no que poderia melhorar na próxima compra.';
  }
}

function calcTotal() {
  return Object.values(carrinho).reduce((soma, produto) => soma + produto.preco, 0);
}

function toggleItem(id) {
  const produto = todosOsProdutos().find(item => item.id === id);
  if (!produto) return;

  if (carrinho[id]) {
    delete carrinho[id];
  } else {
    carrinho[id] = produto;
  }

  atualizarUI();
  avancarTrilha();
}

function avancarTrilha() {
  const totalItens = Object.keys(carrinho).length;
  const necessidades = Object.values(carrinho).filter(produto => produto.tipo === 'necessidade').length;
  const totalCompra = calcTotal();

  if (totalItens >= 1 && trilhaAtual < 2) trilhaAtual = 2;
  if (necessidades >= 2 && trilhaAtual < 3) trilhaAtual = 3;
  if (totalCompra > 0 && trilhaAtual < 4) trilhaAtual = 4;
  if (totalItens >= 4 && trilhaAtual < 5) trilhaAtual = 5;

  renderTrilha();
}

function calcScore(necessidades, extras, total) {
  const totalItens = necessidades + extras;
  if (totalItens === 0) return 0;

  let score = 0;
  score += (necessidades / totalItens) * 60;
  score += total <= ORCAMENTO ? 30 : Math.max(0, 30 - ((total - ORCAMENTO) / ORCAMENTO) * 100);
  score += Math.min(10, Object.values(carrinho).filter(produto => produto.smart).length * 2.5);

  return Math.round(Math.min(100, score));
}

function atualizarUI() {
  const total = calcTotal();
  const qtd = Object.keys(carrinho).length;
  const necessidades = Object.values(carrinho).filter(produto => produto.tipo === 'necessidade').length;
  const extras = Object.values(carrinho).filter(produto => produto.tipo === 'desejo').length;
  const sobra = ORCAMENTO - total;
  const pct = Math.min((total / ORCAMENTO) * 100, 100);

  document.getElementById('header-budget-status').textContent =
    sobra >= 0 ? `${formatarMoeda(sobra)} disponíveis` : `${formatarMoeda(Math.abs(sobra))} acima do limite`;

  document.getElementById('cart-count').textContent = `${qtd} ${qtd === 1 ? 'item' : 'itens'}`;
  document.getElementById('cart-subtitle').textContent =
    qtd === 0 ? 'Adicione produtos nas prateleiras' : `${necessidades} essenciais · ${extras} extras`;

  const fill = document.getElementById('budget-fill');
  const barWrap = document.getElementById('budget-bar-wrap');
  fill.style.width = `${pct}%`;
  fill.classList.toggle('over', total > ORCAMENTO);
  barWrap.setAttribute('aria-valuenow', Math.round(pct));

  const statusLabel = document.getElementById('budget-status-label');
  if (total > ORCAMENTO) {
    statusLabel.textContent = 'Acima do orçamento';
    statusLabel.className = 'budget-warn';
  } else if (pct >= 85) {
    statusLabel.textContent = 'Quase no limite';
    statusLabel.className = 'budget-warn';
  } else {
    statusLabel.textContent = 'Dentro do orçamento';
    statusLabel.className = 'budget-ok';
  }

  const lista = document.getElementById('cart-list');
  lista.innerHTML = '';
  if (qtd === 0) {
    lista.innerHTML = '<li class="empty-cart-message">Nenhum item adicionado ainda</li>';
  } else {
    Object.values(carrinho).forEach(produto => {
      const li = document.createElement('li');
      li.title = 'Clique para remover';
      li.setAttribute('role', 'button');
      li.setAttribute('aria-label', `Remover ${produto.nome}`);
      li.setAttribute('tabindex', '0');
      li.innerHTML = `
        <span aria-hidden="true">${produto.emoji}</span>
        <span class="cart-item-name">${produto.nome}</span>
        <span class="value cart-item-value ${produto.tipo === 'necessidade' ? 'need' : 'want'}">
          ${formatarMoeda(produto.preco)}
        </span>
      `;
      li.onclick = () => toggleItem(produto.id);
      li.onkeydown = event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleItem(produto.id);
        }
      };
      lista.appendChild(li);
    });
  }

  const cartTotalEl = document.getElementById('cart-total');
  cartTotalEl.textContent = formatarMoeda(total);
  cartTotalEl.classList.toggle('cart-total-over', total > ORCAMENTO);
  cartTotalEl.classList.toggle('cart-total-ok', total <= ORCAMENTO);

  todosOsProdutos().forEach(produto => {
    const el = document.getElementById(`prod-${produto.id}`);
    const btn = el?.querySelector('.add-btn');
    if (!el || !btn) return;

    if (carrinho[produto.id]) {
      el.classList.add('in-cart');
      btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Adicionado';
      btn.setAttribute('aria-label', `Remover ${produto.nome} do carrinho`);
    } else {
      el.classList.remove('in-cart');
      btn.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i> Adicionar';
      btn.setAttribute('aria-label', `Adicionar ${produto.nome}`);
    }
  });

  const score = calcScore(necessidades, extras, total);
  document.getElementById('metric-necessidades').textContent = necessidades;
  document.getElementById('metric-extras').textContent = extras;

  const economiaEl = document.getElementById('metric-economia');
  economiaEl.textContent = sobra >= 0 ? `+${formatarMoeda(sobra)}` : `-${formatarMoeda(Math.abs(sobra))}`;
  economiaEl.className = sobra >= 0 ? '' : 'txt-warn';
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
    badge.textContent = 'Excelente escolha';
  } else if (score >= 50) {
    badge.textContent = 'Bom planejamento';
  } else {
    badge.textContent = 'Pode melhorar';
  }
}

function finalizarCompra() {
  trilhaAtual = 6;
  renderTrilha();

  const total = calcTotal();
  const necessidades = Object.values(carrinho).filter(produto => produto.tipo === 'necessidade').length;
  const extras = Object.values(carrinho).filter(produto => produto.tipo === 'desejo').length;
  const sobra = ORCAMENTO - total;
  const score = calcScore(necessidades, extras, total);

  const scoreEl = document.getElementById('modal-score');
  scoreEl.textContent = `${score}%`;
  scoreEl.className = `modal-score ${score >= 80 ? 'score-excelente' : score >= 50 ? 'score-bom' : 'score-regular'}`;

  document.getElementById('modal-msg').textContent =
    score >= 80
      ? 'Parabéns! Você priorizou o essencial, respeitou o orçamento e fez escolhas conscientes.'
      : score >= 50
        ? 'Boa compra. Ainda dá para melhorar priorizando mais itens essenciais e comparando custo-benefício.'
        : 'Você pode melhorar. Comece pelos alimentos básicos, controle os extras e respeite o orçamento.';

  const itensDiv = document.getElementById('modal-items');
  itensDiv.innerHTML = '';
  if (Object.keys(carrinho).length === 0) {
    itensDiv.innerHTML = '<p class="modal-item modal-item-muted">Nenhum item adicionado.</p>';
  } else {
    Object.values(carrinho).forEach(produto => {
      const div = document.createElement('div');
      div.className = `modal-item ${produto.tipo === 'necessidade' ? 'good' : 'bad'}`;
      div.textContent = `${produto.emoji} ${produto.nome} - ${formatarMoeda(produto.preco)} (${produto.tipo})`;
      itensDiv.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'modal-item modal-total-line';
    totalDiv.textContent = `Total: ${formatarMoeda(total)} ${sobra >= 0 ? `(sobrou ${formatarMoeda(sobra)})` : `(ultrapassou ${formatarMoeda(Math.abs(sobra))})`}`;
    itensDiv.appendChild(totalDiv);
  }

  const licoes = [];
  if (extras > necessidades) licoes.push({ tipo: 'bad', texto: 'Você colocou mais extras do que itens essenciais no carrinho.' });
  if (total > ORCAMENTO) licoes.push({ tipo: 'bad', texto: `O total ultrapassou o orçamento de ${formatarMoeda(ORCAMENTO)}.` });
  if (necessidades >= 3) licoes.push({ tipo: 'good', texto: 'Ótimo: você priorizou alimentos essenciais.' });
  if (sobra > 0) licoes.push({ tipo: 'good', texto: `Você economizou ${formatarMoeda(sobra)} e pode guardar esse valor no cofre.` });
  if (Object.values(carrinho).filter(produto => produto.smart).length >= 2) {
    licoes.push({ tipo: 'good', texto: 'Você escolheu produtos com melhor custo-benefício.' });
  }
  if (licoes.length === 0) licoes.push({ tipo: 'good', texto: 'Continue praticando para melhorar seu planejamento.' });

  const licoesDiv = document.getElementById('modal-lessons');
  licoesDiv.innerHTML = '';
  licoes.forEach(licao => {
    const div = document.createElement('div');
    div.className = `modal-item ${licao.tipo}`;
    div.textContent = licao.texto;
    licoesDiv.appendChild(div);
  });

  document.getElementById('modal').classList.add('show');
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
  alert(`Simulador de Planejamento de Compras\n\n1. Você tem um orçamento de ${formatarMoeda(ORCAMENTO)} para a semana.\n2. Adicione produtos às prateleiras.\n3. Clique em um item no carrinho para removê-lo.\n4. Priorize itens essenciais e boas escolhas de custo-benefício.\n5. Finalize a compra para ver sua pontuação.`);
}

function configurarEventos() {
  document.getElementById('btn-ajuda')?.addEventListener('click', mostrarAjuda);
  document.getElementById('btn-resetar')?.addEventListener('click', resetarCompra);
  document.getElementById('btn-finalizar')?.addEventListener('click', finalizarCompra);
  document.getElementById('btn-recomecar-modal')?.addEventListener('click', recomecarModal);
  document.getElementById('btn-fechar-modal')?.addEventListener('click', fecharModal);

  document.addEventListener('click', event => {
    const addButton = event.target.closest('.add-btn[data-produto-id]');
    if (addButton) toggleItem(addButton.dataset.produtoId);

    if (event.target === document.getElementById('modal')) {
      fecharModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') fecharModal();
  });
}

configurarEventos();
renderPrateleiras();
renderTrilha();
atualizarUI();
