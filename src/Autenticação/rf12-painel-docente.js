const BANCO_DOCENTE = {
    alunos: [
        { nome: "Ana Paula", nivel: 5, progresso: 95, logon: "Hoje às 10:24", status: "Excelente", pendencia: "Nenhuma" },
        { nome: "Andre Luiz", nivel: 4, progresso: 92, logon: "Hoje às 08:15", status: "Excelente", pendencia: "Nenhuma" },
        { nome: "Matheus Silva", nivel: 4, progresso: 88, logon: "Ontem", status: "Bom", pendencia: "Nenhuma" },
        { nome: "Beatriz Ramos", nivel: 3, progresso: 76, logon: "Ontem", status: "Bom", pendencia: "Nenhuma" },
        { nome: "Gustavo Rezende", nivel: 4, progresso: 90, logon: "Hoje às 14:15", status: "Excelente", pendencia: "Nenhuma" },
        { nome: "Carlos Eduardo", nivel: 3, progresso: 69, logon: "Há 2 dias", status: "Regular", pendencia: "Nenhuma" },
        { nome: "Fernanda Souza", nivel: 2, progresso: 45, logon: "Há 5 dias", status: "Atenção", pendencia: "Simulação de Ativo (RF-06) pendente" },
        { nome: "Lucas Lima", nivel: 2, progresso: 38, logon: "Há 4 dias", status: "Atenção", pendencia: "Módulo de Orçamento incompleto" },
        { nome: "Mariana Costa", nivel: 3, progresso: 74, logon: "Ontem", status: "Bom", pendencia: "Nenhuma" },
        { nome: "Pedro Henrique", nivel: 1, progresso: 15, logon: "Há 8 dias", status: "Atenção", pendencia: "Aporte Inicial não configurado" },
        { nome: "Roberta Dias", nivel: 3, progresso: 65, logon: "Há 1 dia", status: "Regular", pendencia: "Nenhuma" },
        { nome: "Vitor Hugo", nivel: 1, progresso: 22, logon: "Há 6 dias", status: "Atenção", pendencia: "Questionário de Risco em atraso" },
        { nome: "Camila Ribeiro", nivel: 2, progresso: 31, logon: "Há 7 dias", status: "Atenção", pendencia: "Simulação de Inflação atrasada" }
    ],
    desafios: [
        { nome: "🏆 Poupador Iniciante", meta: "Consolidar Reserva de Emergência de 1 ano", recompensa: "+150 XP", metrica: "38 concluintes" },
        { nome: "📈 Arena do Simulador (RF-06)", meta: "Executar projeções lado a lado (Classe A/B)", recompensa: "+300 XP", metrica: "22 concluintes" },
        { nome: "⚖️ Investidor Consciente", meta: "Alocar capital em Renda Fixa e Renda Bolsa", recompensa: "+450 XP", metrica: "14 concluintes" },
        { nome: "🛡️ Proteção de Ativos", meta: "Superar cenários reais de volatilidade extrema", recompensa: "+500 XP", metrica: "8 concluintes" }
    ],
    turmasConfig: {
        "Turma A (Adolescentes)": {
            alunosNomes: ["Ana Paula", "Andre Luiz", "Matheus Silva", "Beatriz Ramos", "Carlos Eduardo", "Fernanda Souza"],
            progressoTrilha: 92,
            modulos: [
                { nome: "Planejamento de Curto Prazo", status: "🟢 Concluído" },
                { nome: "Arena de Simulação (RF-06)", status: "🔵 Em Andamento" },
                { nome: "Introdução à Renda Variável", status: "🔴 Bloqueado" }
            ]
        },
        "Turma B (Crianças)": {
            alunosNomes: ["Lucas Lima", "Mariana Costa", "Pedro Henrique"],
            progressoTrilha: 74,
            modulos: [
                { nome: "O que é Moeda e Cofrinho?", status: "🟢 Concluído" },
                { nome: "Poupança e Consumo Consciente", status: "🔵 Em Andamento" },
                { nome: "O Conceito de Juros Simples", status: "🔴 Bloqueado" }
            ]
        },
        "Turma C (Jovens Adultos)": {
            alunosNomes: ["Gustavo Rezende", "Roberta Dias"],
            progressoTrilha: 65,
            modulos: [
                { nome: "Montagem de Carteira de Ativos", status: "🟢 Concluído" },
                { nome: "Análise de Inflação e Rentabilidade Real", status: "🟢 Concluído" },
                { nome: "Volatilidade Extrema e Criptoativos (RF-13)", status: "🔵 Em Andamento" }
            ]
        },
        "Turma D (Treinamento)": {
            alunosNomes: ["Vitor Hugo", "Camila Ribeiro"],
            progressoTrilha: 40,
            modulos: [
                { nome: "Nivelamento de Matemática Financeira", status: "🟢 Concluído" },
                { nome: "Simulações Guiadas de Renda Fixa", status: "🔴 Bloqueado" },
                { nome: "Psicologia Econômica Básica", status: "🔴 Bloqueado" }
            ]
        }
    }
};

