
# Projeto de Interface

O fluxo de usuário (User Flow) do Moneta Go foi projetado para ser intuitivo, considerando a diversidade do público-alvo (de crianças a educadores). O caminho principal consiste em: 

* Landing Page: Apresentação da plataforma e chamada para login/cadastro. 

* Onboarding: Escolha do perfil (Criança, Jovem, Adulto ou Educador) para adaptação da linguagem. 

* Dashboard: Visão geral do progresso, saldo de "moedas virtuais" e acesso às trilhas. 

* Trilhas de Aprendizado: Sequência de conteúdos e desafios gamificados. 

* Área de Gestão (Cofre/Simuladores): Espaço para prática financeira. 
 

## User Flow
<img width="1375" height="734" alt="Opera Instantâneo_2026-04-18_182421_www figma com" src="https://github.com/user-attachments/assets/adefe3d8-9ad8-4b7c-ba0d-b314fc4cb69e" />

 
## Wireframes

Os wireframes foram desenvolvidos focando na hierarquia de informações e na acessibilidade (RNF-01 e RNF-02). .

### Pagina inicial

A tela inicial apresenta um menu lateral à esquerda com as principais seções do sistema, como “Página inicial”, “Jornada”, “Minha conta”, “Configurações” e “Termos de uso”. No topo, a barra de navegação oferece opções de “Entrar”, “Cadastrar-se”, acesso à ajuda e um recurso de acessibilidade para ajustes da interface. A área central exibe conteúdos em destaque organizados em blocos, enquanto na parte inferior há o botão “Começar a jornada”, que orienta o início da interação do usuário. (RF-01, RF-03,, RF-04, RF-012) e (RNF- 01, RNF- 02).

pagina inicial <img width="645" height="460" alt="Opera Instantâneo_2026-04-18_190351_www figma com" src="https://github.com/user-attachments/assets/40193494-1bf7-4c80-84a0-9aba321ff34e" />

### Login
Na tela login apresentamos uma interface simples e centralizada, com foco na autenticação do usuário. No topo, há acesso à área de ajuda e, ao lado, a opção “Cadastre-se” para novos usuários. No centro, destaca-se o logotipo da plataforma, seguido pelos campos de entrada de e-mail e senha. Abaixo dos campos, há a opção “esqueceu a senha?”, permitindo a recuperação de acesso. O botão “Entrar” realiza a autenticação, e, logo abaixo, são exibidas alternativas de login por meio de outras plataformas (como redes sociais). (RF-01).

login<img width="645" height="458" alt="Opera Instantâneo_2026-04-18_190510_www figma com" src="https://github.com/user-attachments/assets/d621bfce-7ae2-4978-baaf-f795d5bc6f30" />

### Cadastro
Já na tela de cadastro do sistema. No topo, há a identificação da plataforma, seguida por um formulário centralizado que reúne os principais campos para autenticação e registro do usuário. O formulário solicita informações como e-mail, senha e data de nascimento, além de incluir um botão “Avançar” para dar continuidade ao processo. Há também uma opção de confirmação de aceite dos “Termos de Uso e LGPD”, garantindo que o usuário concorde com as políticas da plataforma.

Cadastro Novo usúario<img width="643" height="458" alt="Opera Instantâneo_2026-04-18_190559_www figma com" src="https://github.com/user-attachments/assets/7905f45e-b067-4cad-87b8-c88bda7a2567" />

### Remificação

A tela de remificação, no topo, uma barra com espaço para o logotipo à esquerda e um botão de “Ajuda” à direita, facilitando o acesso ao suporte. Logo abaixo, há o título central “Como você vai usar o moneta go?”, que orienta a tomada de decisão do usuário logo no primeiro contato com a plataforma. Na área principal, são exibidas duas opções de uso: “Jornada (Trilhas e jogos)”, voltada para a experiência gamificada do usuário, e “Pedagogo / Educador (Gerenciar turmas, atribuir desafios)”, destinada à gestão e acompanhamento educacional. Abaixo, a interface apresenta três cards de segmentação por faixa etária: “Crianças (6 a 12 anos)” com foco no “Mundo Lúdico”, “Adolescente (13 a 17 anos)” com o “Mundo Desafio” e “Jovem adulto (18–25 anos)” com o “Mundo Fintech”, cada um com ícones representativos.

remanificação<img width="645" height="460" alt="Opera Instantâneo_2026-04-18_191125_www figma com" src="https://github.com/user-attachments/assets/e4709f52-10d0-447a-9274-abcfc2171aa3" />

### Categorias de Aprendizado

