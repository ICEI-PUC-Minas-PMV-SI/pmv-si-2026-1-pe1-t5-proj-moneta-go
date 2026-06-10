let ativoSelecionado = "Tesouro Selic";
let tipoAtivoSelecionado = "segura";
let taxaAtual = 0.1075; 
let taxaQuedaAtual = 0.00;
let descricaoRiscoAtual = "Seu capital está protegido pelo Tesouro Nacional. O risco de perda financeira nesta operação é considerado nulo.";

let xp = parseInt(localStorage.getItem('moneta_xp')) || 0;
let nivel = parseInt(localStorage.getItem('moneta_nivel')) || 1;
let somAcessivelAtivo = false;

window.onload = () => {
    configurarEventos();
    configurarTecladoAcessivel();
    atualizarInterfaceXP();
    
    const btnSimular = document.getElementById('btn-processar-simulacao');
    if (btnSimular) {
        btnSimular.className = "action-simulate-btn pronto-seguro";
    }

    window.addEventListener('click', (e) => {
        if (!e.target.matches('.help-button')) {
            const dropdown = document.getElementById('menu-ajuda-dropdown');
            if (dropdown && dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    });
};

function toggleMenuAjuda() {
    const dropdown = document.getElementById('menu-ajuda-dropdown');
    if (dropdown) dropdown.classList.toggle('show');
}

function toggleVozAcessivel() {
    somAcessivelAtivo = !somAcessivelAtivo;
    const btn = document.getElementById('audio-toggle-btn');
    
    if (somAcessivelAtivo) {
        btn.classList.add('ativo');
        btn.innerText = "🔊 Ouvir Tela (Ativo)";
        falarTextoAcessivel("Suporte de voz ativado. Selecione o ativo na tabela e clique no botão de simulação localizado no topo.");
    } else {
        btn.classList.remove('ativo');
        btn.innerText = "🔊 Ouvir Tela (Voz)";
        window.speechSynthesis.cancel(); 
    }
}

function falarTextoAcessivel(texto) {
    if (somAcessivelAtivo && texto) {
        window.speechSynthesis.cancel(); 
        const mensagem = new SpeechSynthesisUtterance(texto);
        mensagem.lang = 'pt-BR';
        mensagem.rate = 1.05; 
        window.speechSynthesis.speak(mensagem);
    }
}

function configurarTecladoAcessivel() {
    const linesAtivos = document.querySelectorAll('.asset-row');
    linesAtivos.forEach(linha => {
        linha.setAttribute('tabindex', '0'); 
        linha.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                linha.click(); 
            }
        });
    });
}

function configurarEventos() {
    const linesAtivos = document.querySelectorAll('.asset-row');

    linesAtivos.forEach(linha => {
        linha.addEventListener('click', () => {
            linesAtivos.forEach(l => l.classList.remove('selected-row'));
            linha.classList.add('selected-row');

            ativoSelecionado = linha.getAttribute('data-ativo');
            tipoAtivoSelecionado = engineRowType(linha);
            taxaAtual = parseFloat(linha.getAttribute('data-taxa'));
            descricaoRiscoAtual = linha.getAttribute('data-risco');
            taxaQuedaAtual = parseFloat(linha.getAttribute('data-queda')) || 0;

            document.getElementById('ativo-nome-display').innerText = ativoSelecionado;

            const btnSimular = document.getElementById('btn-processar-simulacao');

            if (tipoAtivoSelecionado === "segura") {
                btnSimular.className = "action-simulate-btn pronto-seguro";
                falarTextoAcessivel(`Ativo selecionado: ${ativoSelecionado}. Pronto para simulação segura.`);
            } else {
                btnSimular.className = "action-simulate-btn pronto-bolsa";
                falarTextoAcessivel(`Ativo da bolsa selecionado: ${ativoSelecionado}. Pronto para simulação de risco.`);
            }
        });
    });

    document.getElementById('proximo-btn').addEventListener('click', () => {
        falarTextoAcessivel("Redirecionando para o painel docente.");
        alert("Simulação salva com sucesso no ecossistema Moneta Go! Avançando...");
    });
}