let narradorAtivo = false;
let ultimoAlunoNarrado = "";

document.addEventListener("DOMContentLoaded", () => {
    conectarCardsSuperiores();
    conectarFiltroTurmas();
    conectarAcessibilidadePrincipal();
    conectarAcoesGerais();
    conectarRolagemAcessivel();
});

function narrarPassoApasso(texto) {
    if (!narradorAtivo) return;
    
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
}

function conectarRolagemAcessivel() {
    const containers = document.querySelectorAll(".table-container");
    if (containers.length < 2) return;
    const containerTabelaDireita = containers[1];

    containerTabelaDireita.addEventListener("scroll", () => {
        if (!narradorAtivo) return;

        const linhasAlunos = containerTabelaDireita.querySelectorAll("tbody tr");
        const containerTopo = containerTabelaDireita.getBoundingClientRect().top;

        for (let linha of linhasAlunos) {
            const caixaLinha = linha.getBoundingClientRect();
            
            if (caixaLinha.top >= containerTopo && caixaLinha.top <= containerTopo + 40) {
                const primeiraCelula = linha.querySelector("td");
                if (primeiraCelula) {
                    const nomeAluno = primeiraCelula.innerText;
                    
                    if (nomeAluno !== ultimoAlunoNarrado && nomeAluno !== "Nenhum aluno cadastrado nesta turma.") {
                        ultimoAlunoNarrado = nomeAluno;
                        narrarPassoApasso(`Aluno em foco na rolagem: ${nomeAluno}`);
                        break;
                    }
                }
            }
        }
    });
}

function conectarAcessibilidadePrincipal() {
    const btnAjuda = document.querySelector(".help-button");
    if (!btnAjuda) return;

    btnAjuda.addEventListener("click", () => {
        const logoMoneta = document.querySelector('img[alt="Logotipo Moneta Go"]');
        
        if (narradorAtivo) {
            narradorAtivo = false;
            window.speechSynthesis.cancel();
            btnAjuda.innerText = "AJUDA";
            alert("Modo Narrador Desativado.");
        } else {
            narradorAtivo = true;
            btnAjuda.innerText = "⏹️ PARAR NARRADOR";
            
            const introducao = "Modo Narrador Ativo. A partir de agora, cada clique ou rolagem na página será ditada passo a passo para auxiliar sua navegação.";
            const cenarioCurto = "Cenário de Curto Prazo atual de 1 ano: 56 alunos ativos integrados esta semana.";
            const cenarioMedio = "Cenário de Médio Prazo de 3 anos: 79.8% de engajamento médio acumulado.";
            const cenarioLongo = "Cenário de Longo Prazo de 5 anos: 32 desafios concluídos de forma consolidada no ecossistema.";
            const alertasRisco = "Alertas de Risco Pedagógico Detectados: 5 alunos necessitam de atenção imediata por tarefas em atraso.";

            const textoInicial = `${introducao} Resumo dos indicadores antigos: ${cenarioCurto} ${cenarioMedio} ${cenarioLongo} ${alertasRisco}`;
            
            const utterance = new SpeechSynthesisUtterance(textoInicial);
            utterance.lang = "pt-BR";
            utterance.rate = 1.05;
            window.speechSynthesis.speak(utterance);
        }
    });
}

function limparEResetadoTabela(titulo) {
    const label = document.querySelector(".grid-superior .col-direita-40 .section-label");
    const thead = document.querySelector(".grid-superior .col-direita-40 .panel-table thead");
    const tbody = document.querySelector(".grid-superior .col-direita-40 .panel-table tbody");
    
    if (label) label.innerText = titulo;
    if (tbody) tbody.innerHTML = "";
    ultimoAlunoNarrado = ""; 
    
    return { thead, tbody };
}

