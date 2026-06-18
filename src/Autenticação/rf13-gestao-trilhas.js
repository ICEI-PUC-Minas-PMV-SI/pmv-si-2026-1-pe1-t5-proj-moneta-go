const BANCO_ARENA = {
    alunosGeral: [
        { nome: "Ana Paula", progresso: "95%", logon: "Hoje às 10:24", xp: "1100 XP", turma: "Turma A (Adolescentes)" },
        { nome: "Andre Luiz", progresso: "92%", logon: "Hoje às 08:15", xp: "800 XP", turma: "Turma A (Adolescentes)" },
        { nome: "Matheus Silva", progresso: "88%", logon: "Ontem", xp: "1100 XP", turma: "Turma A (Adolescentes)" },
        { nome: "Beatriz Ramos", progresso: "74%", logon: "Ontem", xp: "650 XP", turma: "Turma A (Adolescentes)" },
        { nome: "Gustavo Rezende", progresso: "90%", logon: "Hoje às 14:15", xp: "1200 XP", turma: "Turma C (Jovens Adultos)" },
        { nome: "Fernanda Souza", progresso: "45%", logon: "Há 5 dias", xp: "310 XP", turma: "Turma C (Jovens Adultos)" },
        { nome: "Lucas Lima", progresso: "38%", logon: "Há 4 dias", xp: "250 XP", turma: "Turma B (Crianças)" },
        { nome: "Mariana Costa", progresso: "74%", logon: "Ontem", xp: "580 XP", turma: "Turma B (Crianças)" },
        { nome: "Pedro Henrique", progresso: "15%", logon: "Há 8 dias", xp: "110 XP", turma: "Turma B (Crianças)" },
        { nome: "Roberta Dias", progresso: "65%", logon: "Há 1 dia", xp: "600 XP", turma: "Turma C (Jovens Adultos)" },
        { nome: "Vitor Hugo", progresso: "22%", logon: "Há 6 dias", xp: "180 XP", turma: "Turma D (Treinamento)" },
        { nome: "Camila Ribeiro", progresso: "31%", logon: "Há 7 dias", xp: "220 XP", turma: "Turma D (Treinamento)" }
    ],
    dadosAtivos: {
        "ativo-selic": { gConservador: "+ R$ 9,50", gAgressivo: "+ R$ 9,50", pAgressivo: "0,00%", fixa: 95, acoes: 5, crypto: 0, node3: "Estável" },
        "ativo-ipca": { gConservador: "+ R$ 12,10", gAgressivo: "+ R$ 18,50", pAgressivo: "0,00%", fixa: 90, acoes: 10, crypto: 0, node3: "Protegido" },
        "ativo-prefixado": { gConservador: "+ R$ 11,50", gAgressivo: "+ R$ 45,00", pAgressivo: "- R$ 85,00", fixa: 85, acoes: 15, crypto: 0, node3: "Marcado" },
        "ativo-cdb": { gConservador: "+ R$ 11,20", gAgressivo: "+ R$ 11,20", pAgressivo: "0,00%", fixa: 80, acoes: 20, crypto: 0, node3: "Garantido" },
        "ativo-lci": { gConservador: "+ R$ 8,80", gAgressivo: "+ R$ 8,80", pAgressivo: "0,00%", fixa: 85, acoes: 15, crypto: 0, node3: "Isento" },
        "ativo-debentures": { gConservador: "+ R$ 13,50", gAgressivo: "+ R$ 65,00", pAgressivo: "- R$ 45,00", fixa: 60, acoes: 35, crypto: 5, node3: "Corporativo" },
        "ativo-acoes": { gConservador: "+ R$ 25,00", gAgressivo: "+ R$ 150,00", pAgressivo: "- R$ 250,00", fixa: 20, acoes: 70, crypto: 10, node3: "Volátil" },
        "ativo-fiis": { gConservador: "+ R$ 18,00", gAgressivo: "+ R$ 80,00", pAgressivo: "- R$ 90,00", fixa: 40, acoes: 55, crypto: 5, node3: "Comercial" },
        "ativo-crypto": { gConservador: "+ R$ 40,00", gAgressivo: "+ R$ 400,00", pAgressivo: "- R$ 600,00", fixa: 5, acoes: 15, crypto: 80, node3: "Extremo" }
    }
};