Nessa página, além do cabeçalho padrão, a interface é organizada em duas linhas de conteúdo. Na primeira, são apresentados três cards: “Orçamento”, “Poupança” e “Crédito”, cada um com ícone, subtítulo adaptável ao perfil do usuário e botão “Começar”, que inicia a interação com o conteúdo. Passando segunda linha, há dois cards maiores: “Consumo Consciente” e “Investimentos Básicos”, que seguem o mesmo padrão visual, com descrição e botão de ação, facilitando a navegação e o início da jornada do usuário. 

Categorias de Aprendizado <img width="648" height="459" alt="Opera Instantâneo_2026-04-18_191151_www figma com" src="https://github.com/user-attachments/assets/9cc02816-9796-4593-8f1c-992473f86c74" />


### Painel educador

Na primeira, há cards com métricas como “Nº Turmas”, “Alunos Ativos”, “Ranking” e “Nível de XP”, além de um gráfico de tendência de engajamento, um gráfico circular e uma lista de alunos à direita. Já segunda, aparecem cards de resumo (“Engajamento Global” e “Tempo Médio/Sessão”) e a seção “Configuração e Customização”, com três opções: “Orçamento”, “Poupança” e “Consumo Consciente”,  com botões de ativar/desativar, ao lado de um card maior para anotações

Painel educador<img width="646" height="459" alt="Opera Instantâneo_2026-04-18_191209_www figma com" src="https://github.com/user-attachments/assets/baaf1ece-1c46-471e-8258-4e9526181613" />

### Painel  de Controle e Gestão

Nessa etapa, o objetivo é que os alunos visualizem como está sua vida financeira, por meio de métricas que indicam se sua saúde financeira está boa ou precisa de atenção. Como vemos na primeira linha, há um card com “XP Global e Nível” junto aos distintivos recentes, ao lado de um card maior de “Distintivos e Conquistas”, com ícones representativos. Em nossa segunda linha, aparecem três áreas: um card de “Moedas/Valor Virtual Total” com botão “Ir para Metas”, um card de “Meu Progresso de Missões”, com status de “Orçamento” e “Poupança”, e um gráfico à direita que ilustra a evolução do desempenho do usuário.

Painel de controle e Gestão - aluno<img width="647" height="469" alt="Opera Instantâneo_2026-04-18_191229_www figma com" src="https://github.com/user-attachments/assets/606fc5a5-9762-45f5-b775-f9ad6964d9fd" />

### O Grande Tesouro do cofre mágico

No centro, há a atividade “Atividade Gamificada – Criança (6 a 12 anos)”, com ícones de moedas distribuídos na tela, sugerindo uma dinâmica de clique ou coleta, reforçada por um cursor indicando ação. Nessa etapa, a proposta é demonstrar que, quanto mais se guarda, maior será o patrimônio, incentivando o hábito de poupar de forma lúdica.

O Grande Tesouro do cofre mágico <img width="646" height="459" alt="Opera Instantâneo_2026-04-18_191246_www figma com" src="https://github.com/user-attachments/assets/273811cf-67b4-4f32-83bf-5cddc4f4bad1" />

### Termos de uso

Aqui, organizamos em seções informativas que apresentam os “Termos de Uso” de forma clara e acessível.Encontramos, a seção “Quem somos nós”, que explica o propósito da plataforma e sua proposta educacional. Em seguida, “Missões e aprendizados” descreve como funcionam as atividades, metas e a evolução do usuário dentro do sistema. Na sequência, a seção “Moedas e progresso” detalha o uso da moeda virtual, acúmulo de recompensas e acompanhamento de desempenho. Por fim, há as seções de “Suporte técnico” e “Acessibilidade”, que orientam o usuário sobre como obter ajuda e destacam recursos inclusivos da plataforma,

Termos de uso<img width="649" height="461" alt="Opera Instantâneo_2026-04-18_191303_www figma com" src="https://github.com/user-attachments/assets/3d9c3f11-ca9e-4882-836c-e8e4084ccfef" />



> **Links Úteis**:
> - [User Flow - Figma](https://www.figma.com/design/IudQpArSmhYWeVCYtxnaak/Sem-título?node-id=0-1&p=f&t=v1nfBjpbUjTUvnyU-0)
> - [Ferramentas de Wireframes](https://www.figma.com/design/IudQpArSmhYWeVCYtxnaak/Projeto-WEB---Etapa-2?node-id=0-1&p=f&m=draw)
> - [Detalhamento do Fluxo de Usuário - Word](https://hipl.at/b-p4)