function abrirPopUpCustomizado(titulo, corpo) {
    const modalOverlay = document.getElementById("moneta-modal");
    const modalTitle = document.getElementById("moneta-modal-title");
    const modalBody = document.getElementById("moneta-modal-body");

    if (!modalOverlay || !modalTitle || !modalBody) return;
    modalTitle.innerText = titulo;
    modalBody.innerHTML = corpo;
    modalOverlay.classList.add("active");
}

function fecharPopUpCustomizado() {
    const modalOverlay = document.getElementById("moneta-modal");
    if (modalOverlay) modalOverlay.classList.remove("active");
}

function conectarCardsSuperiores() {
    const cardTotal = document.getElementById("card-total-alunos");
    const cardEngajamento = document.getElementById("card-engajamento");
    const cardDesafios = document.getElementById("card-desafios");
    const cardAjuda = document.getElementById("card-ajuda");

    if (cardTotal) {
        cardTotal.addEventListener("click", () => {
            const t = limparEResetadoTabela("Gestão de Alunos (Todos Cadastrados)");
            if (!t.thead || !t.tbody) return;
            t.thead.innerHTML = `<tr><th>Nome do Aluno</th><th>Nível / XP</th><th>Progresso</th><th>Último Logon</th></tr>`;
            BANCO_DOCENTE.alunos.forEach(a => {
                const cor = a.progresso >= 50 ? "profit-txt" : "loss-txt";
                t.tbody.innerHTML += `<tr><td>${a.nome}</td><td><span class="badge-xp">Nv. ${a.nivel}</span></td><td><span class="${cor}">${a.progresso}%</span></td><td class="txt-gray">${a.logon}</td></tr>`;
            });
            narrarPassoApasso("Você clicou no card Total de Alunos. A tabela da direita foi atualizada e agora lista todos os treze alunos cadastrados no sistema. Role a tabela para ouvir os nomes.");
        });
    }

    if (cardEngajamento) {
        cardEngajamento.addEventListener("click", () => {
            const t = limparEResetadoTabela("Ranking de Engajamento (Destaques)");
            if (!t.thead || !t.tbody) return;
            t.thead.innerHTML = `<tr><th>Aluno</th><th>Desempenho</th><th>Progresso</th><th>Status</th></tr>`;
            const filtrados = BANCO_DOCENTE.alunos.filter(a => a.progresso >= 70);
            filtrados.forEach(a => {
                t.tbody.innerHTML += `<tr><td><strong>${a.nome}</strong></td><td><span class="badge-xp" style="background:#E8F5E9; color:#2E7D32;">${a.status}</span></td><td><span class="profit-txt">${a.progresso}%</span></td><td class="txt-gray">Ativo</td></tr>`;
            });
            narrarPassoApasso("Você clicou no card Engajamento Médio. A tabela da direita foi atualizada e exibe o ranking com os alunos de melhor desempenho que superam setenta por cento de progresso.");
        });
    }

    if (cardDesafios) {
        cardDesafios.addEventListener("click", () => {
            const t = limparEResetadoTabela("Desafios do Ecossistema Moneta Go");
            if (!t.thead || !t.tbody) return;
            t.thead.innerHTML = `<tr><th>Desafio / Conquista</th><th>Módulo / Meta</th><th>Recompensa</th><th>Métrica</th></tr>`;
            BANCO_DOCENTE.desafios.forEach(d => {
                t.tbody.innerHTML += `<tr><td><strong>${d.nome}</strong></td><td style="font-size: 8.5pt;">${d.meta}</td><td><span class="profit-txt">${d.recompensa}</span></td><td class="txt-gray">${d.metrica}</td></tr>`;
            });
            narrarPassoApasso("Você clicou no card Desafios Concluídos. A tabela da direita mudou para exibir as quatro principais missões institucionais do ecossistema.");
        });
    }

    if (cardAjuda) {
        cardAjuda.addEventListener("click", () => {
            const t = limparEResetadoTabela("Alertas Pedagógicos (Tarefas Atrasadas)");
            if (!t.thead || !t.tbody) return;
            t.thead.innerHTML = `<tr><th>Aluno em Risco</th><th>Último Acesso</th><th>Progresso</th><th>Tarefa Pendente</th></tr>`;
            const filtrados = BANCO_DOCENTE.alunos.filter(a => a.status === "Atenção");
            filtrados.forEach(a => {
                t.tbody.innerHTML += `<tr><td><span style="color:var(--danger-red); font-weight:bold;">⚠️ ${a.nome}</span></td><td class="txt-gray">${a.logon}</td><td><span class="loss-txt">${a.progresso}%</span></td><td style="font-size: 8.5pt; color:#BF360C; font-weight:500;">${a.pendencia}</td></tr>`;
            });
            narrarPassoApasso("Alerta crítico. Você clicou no card Alunos que precisam de atenção. A tabela da direita agora foca nos cinco alunos com módulos ou questionários em atraso.");
        });
    }
}