let narradorAtivo = false;
let ultimoAlunoNarrado = "";

document.addEventListener("DOMContentLoaded", () => {
    filtrarEDesenharAlunos("VISAO_GERAL");
    conectarCardsSuperioresInterativos();
    conectarMatrizAtivosInterativa();
    conectarSwitchesEAlunos();
    conectarAcessibilidadeModoNarrador();
    
    dispararMutacaoVisualToggle("toggle-orcamento");
    dispararMutacaoVisualToggle("toggle-poupanca");
    dispararMutacaoVisualToggle("toggle-arena");
    
    const padrao = document.getElementById("ativo-selic");
    if(padrao) padrao.click();
});

function narrarPassoApasso(texto) {
    if (!narradorAtivo) return;
    if (window.speechSynthesis.speaking) window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
}

function filtrarEDesenharAlunos(contextoFiltro) {
    const tbody = document.getElementById("tabela-alunos-corpo-rf13");
    const containerTitulo = document.getElementById("titulo-alunos-turma");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    ultimoAlunoNarrado = ""; 

    let listaFiltrada = BANCO_ARENA.alunosGeral;
    
    if (contextoFiltro !== "VISAO_GERAL") {
        listaFiltrada = BANCO_ARENA.alunosGeral.filter(a => a.turma.includes(contextoFiltro));
        if (containerTitulo) containerTitulo.innerText = `👤 DESEMPENHO INDIVIDUAL (VISÃO ${contextoFiltro.toUpperCase()})`;
    } else {
        if (containerTitulo) containerTitulo.innerText = "👤 DESEMPENHO INDIVIDUAL (VISÃO GERAL)";
    }

    listaFiltrada.forEach(aluno => {
        tbody.innerHTML += `
            <tr>
                <td><strong>${aluno.nome}</strong></td>
                <td><span class="txt-profit">${aluno.progresso}</span></td>
                <td class="txt-muted">${aluno.logon}</td>
                <td><span class="badge-status status-safe" style="background:#E8EAF6; color:#1A237E;">${aluno.xp}</span></td>
            </tr>
        `;
    });
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

// 🌟 INTERATIVIDADE AVANÇADA PARA A PRIMEIRA PARTE DA PÁGINA (CARDS E GRÁFICOS INTERNOS)
function conectarCardsSuperioresInterativos() {
    document.getElementById("card-turmas-ativas").addEventListener("click", () => {
        let htmlContent = `
            <p>Mapeamento de turmas ativas integradas à Arena de Simulação:</p>
            <table class="panel-table" style="margin-top:10px;">
                <thead><tr><th>Identificador da Turma</th><th>Foco Acadêmico</th><th>Status</th></tr></thead>
                <tbody>
                    <tr><td><strong>Turma A</strong></td><td>Adolescentes (Módulo Médio)</td><td><span class="badge-status status-safe">Ativo</span></td></tr>
                    <tr><td><strong>Turma B</strong></td><td>Crianças (Fundamentos de Poupança)</td><td><span class="badge-status status-safe">Ativo</span></td></tr>
                    <tr><td><strong>Turma C</strong></td><td>Jovens Adultos (Renda Variável)</td><td><span class="badge-status status-safe">Ativo</span></td></tr>
                    <tr><td><strong>Turma D</strong></td><td>Treinamento (Nivelamento)</td><td><span class="badge-status status-warn">Configuração</span></td></tr>
                </tbody>
            </table>`;
        abrirPopUpCustomizado("👥 Distribuição Institucional de Turmas", htmlContent);
        narrarPassoApasso("Modal aberto: Exibindo a listagem pedagógica detalhada das quatro turmas.");
    });

    document.getElementById("card-total-alunos").addEventListener("click", () => {
        let htmlContent = `<p>Alunos cadastrados sob sua tutela administrativa:</p><div style="max-height:200px; overflow-y:auto; margin-top:10px;"><ul>`;
        BANCO_ARENA.alunosGeral.forEach(a => { htmlContent += `<li><strong>${a.nome}</strong> - ${a.turma}</li>`; });
        htmlContent += `</ul></div>`;
        abrirPopUpCustomizado("👨‍🎓 Censo de Alunos Ativos", htmlContent);
        narrarPassoApasso("Modal aberto: Exibindo censo completo com o nome dos doze alunos vinculados.");
    });

    document.getElementById("card-capital-movimentado").addEventListener("click", () => {
        abrirPopUpCustomizado("💰 Capital Movimentado na Arena", "<p>O valor de <strong>R$ 245.500,00</strong> representa o somatório acumulado de todos os aportes, compras e vendas executados de forma simulada pelos estudantes nas últimas sessões.</p>");
        narrarPassoApasso("Modal de capital movimentado aberto.");
    });

    document.getElementById("card-ativo-negociado").addEventListener("click", () => {
        abrirPopUpCustomizado("⚡ Líder de Negociações", "<p>A classe <strong>CryptoMoneta</strong> registrou o maior volume transacionado nas últimas 48 horas devido a simulações de alta volatilidade disparadas pela Turma C.</p>");
        narrarPassoApasso("Modal de ativo mais negociado aberto.");
    });

    document.getElementById("card-frequencia").addEventListener("click", () => {
        let htmlContent = `
            <p>Média de acessos semanais por estudante no ecossistema:</p>
            <table class="panel-table" style="margin-top:10px;">
                <thead><tr><th>Métrica</th><th>Valor Registrado</th></tr></thead>
                <tbody>
                    <tr><td>Acessos por Aluno</td><td>4.8 dias / semana</td></tr>
                    <tr><td>Horário de Pico</td><td>14:00 às 17:30</td></tr>
                    <tr><td>Tempo Médio por Sessão</td><td>22 minutos</td></tr>
                </tbody>
            </table>`;
        abrirPopUpCustomizado("⏱️ Frequência de Acessos ao Sistema", htmlContent);
        narrarPassoApasso("Modal aberto: Detalhando a estatística de frequência de acessos semanais.");
    });

    // 🌟 RENDERIZAÇÃO DE GRÁFICOS NO MODAL DE CONCLUSÃO
    document.getElementById("card-conclusao").addEventListener("click", () => {
        let htmlContent = `
            <p>Percentual médio de conclusão das missões por grupo pedagógico:</p>
            <div class="modal-chart-wrapper">
                <div class="modal-chart-row">
                    <span class="modal-chart-label">Turma A (Adolescentes)</span>
                    <div class="modal-chart-bar-container"><div class="modal-chart-bar-fill" style="width: 92%;"></div></div>
                    <span class="modal-chart-value">92%</span>
                </div>
                <div class="modal-chart-row">
                    <span class="modal-chart-label">Turma B (Crianças)</span>
                    <div class="modal-chart-bar-container"><div class="modal-chart-bar-fill" style="width: 74%;"></div></div>
                    <span class="modal-chart-value">74%</span>
                </div>
                <div class="modal-chart-row">
                    <span class="modal-chart-label">Turma C (Jovens)</span>
                    <div class="modal-chart-bar-container"><div class="modal-chart-bar-fill" style="width: 85%;"></div></div>
                    <span class="modal-chart-value">85%</span>
                </div>
                <div class="modal-chart-row">
                    <span class="modal-chart-label">Turma D (Treinamento)</span>
                    <div class="modal-chart-bar-container"><div class="modal-chart-bar-fill" style="width: 40%;"></div></div>
                    <span class="modal-chart-value">40%</span>
                </div>
            </div>`;
        abrirPopUpCustomizado("🎯 Conclusão de Missões por Turma", htmlContent);
        narrarPassoApasso("Modal de conclusão aberto, exibindo gráficos de aproveitamento das turmas.");
    });
}

function conectarMatrizAtivosInterativa() {
    const linhasAtivos = document.querySelectorAll(".ativo-selecionavel");
    const seletoresStatus = document.querySelectorAll(".select-status-ativo");

    linhasAtivos.forEach(linha => {
        linha.addEventListener("click", (e) => {
            if (e.target.classList.contains("select-status-ativo")) return;

            if(document.getElementById("toggle-arena") && !document.getElementById("toggle-arena").checked) {
                narrarPassoApasso("Ação travada. A Arena de Simulação está desativada.");
                return;
            }

            linhasAtivos.forEach(l => l.classList.remove("tr-ativa-ui"));
            linha.classList.add("tr-ativa-ui");

            const idAtivo = linha.id;
            const configAtivo = BANCO_ARENA.dadosAtivos[idAtivo];
            const nomeAtivo = linha.querySelector("td strong").innerText;

            if (!configAtivo) return;

            document.getElementById("titulo-simulador-projeções").innerHTML = `Simulador de Projeções (Editando: <b>${nomeAtivo}</b>)`;
            document.getElementById("sim-ganho-conservador").innerText = configAtivo.gConservador;
            document.getElementById("sim-ganho-agressivo").innerText = configAtivo.gAgressivo;
            document.getElementById("sim-perda-agressivo").innerText = configAtivo.pAgressivo;

            document.getElementById("bar-fixa").style.width = `${configAtivo.fixa}%`;
            document.getElementById("bar-acoes").style.width = `${configAtivo.acoes}%`;
            document.getElementById("bar-crypto").style.width = `${configAtivo.crypto}%`;

            const node3 = document.getElementById("node-t3");
            if (node3) {
                node3.querySelector("span b").innerText = configAtivo.node3;
                if (configAtivo.crypto > 40) {
                    node3.classList.add("active-node");
                    document.getElementById("live-growth-current").style.height = "55%";
                } else {
                    node3.classList.remove("active-node");
                    document.getElementById("live-growth-current").style.height = "92%";
                }
            }

            narrarPassoApasso(`Ativo selecionado: ${nomeAtivo}. Parâmetros carregados.`);
        });
    });

    seletoresStatus.forEach(seletor => {
        const idAtivo = seletor.getAttribute("data-ativo");
        const linhaAlvo = document.getElementById(idAtivo);
        if (seletor.value === "BLOQUEADO") linhaAlvo.classList.add("tr-bloqueada-adm");
        if (seletor.value === "RESTRITO") linhaAlvo.classList.add("tr-restrita-adm");

        seletor.addEventListener("change", () => {
            const idAtivoInterno = seletor.getAttribute("data-ativo");
            const linhaAlvoInterna = document.getElementById(idAtivoInterno);
            const novoStatus = seletor.value;
            const nomeAtivo = linhaAlvoInterna.querySelector("td strong").innerText;

            linhaAlvoInterna.classList.remove("tr-bloqueada-adm", "tr-restrita-adm");

            if (novoStatus === "BLOQUEADO") {
                linhaAlvoInterna.classList.add("tr-bloqueada-adm");
                narrarPassoApasso(`Modificação do ecossistema: O ativo ${nomeAtivo} foi totalmente bloqueado no mercado.`);
            } else if (novoStatus === "RESTRITO") {
                linhaAlvoInterna.classList.add("tr-restrita-adm");
                narrarPassoApasso(`Modificação do ecossistema: O ativo ${nomeAtivo} agora opera sob restrições acadêmicas.`);
            } else {
                narrarPassoApasso(`Modificação do ecossistema: O ativo ${nomeAtivo} foi completamente liberado.`);
            }
        });
    });
}

function dispararMutacaoVisualToggle(idToggle) {
    const inputSwitch = document.getElementById(idToggle);
    if (!inputSwitch) return;

    const containerBox = inputSwitch.closest(".toggle-item-box");
    const tagTexto = containerBox.querySelector("span");
    
    const badgeAntiga = containerBox.querySelector(".badge-dinamica");
    if (badgeAntiga) badgeAntiga.remove();

    const badgeStatus = document.createElement("span");
    badgeStatus.className = "badge-dinamica";
    badgeStatus.style.fontSize = "7pt";
    badgeStatus.style.fontWeight = "bold";
    badgeStatus.style.padding = "1px 4px";
    badgeStatus.style.borderRadius = "3px";
    badgeStatus.style.marginLeft = "6px";

    if (inputSwitch.checked) {
        containerBox.style.opacity = "1";
        containerBox.style.borderLeft = "4px solid var(--muted-green-txt)";
        badgeStatus.innerText = "VISÍVEL";
        badgeStatus.style.background = "var(--muted-green)";
        badgeStatus.style.color = "var(--muted-green-txt)";
        tagTexto.after(badgeStatus);
        
        if (idToggle === "toggle-arena") reativarBloqueioVisualArena(false);
    } else {
        containerBox.style.opacity = "0.6";
        containerBox.style.borderLeft = "4px solid var(--muted-red-txt)";
        badgeStatus.innerText = "OCULTO";
        badgeStatus.style.background = "var(--muted-red)";
        badgeStatus.style.color = "var(--muted-red-txt)";
        tagTexto.after(badgeStatus);

        if (idToggle === "toggle-arena") reativarBloqueioVisualArena(true);
    }
}

function reativarBloqueioVisualArena(deveBloquear) {
    const tabelaAtivos = document.querySelector("#botoes-ativos-corpo").closest(".workspace-col");
    const blocoGraficos = document.querySelector(".charts-inner-layout").closest(".workspace-col");
    const wrapperCenarios = document.querySelector(".layout-scenarios-box");

    if (deveBloquear) {
        tabelaAtivos.style.opacity = "0.4";
        tabelaAtivos.style.pointerEvents = "none";
        blocoGraficos.style.opacity = "0.4";
        wrapperCenarios.style.opacity = "0.4";
        wrapperCenarios.style.pointerEvents = "none";
    } else {
        tabelaAtivos.style.opacity = "1";
        tabelaAtivos.style.pointerEvents = "auto";
        blocoGraficos.style.opacity = "1";
        wrapperCenarios.style.opacity = "1";
        wrapperCenarios.style.pointerEvents = "auto";
    }
}

function conectarSwitchesEAlunos() {
    const tOrcamento = document.getElementById("toggle-orcamento");
    const tPoupanca = document.getElementById("toggle-poupanca");
    const tArena = document.getElementById("toggle-arena");

    if (tOrcamento) tOrcamento.addEventListener("change", () => {
        dispararMutacaoVisualToggle("toggle-orcamento");
        const acao = tOrcamento.checked ? "liberado e visível" : "pausado e ocultado do painel do aluno";
        narrarPassoApasso(`Alteração de parâmetro: Módulo de Orçamento foi ${acao}.`);
    });

    if (tPoupanca) tPoupanca.addEventListener("change", () => {
        dispararMutacaoVisualToggle("toggle-poupanca");
        const acao = tPoupanca.checked ? "liberado e visível" : "pausado e ocultado do painel do aluno";
        narrarPassoApasso(`Alteração de parâmetro: Módulo de Poupança foi ${acao}.`);
    });

    if (tArena) tArena.addEventListener("change", () => {
        dispararMutacaoVisualToggle("toggle-arena");
        const acao = tArena.checked ? "Arena de Simulação ativada. Mercados abertos." : "Arena congelada. Gráficos e ativos bloqueados para os alunos.";
        narrarPassoApasso(`Alteração de parâmetro crítico: ${acao}`);
    });

    const cConservador = document.getElementById("btn-cenario-conservador");
    const cAgressivo = document.getElementById("btn-cenario-agressivo");

    if (cConservador) cConservador.addEventListener("click", () => {
        cConservador.style.borderColor = "#ffa726";
        cConservador.style.boxShadow = "0 0 8px rgba(255, 167, 38, 0.4)";
        if (cAgressivo) {
            cAgressivo.style.borderColor = "var(--border-color)";
            cAgressivo.style.boxShadow = "none";
        }

        document.getElementById("bar-crypto").style.width = "5%";
        document.getElementById("bar-acoes").style.width = "10%";
        document.getElementById("bar-fixa").style.width = "98%";
        
        const titStrip = document.getElementById("titulo-central-dinamico");
        if (titStrip) titStrip.innerHTML = "🏟️ CENTRAL DA ARENA — <span style='color:var(--muted-green-txt)'>Cenário Conservador Ativo (1 Ano)</span>";
        
        filtrarEDesenharAlunos("Crianças");
        narrarPassoApasso("Cenário Conservador ativo. Alocação simulada em Renda Fixa subiu para noventa e oito por cento. A lista de alunos foi filtrada para focar na Turma de Crianças.");
    });

    if (cAgressivo) {
        cAgressivo.addEventListener("click", () => {
            cAgressivo.style.borderColor = "#ffa726";
            cAgressivo.style.boxShadow = "0 0 8px rgba(255, 167, 38, 0.4)";
            if (cConservador) {
                cConservador.style.borderColor = "var(--border-color)";
                cConservador.style.boxShadow = "none";
            }

            document.getElementById("bar-crypto").style.width = "90%";
            document.getElementById("bar-acoes").style.width = "75%";
            document.getElementById("bar-fixa").style.width = "2%";
            
            const titStrip = document.getElementById("titulo-central-dinamico");
            if (titStrip) titStrip.innerHTML = "🏟️ CENTRAL DA ARENA — <span style='color:var(--muted-red-txt)'>Cenário Agressivo Ativo (Alta Volatilidade)</span>";
            
            filtrarEDesenharAlunos("Jovens");
            narrarPassoApasso("Cenário Agressivo ativo. Alocação de risco em Cripto saltou para noventa por cento. A lista de alunos foi filtrada para focar na Turma de Jovens Adultos.");
        });
    }

    const botoesCh = document.querySelectorAll(".btn-ch");
    botoesCh.forEach(btn => {
        btn.addEventListener("click", () => {
            const textoOriginal = btn.innerText;
            btn.innerText = "🚀 ENVIADO!";
            btn.style.background = "var(--header-bg)";
            btn.style.color = "white";
            
            setTimeout(() => {
                btn.innerText = textoOriginal;
                btn.style.background = "";
                btn.style.color = "";
            }, 1200);
        });
    });

    document.getElementById("ch-troco").addEventListener("click", () => { narrarPassoApasso("Desafio do Troco disparado em lote."); });
    document.getElementById("ch-energia").addEventListener("click", () => { narrarPassoApasso("Desafio de Economia de Energia enviado."); });
    document.getElementById("ch-inicial").addEventListener("click", () => { narrarPassoApasso("Desafio de Investimento Inicial liberado."); });
    document.getElementById("ch-custom").addEventListener("click", () => { 
        abrirPopUpCustomizado("Novo Bloco de Desafios", "Mapeando parâmetros customizados enviados via localStorage.");
        narrarPassoApasso("Abrindo configurações adicionais de tarefas."); 
    });

    document.getElementById("btn-avancar-relatorio").addEventListener("click", () => {
        abrirPopUpCustomizado("Módulo Concluído", "Consolidando dados estruturados e avançando para a auditoria de risco final.");
        narrarPassoApasso("Processando relatórios finais de risco da arena. Avançando.");
    });

    const containerScroll = document.getElementById("container-alunos-scroll");
    if (containerScroll) {
        containerScroll.addEventListener("scroll", () => {
            if (!narradorAtivo) return;
            const linhas = containerScroll.querySelectorAll("tbody tr");
            const containerTopo = containerScroll.getBoundingClientRect().top;

            for (let linha of linhas) {
                const caixaLinha = linha.getBoundingClientRect();
                if (caixaLinha.top >= containerTopo && caixaLinha.top <= containerTopo + 40) {
                    const nomeAluno = linha.querySelector("td strong").innerText;
                    if (nomeAluno !== ultimoAlunoNarrado) {
                        ultimoAlunoNarrado = nomeAluno;
                        narrarPassoApasso(`Estudante em foco na rolagem: ${nomeAluno}`);
                        break;
                    }
                }
            }
        });
    }
}

function conectarAcessibilidadeModoNarrador() {
    const btnAjuda = document.querySelector(".help-button");
    const closeBtn = document.getElementById("moneta-modal-close");
    const confirmBtn = document.getElementById("moneta-modal-btn");

    if (closeBtn) closeBtn.addEventListener("click", () => { fecharPopUpCustomizado(); narrarPassoApasso("Pop-up fechado."); });
    if (confirmBtn) confirmBtn.addEventListener("click", () => { fecharPopUpCustomizado(); narrarPassoApasso("Pop-up fechado."); });

    if (!btnAjuda) return;

    btnAjuda.addEventListener("click", () => {
        if (narradorAtivo) {
            narradorAtivo = false;
            window.speechSynthesis.cancel();
            btnAjuda.innerText = "AJUDA";
            alert("Modo Narrador Desativado.");
        } else {
            narradorAtivo = true;
            btnAjuda.innerText = "⏹️ PARAR NARRADOR";
            
            const introducao = "Central da Arena de Simulação Moneta Go ativa. Modo Narrador unificado em execução passo a passo.";
            const cenarios = "Cenários de 1 ano conservador e alta volatilidade disponíveis no canto inferior direito para simulação lado a lado.";
            
            const utterance = new SpeechSynthesisUtterance(`${introducao} ${cenarios} Selecione uma classe na Matriz de Ativos para recalibrar o painel dinâmico.`);
            utterance.lang = "pt-BR";
            utterance.rate = 1.05;
            window.speechSynthesis.speak(utterance);
        }
    });
}