# Programação de Funcionalidades

Implementação do sistema descritas por meio dos requisitos funcionais e/ou não funcionais. Deve relacionar os requisitos atendidos os artefatos criados (código fonte) além das estruturas de dados utilizadas e as instruções para acesso e verificação da implementação que deve estar funcional no ambiente de hospedagem.

Para cada requisito funcional, pode ser entregue um artefato desse tipo.

O professor Rommel Carneiro apresenta alguns exemplos prontos para serem utilizados como referência:
- Login do sistema: [https://repl.it/@rommelpuc/LoginApp](https://repl.it/@rommelpuc/LoginApp) 
- Cadastro de Contatos: [https://repl.it/@rommelpuc/Cadastro-de-Contatos](https://repl.it/@rommelpuc/Cadastro-de-Contatos)


> **Links Úteis**:
>
> - [Trabalhando com HTML5 Local Storage e JSON](https://www.devmedia.com.br/trabalhando-com-html5-local-storage-e-json/29045)
> - [JSON Tutorial](https://www.w3resource.com/JSON)
> - [JSON Data Set Sample](https://opensource.adobe.com/Spry/samples/data_region/JSONDataSetSample.html)
> - [JSON - Introduction (W3Schools)](https://www.w3schools.com/js/js_json_intro.asp)
> - [JSON Tutorial (TutorialsPoint)](https://www.tutorialspoint.com/json/index.htm)

## Exemplo

## Requisitos Atendidos

As tabelas que se seguem apresentam os requisitos funcionais e não-funcionais que relacionam o escopo do projeto com os artefatos criados:

### Requisitos Funcionais

|ID    | Descrição do Requisito | Responsável | Artefato Criado |
|------|------------------------|------------|-----------------|
|RF-01| O sistema deve permitir cadastro e login com perfis distintos: criança, adolescente, jovem adulto, independente e educador. | Lucas | rf01-login.html OK |
|RF-02| O sistema deve permitir que educadores criem turmas, adicionem alunos e vinculem perfis de aprendizagem ao contato docente. | Leticia | rf02-painel.html OK |
|RF-03| O sistema deve ajustar automaticamente a linguagem, visual e complexidade do conteúdo conforme a faixa etária do perfil cadastrado. | Patrícia | dashboard.html OK |
|RF-04| O sistema deve disponibilizar trilhas de aprendizado sobre orçamento, poupança, crédito, consumo consciente e investimentos básicos. | Wilson | trilhas.html |
|RF-05| O sistema deve implementar mecânicas de gamificação: pontuação, níveis, conquistas, rankings e desafios progressivos. | Wilson | ranking.html |
|RF-06| O sistema deve incluir simuladores de probabilidade e risco para ilustrar a diferença entre investimento e apostas. | Gustavo | rf06-simulador.html OK|
|RF-07| O sistema deve oferecer um "Cofre Mágico" virtual onde o usuário deposita moedas e visualiza o progresso da meta de poupança. | Henrique | rf07-cofre-magico.html OK |
|RF-08| O sistema deve oferecer feedback imediato a cada interação, reforçando conceitos financeiros de forma contextualizada. | Lucas | rf08-feedback.js OK |
|RF-09| O sistema deve rastrear e categorizar automaticamente “gastos formigas” (pequenas despesas recorrentes como cafés e transporte). | Henrique | rf09-gastos-formiga.html OK |
|RF-10| O sistema deve permitir o registro manual de ganhos e despesas, com suporte a categorias personalizadas e metas de reserva de emergência. | Leticia | rf10-financeiros.html OK |
|RF-11| O sistema deve exibir relatórios de fluxo financeiro pessoal com gráficos de entradas, saídas e progresso de metas. | Wilson | relatórios.html |
|RF-12| O sistema deve disponibilizar um painel docente com estatísticas de engajamento, desempenho por aluno e progresso por trilha. | Gustavo | rf12-painel-docente.html OK |
|RF-13| O sistema deve permitir que os educadores personalizem trilhas, atribuam desafios específicos e adicionem contextos pedagógicos às turmas. | Gustavo | rf13-gestao-trilhas.html OK|
|RF-14| O sistema deve oferecer trilhas e simulações de planejamento de compras e consumo conscientes ao contexto doméstico. | Patrícia | planejamento-compras.html OK |

## Descrição das estruturas:

## Notícia
|  **Nome**      | **Tipo**          | **Descrição**                             | **Exemplo**                                    |
|:--------------:|-------------------|-------------------------------------------|------------------------------------------------|
| Id             | Numero (Inteiro)  | Identificador único da notícia            | 1                                              |
| Título         | Texto             | Título da notícia                         | Sistemas de Informação PUC Minas é o melhor                                   |
| Conteúdo       | Texto             | Conteúdo da notícia                       | Sistemas de Informação da PUC Minas é eleito o melhor curso do Brasil                            |
| Id do usuário  | Numero (Inteiro)  | Identificador do usuário autor da notícia | 1                                              |

### RF-01 — Cadastro e Login

#### Chave: `monetago_usuarios`

| Nome | Tipo | Descrição | Exemplo |
|------|------|-----------|---------|
| id | Número inteiro | Identificador único do usuário | 1718640000000 |
| nome | Texto | Nome completo informado no cadastro. | Patricia Silva |
| email | Texto | E-mail usado para login. | patricia@email.com |
| senha | Texto | Senha codificada | MTIzNDU2 |
| dataNascimento | Data em texto | Data de nascimento no formato `AAAA-MM-DD`. | 2000-01-01 |
| perfil | Texto | Perfil do usuário: `crianca`, `adolescente`, `jovemAdulto`, `autonomo` ou `educador`. | jovemAdulto |
| escola | Texto ou nulo | Escola/instituição, preenchida apenas para perfil educador. | Escola Estadual Central |
| area | Texto ou nulo | Área de ensino, preenchida apenas para perfil educador. | medio |
| criadoEm | Data/hora em texto | Data e hora do cadastro em formato ISO. | 2026-06-17T14:20:00.000Z |
