# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

! Para que o Moneta Go cumpra seu propósito de transformar a educação financeira em uma jornada acessível e engajadora, o desenvolvimento do projeto baseia-se no estudo sobre o seu público alvo. Esta abordagem prioriza as necessidades, as limitações e as aspirações reais das pessoas que interagem com a plataforma.

Nesta etapa, apresentamos o mapeamento das nossas Personas: personagens fictícios criados a partir de um estudo profundo sobre as dores e comportamentos do público-alvo brasileiro. Elas não são apenas perfis demográficos, mas representações humanizadas que guiam desde a escolha da linguagem visual até a complexidade das mecânicas de gamificação.!

**Persona 1:**
Nome: Lucas, 9 anos.
Localização: Bairro Castelo, Belo Horizonte (MG).
Perfil: Estudante do ensino fundamental, curioso e fã de tecnologia. Começou a ganhar as primeiras moedas para gastar na banca de revistas.
Dores: Não entende o valor do dinheiro físico; acha economia um assunto "chato" de adulto; tem pressa para consumir (quer tudo agora).
Necessidades: Uma interface colorida e simples; recompensas imediatas que pareçam um jogo; ferramentas que mostrem o progresso de forma visual (como um cofre que enche).
Tom de Voz para Comunicação: Brincalhão, simples, incentivador e focado em "aventura".

**Persona 2:** 
Nome: Vinícius, 16 anos.
Localização: Brasilândia, São Paulo (SP).
Perfil: Aluno de escola pública e entregador eventual. Busca independência, mas é bombardeado por anúncios de "dinheiro fácil" e apostas online.
Dores: Medo de ser enganado por golpes; falta de perspectiva sobre como fazer o pouco dinheiro que ganha render; pressão social para consumir marcas caras.
Necessidades: Simuladores que mostrem a realidade das apostas vs. investimentos; conteúdos sobre como planejar o primeiro curso técnico ou intercâmbio.
Tom de Voz para Comunicação: Descolado, direto, transparente e que trate o jovem com maturidade.




## Histórias de usuários

|                               Eu como …                               |                                 … quero/desejo …                                  |                                                    … para ....                                                    |
|:---------------------------------------------------------------------:|:---------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------:|
| Lucas, 9 anos (Criança), morador do bairro Castelo em BH.             | Depositar moedas virtuais em um "Cofre Mágico" dentro do jogo.                    | Visualizar meu progresso e aprender a poupar para comprar meu álbum de dinossauros.                               |
| Vinícius, 16 anos (Adolescente), morador da Brasilândia em SP.        | Utilizar simuladores de probabilidade e risco dentro da plataforma.               | Entender que apostas (bets) não são investimentos e focar em guardar dinheiro para meu curso técnico.             |
| Bia, 22 anos (Jovem Adulta), moradora de Ipanema no RJ.               | Visualizar o rastreamento automático dos meus "gastos formiga" (cafés e ubers).   | Identificar para onde meu salário está sumindo e conseguir pagar minhas contas sem entrar no vermelho.            |
| André, 24 anos (Autônomo), morador da Ceilândia em DF.                | Navegar em uma interface 100% compatível com leitores de tela e comandos de voz.  | Ter autonomia para registrar meus ganhos da massoterapia e organizar minha reserva de emergência sem ajuda.       |
| Kauã, 17 anos (Jovem Aprendiz), morador de Ribeirão das Neves em MG.  | Acessar trilhas sobre planejamento de compras e consumo consciente.               | Ajudar minha mãe a administrar o orçamento doméstico e fazer o dinheiro render mais no supermercado.              |
| Ricardo, 40 anos (Professor), morador de Venda Nova em BH.            | Acompanhar o engajamento e o desempenho da minha turma em um painel docente.      | Identificar as dificuldades dos meus alunos e transformar a educação financeira em um projeto de vida para eles.  |


# Requisitos do Projeto

## Requisitos Funcionais

