# Introdução

A educação financeira é reconhecida internacionalmente como uma competência essencial para o exercício da cidadania e para a tomada de decisões conscientes ao longo da vida. No Brasil, entretanto, esse tema ainda ocupa um espaço marginal na formação escolar, resultando em gerações de crianças e jovens despreparados para lidar com orçamento pessoal, crédito, investimentos e planejamento de longo prazo.  

Ao mesmo tempo, a gamificação tem se consolidado como uma das abordagens mais eficazes para engajamento em ambientes de aprendizagem digital, utilizando mecânicas como pontuação, desafios, recompensas e progressão para motivar e reter o interesse dos usuários. Este projeto propõe unir essas duas frentes, a urgência da educação financeira e o potencial da gamificação, em uma plataforma web interativa, acessível e inclusiva, voltada para crianças e jovens adultos em fase de formação de hábitos financeiros. 

## Problema

A educação financeira raramente faz parte da formação escolar brasileira de forma estruturada e prática. Crianças e jovens chegam à vida adulta sem os conhecimentos básicos para gerenciar renda, controlar gastos, poupar ou tomar decisões de consumo consciente. Esse despreparo se manifesta em comportamentos como endividamento precoce, ausência de reserva financeira e dificuldade em planejar o futuro.  

As ferramentas digitais disponíveis para suprir essa lacuna são, em sua maioria, voltadas para adultos já inseridos no mercado financeiro, com linguagem técnica e pouco apelo lúdico. Para o público infantojuvenil, faltam soluções que combinem conteúdo financeiro relevante com uma experiência de aprendizagem engajante, progressiva e adaptada às diferentes faixas etárias. O resultado é uma geração que cresce familiarizada com tecnologia, mas sem autonomia para tomar decisões financeiras saudáveis.

*“Como uma solução digital pode promover educação financeira de forma eficaz e engajante para crianças e jovens brasileiros?”*

## Objetivos

Objetivo geral: Desenvolver uma plataforma web de educação financeira baseada em gamificação, que torne o aprendizado sobre finanças pessoais acessível, engajante e inclusivo para crianças e jovens adultos. 

Objetivos específicos:<br>
* Criar trilhas de aprendizado gamificadas sobre orçamento, poupança, crédito, consumo consciente e investimentos básicos, com níveis de conteúdo e linguagem adaptados por faixa etária;
* Implementar mecânicas de jogo: Pontuação, níveis, conquistas, rankings e desafios que estimulem a progressão e o engajamento contínuo;
* Oferecer feedback imediato a cada interação do usuário, reforçando conceitos financeiros de forma prática e contextualizada;
* Garantir acessibilidade conforme WCAG 2.1, com suporte a tecnologias assistivas para inclusão de estudantes com deficiência;
* Permitir que educadores acompanhem o progresso dos alunos e personalizem conteúdos conforme o contexto pedagógico.

## Justificativa

Os dados sobre educação financeira no Brasil evidenciam a urgência do problema. No PISA 2022, o Brasil obteve 416 pontos na avaliação de educação financeira, 82 pontos abaixo da média da OCDE (498), ocupando a 17ª posição entre 20 países participantes, à frente apenas de Malásia e Arábia Saudita. Cerca de 45% dos jovens brasileiros de 15 anos estão no nível mais baixo de proficiência, enquanto a média global é de 18%. Apenas 2% atingiram o nível mais alto, contra 11% na média da OCDE.

As consequências desse déficit se refletem no comportamento financeiro dos jovens. Pesquisa do CNDL/SPC Brasil aponta que 47% dos jovens da Geração Z não realizam controle das próprias finanças e 75% não se preparam para a aposentadoria. CNDL Dados da CNC de 2023 mostram que o endividamento das famílias brasileiras está fortemente associado à falta de educação financeira, com 86,8% das dívidas concentradas no cartão de crédito. 

A gamificação apresenta-se como uma resposta eficaz a esse cenário. Hamari, Koivisto e Sarsa (2014), em revisão sistemática de 24 estudos empíricos, concluem que a gamificação produz efeitos positivos sobre motivação, engajamento e comportamento dos usuários, sendo a educação o contexto mais frequente e com resultados consistentemente favoráveis entre os estudos analisados. A favor dos jovens, os pesquisadores destacam sua enorme familiaridade com a tecnologia e a aptidão para absorver novas formas de interação mediadas por aplicativos, características que tornam a gamificação uma estratégia especialmente adequada para esse público. A própria OCDE reforça que o acesso à educação financeira deve ser garantido independentemente do contexto socioeconômico, por meio de serviços adequados à faixa etária.

## Público-Alvo

A plataforma é destinada a crianças e jovens adultos em fase de formação de hábitos e valores financeiros. Os perfis principais são:  
* Crianças (6–12 anos): Em fase inicial de contato com conceitos como dinheiro, troco, poupança e consumo consciente; necessitam de linguagem simples, visual atrativo e mecânicas lúdicas adaptadas à faixa etária;
* Adolescentes (13–17 anos): Começando a lidar com mesada, primeiros gastos autônomos e decisões de consumo; beneficiam-se de desafios progressivos e narrativas que conectem finanças ao cotidiano;
* Jovens adultos (18–25 anos): Ingressando no mercado de trabalho e na vida financeira independente; demandam conteúdos sobre orçamento, crédito, investimentos básicos e planejamento de metas;
* Professores e educadores: Utilizam a plataforma como ferramenta pedagógica complementar, acompanhando o progresso dos alunos e adaptando os conteúdos ao contexto escolar.

# Especificação do Projeto

## Perfis de Usuários


|Perfil 1: | **Criança (Aprendiz Lúdico)** |
|----------------|--------------|
| **Descrição:** | Lucas, 9 anos, morador do bairro Castelo (BH). Está na fase inicial de contato com o dinheiro e possui desejos de consumo imediato, como álbuns de figurinhas e brinquedos. |
| **Necessidades:** | Interface visualmente atraente e simplificada, com mecânicas de recompensa imediata (gamificação) e ferramentas que materializem o conceito de poupar de forma lúdica. |

|Perfil 2: | **Adolescente (Explorador de Autonomia)** |
|----------------|--------------|
| **Descrição:** | Vinícius 16 anos, morador da Brasilândia (SP). Estudante de escola pública que faz bicos como entregador e busca independência financeira, mas é vulnerável a promessas de ganhos rápidos online (apostas). |
| **Necessidades:** | Simuladores de risco e probabilidade, conteúdos que conectem finanças a objetivos de carreira/lazer e linguagem que trate a educação financeira como uma ferramenta de liberdade.  |

|Perfil 3: | **Jovem Adulto (Gestor em Formação)** |
|----------------|--------------|
| **Descrição:** | Beatriz, 22 anos, moradora de Ipanema (RJ). Jovem profissional que possui renda própria, mas sofre com o "consumo invisível" e pequenos gastos impulsivos que comprometem o orçamento mensal. |
| **Necessidades:** | Rastreamento automático e categorização de gastos, visualização clara de fluxo de caixa e alertas de limite de orçamento para evitar o endividamento. |

|Perfil 4: | **Usuário com Deficiência (Perfil Transversal)** |
|----------------|--------------|
| **Descrição:** | André, 24 anos, morador da Ceilândia (DF). Massoterapeuta autônomo com deficiência visual que lida com renda variável e busca gerir seus ganhos com total privacidade. |
| **Necessidades:** | Aprender sobre educação financeira com navegação 100% compatível com leitores de tela (leitura de gráficos e tabelas), comandos de voz e interface que respeite padrões de acessibilidade sem depender de ajuda externa. |