function conectarFiltroTurmas() {
    const linhas = document.querySelectorAll(".grid-superior .col-esquerda-60 .panel-table tbody tr");
    linhas.forEach(linha => {
        linha.style.cursor = "pointer";
        linha.addEventListener("click", () => {
            const tagStrong = linha.querySelector("td strong");
            if (!tagStrong) return;

            const nomeTurma = tagStrong.innerText;
            const t = limparEResetadoTabela(`Gestão de Alunos (${nomeTurma})`);
            if (!t.thead || !t.tbody) return;

            t.thead.innerHTML = `<tr><th>Nome do Aluno</th><th>Nível / XP</th><th>Progresso</th><th>Último Logon</th></tr>`;
            const configTurma = BANCO_DOCENTE.turmasConfig[nomeTurma];
            if (!configTurma) return;

            const filtrados = BANCO_DOCENTE.alunos.filter(a => configTurma.alunosNomes.includes(a.nome));
            filtrados.forEach(aluno => {
                const cor = aluno.progresso >= 50 ? "profit-txt" : "loss-txt";
                t.tbody.innerHTML += `<tr><td>${aluno.nome}</td><td><span class="badge-xp">Nv. ${aluno.nivel}</span></td><td><span class="${cor}">${aluno.progresso}%</span></td><td class="txt-gray">${aluno.logon}</td></tr>`;
            });
            narrarPassoApasso(`Você selecionou a ${nomeTurma}. A tabela da direita foi filtrada para mostrar apenas os estudantes vinculados a este grupo. Role a lista para ouvir os integrantes.`);
        });
    });
}