|   ID     |                                                                Descrição                                                                 | Prioridade  |
|:--------:|:----------------------------------------------------------------------------------------------------------------------------------------:|:-----------:|
| RF⎻01   | O sistema deve permitir cadastro e login com perfis distintos: criança, adolescente, jovem adulto, autônomo e educador.                  | Alta        |
| RF-02    | O sistema deve permitir que educadores criem turmas, adicionem alunos e vinculem perfis de aprendizado à conta docente.                  | Alta        |
| RF-03    | O sistema deve ajustar automaticamente a linguagem, visual e complexidade do conteúdo conforme a faixa etária do perfil cadastrado.      | Alta        |
| RF-04    | O sistema deve disponibilizar trilhas de aprendizado sobre orçamento, poupança, crédito, consumo consciente e investimentos básicos.     | Alta        |
| RF-05    | O sistema deve implementar mecânicas de gamificação: pontuação, níveis, conquistas, rankings e desafios progressivos.                    | Alta        |
| RF-06    | O sistema deve incluir simuladores de probabilidade e risco para ilustrar a diferença entre investimento e apostas.                      | Média       |
| RF-07    | O sistema deve oferecer um "Cofre Mágico" virtual onde o usuário deposita moedas e visualiza o progresso da meta de poupança.            | Média       |
| RF-08    | O sistema deve oferecer feedback imediato a cada interação, reforçando conceitos financeiros de forma contextualizada.                   | Média       |
| RF-09    | O sistema deve rastrear e categorizar automaticamente "gastos formiga" (pequenas despesas recorrentes como cafés e transporte).          | Média       |
| RF-10    | O sistema deve permitir registro manual de ganhos e despesas, com suporte a categorias personalizadas e metas de reserva de emergência   | Média       |
| RF-11    | O sistema deve exibir relatórios visuais de fluxo financeiro pessoal com gráficos de entradas, saídas e progresso de metas.              | Média       |
| RF-12    |   O sistema deve disponibilizar um painel docente com métricas de engajamento, desempenho por aluno e progresso por trilha.              | Alta        |
| RF-13    | O sistema deve permitir que educadores personalizem trilhas, atribuam desafios específicos e adicionem contextos pedagógicos às turmas.  | Média       |
| RF-14    |   O sistema deve oferecer trilhas e simulações de planejamento de compras e consumo consciente voltadas ao contexto doméstico.           | Média       |

## Requisitos não funcionais

|    ID     |                                                                 Descrição                                                                 | Prioridade  |
|:---------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|:-----------:|
| RNF⎻01    |   A plataforma deve ser 100% compatível com leitores de tela (NVDA, VoiceOver) e navegação por comandos de voz, conforme WCAG 2.1.        | Alta        |
| RNF-02   | Todos os elementos interativos devem ser acessíveis por teclado, com foco visível e descrições adequadas.                                 | Alta        |
| RNF-03    | A interface deve ser responsiva e funcional em dispositivos móveis (smartphones a partir de 360px) e desktops.                            | Alta        |
| RNF-04    | A arquitetura deve permitir adição de novas trilhas e mecânicas de gamificação sem refatoração do core da plataforma.                     | Alta        |
| RNF-05    | O sistema deve manter disponibilidade de 99,5% mensais, com janelas de manutenção programadas fora do horário escolar (8h–18h).           | Média       |
| RNF-06    | Dados financeiros pessoais (gastos, metas, renda) devem ser armazenados com criptografia e isolados por usuário.                          | Alta        |
| RNF-07    | Todas as comunicações entre cliente e servidor devem ser criptografadas                                                                   | Alta        |
| RNF-08    | Dados de menores de 18 anos devem ser tratados em conformidade com a LGPD e o Marco Civil da Internet, com consentimento do responsável.  | Alta        |
| RNF-09    | O tempo de carregamento inicial da plataforma deve ser inferior a 3 segundos em conexões 4G (≥10 Mbps).                                   | Média       |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