function engineRowType(rowElement) {
    return rowElement.getAttribute('data-tipo') || "segura";
}

function calcularEExecutarSimulacaoOficial() {
    const capital = parseFloat(document.getElementById('capital-investimento').value) || 0;
    
    const cardCurto = document.getElementById('curto-prazo-val');
    const cardMedio = document.getElementById('medio-prazo-val');
    const cardLongo = document.getElementById('longo-prazo-val');
    
    const textoRisco = document.getElementById('texto-risco-detalhado');
    const barraAlerta = document.getElementById('barra-alerta-risco');

    let valor1Ano = capital * Math.pow((1 + taxaAtual), 1);
    let valor3Anos = capital * Math.pow((1 + taxaAtual), 3);
    let valor5Anos = capital * Math.pow((1 + taxaAtual), 5);

    let strCurto = `R$ ${valor1Ano.toFixed(2).replace('.', ',')}`;
    let strMedio = `R$ ${valor3Anos.toFixed(2).replace('.', ',')}`;
    let strLongo = `R$ ${valor5Anos.toFixed(2).replace('.', ',')}`;

    cardCurto.innerText = strCurto;
    cardMedio.innerText = strMedio;
    cardLongo.innerText = strLongo;

    textoRisco.innerText = descricaoRiscoAtual;

    if (tipoAtivoSelecionado === "segura") {
        barraAlerta.style.background = "#26c6da"; 
        ganharXP(15);
    } else {
        if (taxaQuedaAtual >= 0.40) {
            barraAlerta.style.background = "#E74C3C"; 
        } else {
            barraAlerta.style.background = "#E67E22"; 
        }
        
        let perdaPossivel = capital * taxaQuedaAtual;
        textoRisco.innerText += ` [ALERTA DE VOLATILIDADE]: Em um cenário severo de queda generalizada na bolsa, seu montante simulado pode recuar temporariamente para R$ ${(capital - perdaPossivel).toFixed(2).replace('.', ',')} no período de um ano.`;
        ganharXP(30);
    }

    let textoLeituraCompleta = `Simulação realizada para ${ativoSelecionado}. ` +
                               `Resultado de curto prazo para um ano: ${strCurto}. ` +
                               `Resultado de médio prazo para três anos: ${strMedio}. ` +
                               `Resultado de longo prazo para cinco anos: ${strLongo}. ` +
                               `Diagnóstico de risco: ${descricaoRiscoAtual}`;
    
    falarTextoAcessivel(textoLeituraCompleta);

    localStorage.setItem('moneta_simulador_capital', capital);
    localStorage.setItem('moneta_simulador_ativo', ativoSelecionado);
}

function ganharXP(qtd) {
    xp += qtd;
    if (xp >= 100) {
        xp -= 100;
        nivel++;
        alert(`🎉 Sensacional! Você evoluiu para o Nível ${nivel}!`);
    }
    atualizarInterfaceXP();
}

function atualizarInterfaceXP() {
    const fillBar = document.querySelector('.xp-bar-fill');
    const labelNivel = document.querySelector('.rank-label');
    const labelNomeRank = document.querySelector('.rank-name');
    
    if (fillBar) fillBar.style.width = `${xp}%`;
    if (labelNivel) labelNivel.innerText = `NÍVEL ${nivel}`;
    
    if (labelNomeRank) {
        if (nivel >= 5) {
            labelNomeRank.innerText = "Estrategista Mirim";
        } else if (nivel >= 3) {
            labelNomeRank.innerText = "Investidor Consciente";
        } else {
            labelNomeRank.innerText = "Poupador Iniciante";
        }
    }
    
    localStorage.setItem('moneta_xp', xp);
    localStorage.setItem('moneta_nivel', nivel);
}