function conectarAcoesGerais() {
    const btnTrilhas = document.querySelector(".action-card-btn.blue-layout");
    const btnMissao = document.querySelector(".action-card-btn.dark-layout");
    const btnGestao = document.querySelector(".main-btn");

    const modalClose = document.getElementById("moneta-modal-close");
    const modalBtn = document.getElementById("moneta-modal-btn");

    if (modalClose) modalClose.addEventListener("click", () => { fecharPopUpCustomizado(); narrarPassoApasso("Pop-up fechado."); });
    if (modalBtn) modalBtn.addEventListener("click", () => { fecharPopUpCustomizado(); narrarPassoApasso("Pop-up fechado."); });

    if (btnTrilhas) {
        btnTrilhas.addEventListener("click", () => {
            const htmlTogglesTrilhas = `
                <div style="line-height: 1.8;">
                    Defina quais módulos pedagógicos estarão disponíveis na jornada acadêmica dos alunos de forma imediata:<br><br>
                    <label style="display:flex; align-items:center; gap:10px; margin-bottom:8px; font-weight:600;"><input type="checkbox" checked style="width:16px; height:16px;"> Módulo de Planejamento e Orçamento Fictício</label>
                    <label style="display:flex; align-items:center; gap:10px; margin-bottom:8px; font-weight:600;"><input type="checkbox" checked style="width:16px; height:16px;"> Módulo de Renda Fixa e Inflação (Poupança)</label>
                    <label style="display:flex; align-items:center; gap:10px; margin-bottom:8px; font-weight:600;"><input type="checkbox" checked style="width:16px; height:16px;"> Módulo de Variabilidade da Bolsa de Valores</label>
                    <label style="display:flex; align-items:center; gap:10px; margin-bottom:15px; font-weight:600;"><input type="checkbox" style="width:16px; height:16px;"> Módulo Avançado de Alta Volatilidade (Criptoativos)</label>
                    <button id="btn-salvar-trilhas-toggles" class="modal-btn-confirm" style="width:100%;">Salvar Configurações da Trilha</button>
                </div>
            `;
            abrirPopUpCustomizado("⚙️ Customização de Trilhas", htmlTogglesTrilhas);
            narrarPassoApasso("Abertura de pop-up: Configuração de Customização de Trilhas aberta na tela. Contém caixas de seleção para ativar ou pausar módulos.");

            const btnConfirmarToggles = document.getElementById("btn-salvar-trilhas-toggles");
            if (btnConfirmarToggles) {
                btnConfirmarToggles.addEventListener("click", () => {
                    fecharPopUpCustomizado();
                    abrirPopUpCustomizado("Sucesso!", "Trilhas customizadas salvas no localStorage e sincronizadas com a visualização dos alunos.");
                    narrarPassoApasso("Ação confirmada. Configurações da trilha salvas no banco local com sucesso.");
                });
            }
        });
    }

    if (btnMissao) {
        btnMissao.addEventListener("click", () => {
            const htmlFormMissao = `
                <div style="line-height: 1.6;">
                    Configure os parâmetros para a nova simulação em lote na Arena Interativa:<br><br>
                    <label style="font-size:8.5pt; font-weight:bold; color:var(--primary-blue);">NOME DO DESAFIO</label><br>
                    <input type="text" id="input-missao-nome" value="Maratona de Renda Fixa" style="width:100%; padding:8px; border-radius:4px; border:1px solid var(--border-color); margin-bottom:12px; font-family:'Poppins'; font-size:9pt;"><br>
                    <label style="font-size:8.5pt; font-weight:bold; color:var(--primary-blue);">APORTE CAPITAL INICIAL FICTÍCIO</label><br>
                    <select id="select-missao-aporte" style="width:100%; padding:8px; border-radius:4px; border:1px solid var(--border-color); margin-bottom:18px; font-family:'Poppins'; font-size:9pt;">
                        <option value="500">R$ 500,00 (Nível Iniciante)</option>
                        <option value="1000" selected>R$ 1.000,00 (Nível Padrão Moneta)</option>
                        <option value="5000">R$ 5.000,00 (Nível Estrategista)</option>
                    </select>
                    <button id="btn-enviar-missao-form" class="modal-btn-confirm" style="width:100%;">🚀 Disparar Missão em Massa</button>
                </div>
            `;
            abrirPopUpCustomizado("🚀 Disparar Missão Gamificada", htmlFormMissao);
            narrarPassoApasso("Abertura de pop-up: Formulário para disparar nova missão em massa aberto na tela. Contém campo de texto para nome e caixa de seleção de aporte monetário inicial.");

            const btnEnviar = document.getElementById("btn-enviar-missao-form");
            if (btnEnviar) {
                btnEnviar.addEventListener("click", () => {
                    const nomeInput = document.getElementById("input-missao-nome").value;
                    const aporteSelect = document.getElementById("select-missao-aporte").value;
                    fecharPopUpCustomizado();
                    abrirPopUpCustomizado("Missão Ativada!", `A missão "${nomeInput}" foi disparada com aporte controlado de R$ ${aporteSelect},00 para o simulador.`);
                    narrarPassoApasso(`Sucesso. Você disparou a missão intitulada ${nomeInput} com aporte inicial simulado de ${aporteSelect} reais.`);
                });
            }
        });
    }

    if (btnGestao) {
        btnGestao.addEventListener("click", () => {
            abrirPopUpCustomizado("Auditoria Geral", "Buscando dados estruturados armazenados no localStorage de todos os alunos.");
            narrarPassoApasso("Você clicou em ir para a gestão de alunos em visão completa. Processando histórico local.");
        });
    }

    const botoesVer = document.querySelectorAll(".btn-ver");
    botoesVer.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const nomeTurma = btn.closest("tr").querySelector("td strong").innerText;
            const configTurma = BANCO_DOCENTE.turmasConfig[nomeTurma];
            if (!configTurma) return;

            let corpoModulos = `<div style="line-height: 1.8;"><strong>Trilha Acadêmica Customizada:</strong><br><br>`;
            configTurma.modulos.forEach((mod, idx) => {
                corpoModulos += `• Módulo ${idx + 1}: ${mod.nome} — <strong>${mod.status}</strong><br>`;
            });
            corpoModulos += `</div>`;

            abrirPopUpCustomizado(`Status da Trilha: ${nomeTurma}`, corpoModulos);
            narrarPassoApasso(`Ação do botão Olho executada. Pop-up aberto contendo a listagem individual dos módulos didáticos customizados e o andamento da ${nomeTurma}.`);
        });
    });

    const botoesEditar = document.querySelectorAll(".btn-editar");
    botoesEditar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const linhaTr = btn.closest("tr");
            const nomeTurma = linhaTr.querySelector("td strong").innerText;
            const configTurma = BANCO_DOCENTE.turmasConfig[nomeTurma];
            if (!configTurma) return;

            const htmlSelecaoXP = `
                <div style="line-height: 1.6;">
                    Selecione o percentual de evolução pedagógica que deseja atribuir à <strong>${nomeTurma}</strong>:<br><br>
                    <select id="seletor-xp-dinamico" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid var(--border-color); font-family: 'Poppins', sans-serif;">
                        <option value="10">+10% de Avanço Comercial</option>
                        <option value="25">+25% de Conclusão de Bloco</option>
                        <option value="50">+50% de Metade da Trilha</option>
                        <option value="100">100% - Conclusão de Curso (Gabarito)</option>
                    </select>
                    <br><br>
                    <button id="btn-salvar-xp-turma" class="modal-btn-confirm" style="width: 100%;">Confirmar Ajuste Cadastral</button>
                </div>
            `;
            abrirPopUpCustomizado(`Ajustar Progresso da Turma: ${nomeTurma}`, htmlSelecaoXP);
            narrarPassoApasso(`Ação do botão Lápis executada. Painel de ajuste cadastral de pontos aberto para a ${nomeTurma}. Escolha o percentual de bônus no seletor na tela.`);

            const btnSalvar = document.getElementById("btn-salvar-xp-turma");
            if (btnSalvar) {
                btnSalvar.addEventListener("click", () => {
                    const seletor = document.getElementById("seletor-xp-dinamico");
                    if (seletor) {
                        const novoProgresso = parseInt(seletor.value);
                        configTurma.progressoTrilha = novoProgresso;
                        const barraVisual = linhaTr.querySelectorAll(".mini-progress-bar")[1];
                        if (barraVisual) {
                            barraVisual.style.width = `${novoProgresso}%`;
                            barraVisual.innerText = `${novoProgresso}%`;
                        }
                        fecharPopUpCustomizado();
                        narrarPassoApasso(`Sucesso. Você alterou o progresso pedagógico da ${nomeTurma} para ${novoProgresso} por cento.`);
                    }
                });
            }
        });
    });

    const botoesBuscar = document.querySelectorAll(".btn-buscar");
    botoesBuscar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const nomeTurma = btn.closest("tr").querySelector("td strong").innerText;
            abrirPopUpCustomizado("Auditoria Comportamental", `Buscando dados de simulação na Arena para a <strong>${nomeTurma}</strong>.`);
            
            const barraTesouro = document.querySelector(".fill-red");
            const barraInflacao = document.querySelector(".fill-amber");
            const barraAcoes = document.querySelector(".fill-green");

            if (barraTesouro && barraInflacao && barraAcoes) {
                if (nomeTurma.includes("Crianças")) {
                    barraTesouro.style.width = "90%"; barraTesouro.nextElementSibling.innerText = "90%";
                    barraInflacao.style.width = "65%"; barraInflacao.nextElementSibling.innerText = "65%";
                    barraAcoes.style.width = "10%"; barraAcoes.nextElementSibling.innerText = "10%";
                } else if (nomeTurma.includes("Jovens")) {
                    barraTesouro.style.width = "20%"; barraTesouro.nextElementSibling.innerText = "20%";
                    barraInflacao.style.width = "40%"; barraInflacao.nextElementSibling.innerText = "40%";
                    barraAcoes.style.width = "85%"; barraAcoes.nextElementSibling.innerText = "85%";
                } else {
                    barraTesouro.style.width = "50%"; barraTesouro.nextElementSibling.innerText = "50%";
                    barraInflacao.style.width = "50%"; barraInflacao.nextElementSibling.innerText = "50%";
                    barraAcoes.style.width = "50%"; barraAcoes.nextElementSibling.innerText = "50%";
                }
            }
            narrarPassoApasso(`Ação do botão Lupa executada. Auditoria de riscos processada. Os gráficos de barra inferiores com os tópicos de maior dificuldade foram recalibrados com o perfil da ${nomeTurma}.`);
        });
    });
}