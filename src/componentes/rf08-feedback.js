/**
 * RF-08 — Feedback Contextual Imediato
 * Moneta Go · Frontend-only, sem dependências externas.
 *
 * API pública:
 *   mostrarFeedback(contexto, dados?)  → Promise<void>
 *
 * Contextos disponíveis:
 *   'quiz_correto' | 'quiz_errado' | 'nivel_up' | 'trilha_concluida'
 *   'poupanca' | 'meta_atingida' | 'transacao' | 'cadastro'
 *
 * dados (todos opcionais):
 *   { valor, pontos, nivel, nome }
 *
 * Exemplo de uso em outro RF:
 *   <script src="rf08-feedback.js"></script>
 *   <script>
 *     mostrarFeedback('quiz_correto');
 *     mostrarFeedback('poupanca', { valor: 50 });
 *     mostrarFeedback('nivel_up', { nivel: 5, pontos: 200 });
 *   </script>
 */

(function (global) {
  'use strict';

  // ── CSS injetado uma única vez ────────────────────────────────────────────
  function _injetarCSS() {
    if (document.getElementById('mg-fb-style')) return;
    const s = document.createElement('style');
    s.id = 'mg-fb-style';
    s.textContent = `
      /* ── Toast stack ── */
      #mg-toast-stack {
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9000;
        display: flex;
        flex-direction: column-reverse;
        gap: 10px;
        pointer-events: none;
        width: min(400px, 92vw);
      }
      .mg-toast {
        pointer-events: all;
        background: #ffffff;
        border-radius: 14px;
        padding: 16px 18px;
        box-shadow: 0 8px 28px rgba(44,62,80,0.16);
        display: flex;
        align-items: flex-start;
        gap: 12px;
        border-left: 5px solid var(--mg-accent, #2ECC71);
        animation: mg-slide-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        position: relative;
        overflow: hidden;
      }
      .mg-toast.mg-saindo {
        animation: mg-slide-down 0.28s ease forwards;
      }
      @keyframes mg-slide-up {
        from { opacity: 0; transform: translateY(28px) scale(0.94); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes mg-slide-down {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to   { opacity: 0; transform: translateY(28px) scale(0.94); }
      }
      .mg-toast-icone {
        font-size: 26px;
        line-height: 1;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .mg-toast-corpo { flex: 1; min-width: 0; }
      .mg-toast-titulo {
        font-weight: 700;
        font-size: 14px;
        color: #2C3E50;
        margin-bottom: 3px;
        line-height: 1.3;
      }
      .mg-toast-msg {
        font-size: 13px;
        color: #555e6c;
        line-height: 1.45;
      }
      .mg-toast-fechar {
        background: none;
        border: none;
        cursor: pointer;
        color: #b0b8c1;
        font-size: 15px;
        padding: 0 0 0 6px;
        flex-shrink: 0;
        line-height: 1;
        transition: color 0.15s;
      }
      .mg-toast-fechar:hover { color: #2C3E50; }
      .mg-timer-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: var(--mg-accent, #2ECC71);
        opacity: 0.55;
        border-radius: 0 0 14px 14px;
        animation: mg-encolher var(--mg-dur, 4s) linear forwards;
      }
      @keyframes mg-encolher {
        from { width: 100%; }
        to   { width: 0%; }
      }

      /* ── Modal overlay ── */
      .mg-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(44,62,80,0.72);
        z-index: 9100;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: mg-fade-in 0.22s ease both;
      }
      @keyframes mg-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      .mg-modal {
        background: #ffffff;
        border-radius: 22px;
        padding: 44px 36px 32px;
        width: min(420px, 92vw);
        text-align: center;
        box-shadow: 0 24px 64px rgba(44,62,80,0.28);
        animation: mg-pop 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        position: relative;
        overflow: hidden;
      }
      @keyframes mg-pop {
        from { opacity: 0; transform: scale(0.65); }
        to   { opacity: 1; transform: scale(1); }
      }
      .mg-modal-icone {
        font-size: 68px;
        display: block;
        margin-bottom: 14px;
        animation: mg-bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.18s both;
      }
      .mg-modal-icone.mg-moeda {
        animation: mg-moeda-spin 0.8s ease 0.1s both;
      }
      @keyframes mg-bounce-in {
        from { transform: scale(0.3); opacity: 0; }
        to   { transform: scale(1);   opacity: 1; }
      }
      @keyframes mg-moeda-spin {
        0%   { transform: rotateY(0deg)   scale(0.4); opacity: 0; }
        50%  { transform: rotateY(180deg) scale(1.18); opacity: 1; }
        100% { transform: rotateY(360deg) scale(1); }
      }
      .mg-modal-titulo {
        font-size: 21px;
        font-weight: 800;
        color: #2C3E50;
        margin-bottom: 10px;
        line-height: 1.25;
      }
      .mg-modal-msg {
        font-size: 15px;
        color: #555e6c;
        line-height: 1.55;
        margin-bottom: 22px;
      }
      .mg-modal-xp {
        display: inline-block;
        background: #F1C40F;
        color: #2C3E50;
        font-weight: 800;
        font-size: 17px;
        padding: 7px 22px;
        border-radius: 30px;
        margin-bottom: 22px;
        box-shadow: 0 3px 0 #c9a40e;
        letter-spacing: 0.3px;
      }
      .mg-modal-btn {
        background: #2ECC71;
        color: #fff;
        border: none;
        padding: 14px 0;
        border-radius: 10px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 0 #27ae60;
        transition: transform 0.1s, box-shadow 0.1s;
        display: block;
        width: 100%;
        font-family: inherit;
      }
      .mg-modal-btn:hover  { filter: brightness(1.05); }
      .mg-modal-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #27ae60; }
      .mg-modal-btn:focus-visible {
        outline: 3px solid #2980B9;
        outline-offset: 3px;
      }

      /* ── Partículas decorativas ── */
      .mg-particulas {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
      }
      .mg-particula {
        position: absolute;
        top: -10%;
        font-size: 18px;
        animation: mg-particula-cair 1.8s ease forwards;
        will-change: transform, opacity;
      }
      @keyframes mg-particula-cair {
        0%   { opacity: 1; transform: translateY(0)   rotate(0deg)   scale(1); }
        70%  { opacity: 1; }
        100% { opacity: 0; transform: translateY(110%) rotate(540deg) scale(0.6); }
      }
    `;
    document.head.appendChild(s);
  }

  // ── Textos por perfil e contexto ─────────────────────────────────────────
  const MSGS = {
    quiz_correto: {
      titulo: {
        crianca:     '🌟 Mandou muito bem!',
        adolescente: '🎯 Acertou!',
        jovemAdulto: 'Resposta correta!',
        autonomo:    'Resposta correta.',
        educador:    'Questão correta.',
      },
      msg: {
        crianca:     'Você é incrível! Continue assim! 💪',
        adolescente: 'Na mosca! Você sabia essa 😎',
        jovemAdulto: 'Correto! Seu raciocínio financeiro está afiado.',
        autonomo:    'Resposta correta. Bom aproveitamento do conteúdo.',
        educador:    'Questão respondida corretamente. Domínio sólido do tema.',
      },
    },
    quiz_errado: {
      titulo: {
        crianca:     '😅 Quase lá!',
        adolescente: 'Errou dessa vez',
        jovemAdulto: 'Resposta incorreta',
        autonomo:    'Incorreto.',
        educador:    'Resposta incorreta.',
      },
      msg: {
        crianca:     'Não desanima! Tenta de novo, você consegue! 🌈',
        adolescente: 'Foi mal, mas aprende-se errando. Bora revisar 📖',
        jovemAdulto: 'Não foi dessa vez. Releia o conteúdo e tente novamente.',
        autonomo:    'Resposta incorreta. Revise o conceito antes de continuar.',
        educador:    'Este ponto merece atenção. Retome o conteúdo com a turma.',
      },
    },
    nivel_up: {
      titulo: {
        crianca:     '🎮 PASSOU DE FASE!',
        adolescente: '🔥 VOCÊ UPOU!',
        jovemAdulto: 'Novo nível alcançado!',
        autonomo:    'Nível {nivel} atingido.',
        educador:    'Turma avançou de nível!',
      },
      msg: {
        crianca:     'Uau! Você subiu para o nível {nivel}! Que campeão! 🏆',
        adolescente: 'Nível {nivel} desbloqueado! Segue o jogo 🚀',
        jovemAdulto: 'Você alcançou o nível {nivel}. Continue evoluindo!',
        autonomo:    'Nível {nivel} atingido. Seu progresso está consistente.',
        educador:    'Turma avançou para o nível {nivel}. Excelente resultado.',
      },
      modal: true,
    },
    trilha_concluida: {
      titulo: {
        crianca:     '🏆 TRILHA ZERADA!',
        adolescente: '🎉 GG! Trilha concluída!',
        jovemAdulto: 'Trilha concluída!',
        autonomo:    'Módulo finalizado.',
        educador:    'Trilha concluída pela turma!',
      },
      msg: {
        crianca:     'Você terminou toda a trilha! Você é um superstar! ⭐⭐⭐',
        adolescente: 'Zerou essa trilha! Você mandou demais hoje 🔥',
        jovemAdulto: 'Trilha concluída com sucesso! +{pontos} XP ganhos.',
        autonomo:    'Módulo finalizado. +{pontos} XP adicionados ao perfil.',
        educador:    'Trilha concluída. Alunos prontos para o próximo módulo.',
      },
      modal: true,
    },
    poupanca: {
      titulo: {
        crianca:     '🐷 Que ótimo!',
        adolescente: '💸 Economizando!',
        jovemAdulto: 'Poupança registrada!',
        autonomo:    'Poupança registrada.',
        educador:    'Registro de poupança.',
      },
      msg: {
        crianca:     'Você guardou R$ {valor}! Seu cofrinho está crescendo! 🎉',
        adolescente: 'R$ {valor} guardados. Dinheiro parado rende, hein 😉',
        jovemAdulto: 'R$ {valor} poupados. Ótimo hábito financeiro!',
        autonomo:    'Poupança: R$ {valor} registrada. Meta mensal atualizada.',
        educador:    'Registro de R$ {valor} em poupança. Bom exemplo para os alunos.',
      },
      financeiro: true,
    },
    meta_atingida: {
      titulo: {
        crianca:     '🌈 META BATIDA!',
        adolescente: '🏆 Meta atingida!',
        jovemAdulto: 'Meta financeira atingida!',
        autonomo:    'Objetivo alcançado.',
        educador:    'Meta pedagógica atingida!',
      },
      msg: {
        crianca:     'Você conseguiu! Bateu a meta de R$ {valor}! Incrível! 🎊',
        adolescente: 'Você bateu sua meta de R$ {valor}! Isso aí 🔥',
        jovemAdulto: 'Meta de R$ {valor} atingida. Seu planejamento funcionou!',
        autonomo:    'Objetivo financeiro alcançado: R$ {valor}. Continue.',
        educador:    'Meta atingida pela turma. Excelente resultado pedagógico.',
      },
      modal: true,
      financeiro: true,
    },
    transacao: {
      titulo: {
        crianca:     '📝 Anotado!',
        adolescente: '✅ Salvo!',
        jovemAdulto: 'Transação registrada',
        autonomo:    'Lançamento registrado.',
        educador:    'Transação registrada.',
      },
      msg: {
        crianca:     'Você anotou um gasto de R$ {valor}! Que responsável! 😊',
        adolescente: 'Transação de R$ {valor} salva 👍',
        jovemAdulto: 'R$ {valor} registrado. Controle financeiro em dia.',
        autonomo:    'Lançamento: R$ {valor} computado no relatório.',
        educador:    'Transação de R$ {valor} registrada com sucesso.',
      },
    },
    cadastro: {
      titulo: {
        crianca:     '🎉 Bem-vindo!',
        adolescente: '🚀 Conta criada!',
        jovemAdulto: 'Cadastro concluído!',
        autonomo:    'Cadastro concluído.',
        educador:    'Cadastro realizado!',
      },
      msg: {
        crianca:     'Oba! Você entrou no Moneta Go! Vamos aprender juntos! 🌟',
        adolescente: 'Cadastro feito! Agora é só arrasar 💪',
        jovemAdulto: 'Conta criada com sucesso! Explore a plataforma.',
        autonomo:    'Cadastro concluído. Acesse seu painel financeiro.',
        educador:    'Cadastro realizado. Configure sua turma para começar.',
      },
    },
  };

  // Ícone e cor de destaque por contexto
  const CFG = {
    quiz_correto:     { icone: '✅', accent: '#2ECC71' },
    quiz_errado:      { icone: '❌', accent: '#E67E22' },
    nivel_up:         { icone: '⬆️', accent: '#F1C40F' },
    trilha_concluida: { icone: '🏆', accent: '#2ECC71' },
    poupanca:         { icone: '🪙', accent: '#F1C40F' },
    meta_atingida:    { icone: '🎯', accent: '#2ECC71' },
    transacao:        { icone: '📊', accent: '#2980B9' },
    cadastro:         { icone: '👋', accent: '#1ABC9C' },
  };

  // ── Helpers ──────────────────────────────────────────────────────────────
  function _perfil() {
    try {
      const s = JSON.parse(localStorage.getItem('monetago_sessao') || 'null');
      return s && s.perfil ? s.perfil : 'jovemAdulto';
    } catch (_) {
      return 'jovemAdulto';
    }
  }

  function _interpolar(tmpl, dados) {
    return tmpl.replace(/\{(\w+)\}/g, function (_, k) {
      if (k === 'valor' && dados[k] != null) {
        return Number(dados[k]).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      }
      return dados[k] != null ? dados[k] : '{' + k + '}';
    });
  }

  function _texto(mapa, perfil, dados) {
    var raw = mapa[perfil] || mapa['jovemAdulto'] || Object.values(mapa)[0] || '';
    return _interpolar(raw, dados);
  }

  // ── Toast ────────────────────────────────────────────────────────────────
  function _obterStack() {
    var stack = document.getElementById('mg-toast-stack');
    if (!stack) {
      stack = document.createElement('div');
      stack.id = 'mg-toast-stack';
      stack.setAttribute('aria-live', 'polite');
      stack.setAttribute('aria-atomic', 'false');
      document.body.appendChild(stack);
    }
    return stack;
  }

  function _toast(titulo, msg, icone, accent, durMs) {
    durMs = durMs || 4000;
    return new Promise(function (resolve) {
      var stack = _obterStack();
      var el = document.createElement('div');
      el.className = 'mg-toast';
      el.style.setProperty('--mg-accent', accent);
      el.setAttribute('role', 'alert');
      el.innerHTML =
        '<span class="mg-toast-icone" aria-hidden="true">' + icone + '</span>' +
        '<div class="mg-toast-corpo">' +
          '<div class="mg-toast-titulo">' + titulo + '</div>' +
          '<div class="mg-toast-msg">' + msg + '</div>' +
        '</div>' +
        '<button class="mg-toast-fechar" aria-label="Fechar">✕</button>' +
        '<div class="mg-timer-bar" style="--mg-dur:' + (durMs / 1000) + 's"></div>';

      function fechar() {
        el.classList.add('mg-saindo');
        setTimeout(function () { el.remove(); resolve(); }, 290);
      }

      el.querySelector('.mg-toast-fechar').addEventListener('click', fechar);
      stack.appendChild(el);
      setTimeout(fechar, durMs);
    });
  }

  // ── Modal ────────────────────────────────────────────────────────────────
  function _particulas() {
    var lista = ['⭐', '✨', '🌟', '💫', '🎊'];
    var html = '<div class="mg-particulas" aria-hidden="true">';
    var seed = 7;
    for (var i = 0; i < 10; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      var left  = 5 + (seed % 90);
      var delay = ((seed % 12) / 10).toFixed(1);
      html += '<span class="mg-particula" style="left:' + left + '%;animation-delay:' + delay + 's">' +
                lista[i % lista.length] +
              '</span>';
    }
    return html + '</div>';
  }

  function _modal(titulo, msg, icone, financeiro, pontos) {
    return new Promise(function (resolve) {
      var backdrop = document.createElement('div');
      backdrop.className = 'mg-backdrop';
      backdrop.setAttribute('role', 'dialog');
      backdrop.setAttribute('aria-modal', 'true');
      backdrop.setAttribute('aria-labelledby', 'mg-modal-titulo');

      var xpHtml = pontos
        ? '<div class="mg-modal-xp">+' + pontos + ' XP ✨</div>'
        : '';

      backdrop.innerHTML =
        '<div class="mg-modal">' +
          _particulas() +
          '<span class="mg-modal-icone' + (financeiro ? ' mg-moeda' : '') + '" aria-hidden="true">' + icone + '</span>' +
          '<div id="mg-modal-titulo" class="mg-modal-titulo">' + titulo + '</div>' +
          '<div class="mg-modal-msg">' + msg + '</div>' +
          xpHtml +
          '<button class="mg-modal-btn">Continuar!</button>' +
        '</div>';

      function fechar() {
        backdrop.style.animation = 'mg-fade-in 0.2s ease reverse forwards';
        setTimeout(function () { backdrop.remove(); resolve(); }, 200);
      }

      backdrop.querySelector('.mg-modal-btn').addEventListener('click', fechar);
      backdrop.addEventListener('click', function (e) {
        if (e.target === backdrop) fechar();
      });

      var escHandler = function (e) {
        if (e.key === 'Escape') {
          fechar();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);

      document.body.appendChild(backdrop);
      backdrop.querySelector('.mg-modal-btn').focus();
    });
  }

  // ── API pública ──────────────────────────────────────────────────────────
  /**
   * mostrarFeedback(contexto, dados?)
   *
   * @param {string} contexto  - 'quiz_correto' | 'quiz_errado' | 'nivel_up' |
   *                             'trilha_concluida' | 'poupanca' | 'meta_atingida' |
   *                             'transacao' | 'cadastro'
   * @param {Object} [dados]   - { valor, pontos, nivel, nome }
   * @returns {Promise<void>}  - resolve quando o feedback for fechado
   */
  function mostrarFeedback(contexto, dados) {
    dados = dados || {};
    _injetarCSS();

    var def = MSGS[contexto];
    if (!def) {
      console.warn('[MonetaGo RF-08] Contexto desconhecido: "' + contexto + '"');
      return Promise.resolve();
    }

    var perfil  = _perfil();
    var cfg     = CFG[contexto] || { icone: '💡', accent: '#1ABC9C' };
    var titulo  = _texto(def.titulo, perfil, dados);
    var msg     = _texto(def.msg, perfil, dados);

    if (def.modal) {
      return _modal(titulo, msg, cfg.icone, !!def.financeiro, dados.pontos);
    }
    return _toast(titulo, msg, cfg.icone, cfg.accent);
  }

  // Export
  global.mostrarFeedback = mostrarFeedback;

}(window));
