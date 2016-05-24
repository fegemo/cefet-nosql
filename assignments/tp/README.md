# Trabalho Prático:

Este trabalho prático tem como objetivo consolidar os conceitos de NoSQL
que vimos em sala de aula. Para isso, vamos colocar a mão na massa e construir
uma aplicação web simples que faça uso de um banco NoSQL para armazenar seus
dados.

Este trabalho deve ser feito individualmente. Você deve criar uma aplicação web
que possibilite um usuário gerenciar uma lista de tarefas a serem cumpridas.
Ou seja, seu programa deve possibilitar:

1. Usuários entrarem com seus `id` e senhas (não precisa deixar registrar);
  - Deixe um usuário com `id` igual a "teste" e senha igual a "nosql" para que
    o professor possa acessar e corrigir o trabalho
  - Um usuário deve ser descrito por um nome, sobrenome, `id`, email, senha e
    idade
1. Dividir e ver suas tarefas em listas diferentes (_e.g._, trabalho,
  casa, estudos) e poder criar novas listas;
1. Criar, editar e completar tarefas
  - Uma tarefa deve ser descrita por um título, uma descrição mais detalhada,
    uma data de criação e uma data de conclusão

O sistema deve possuir, minimamente, duas telas:

1. Tela de _login_
2. Tela mostrando as tarefas da lista selecionada
  - Nessa tela, o usuário pode:
    - Fazer _logout_
    - Criar, completar ou editar uma tarefa
    - Criar uma lista de tarefas
    - Alterar a lista de tarefas sendo exibida
    - Ver as tarefas da lista de tarefas selecionada
  - Além disso, o usuário deve conseguir ver seu nome e email no canto da tela
    (mostrando quem está "logado")

Você deve publicar seu site em algum serviço de hospedagem gratuito. A
linguagem de _back-end_ usada para construir a aplicação web é livre, mas o
banco de dados deve ser NoSQL. Você tem total liberdade para escolher, mas
procure algum serviço de hospedagem preferencialmente gratuito que ofereça a
combinação de linguagem + banco de dados com que você pretende fazer o trabalho.

Sugestões de alguns serviços de hospedagens com planos gratuitos:

- [Heroku][01394f6e]
  - [Ruby, PHP, JS, Python, Meteor, Java, Groovy, Scala ...] + Redis gratuito
- [Mongolab][02028313] - hospedagem gratuita de MongoDB até 500 MB
- [Compose.io][6d6d0220]
    - MongoDB, RethinkDB, Redis
- [Modulus][e16e100e]
  - [JS, PHO, Java, Meteor] + MongoDB gratuito
- [Google Cloud Platform][1c1fa3c7] - Cassandra


[01394f6e]: http://heroku.com "Site do serviço de hospedagem Heroku"
[02028313]: https://mongolab.com/ "Site do serviço de bancos de dados Mongolab"
[e16e100e]: https://modulus.io/ "Site do serviço de hospedagem de aplicações e MongoDB Modulus"
[6d6d0220]: https://www.compose.io/ "Site do serviço de bancos Compose.io"
[1c1fa3c7]: https://console.developers.google.com "Site do serviço de hospedagem da Google"


---
## O que faz perder nota

Alguns descuidos podem fazer com que sua nota fique abaixo do esperado:
- Seu trabalho não executa: nota 0
- Cópia de trabalho de outrem: nota 0
- Ausência de qualquer item obrigatório da entrega (descrito na próxima seção)
- Ausência de itens da especificação
- Atraso na entrega. Cada dia de atraso reduz o valor máximo de nota da
 maneira abaixo. Considere `x` como dias de atraso e `y` a penalidade
 percentual na nota:

 ![Fórmula de penalidade por atraso](../../images/penalidade-por-atraso.png)
 - Isso implica que 1 ou 2 dias de atraso são pouco penalizados
 - E após 5 dias de atraso, o trabalho vale 0
 - _Seeing is believing_: https://www.google.com.br/search?q=y%3D(2%5E(x-2)%2F0.16)%2Cy%3D100

## O que deve ser **entregue**

Deve ser entregue **um arquivo .tar.gz ou .zip** via **Moodle** contendo:

1. Todo o código fonte da aplicação web e do _schema_ do banco, caso haja um
1. Um arquivo **README** contendo:
  - Link para a aplicação funcionando, publicada da Internet
  - Principais decisões de implementação, especialmente no que tange à
     modelagem dos dados

Qualquer dúvida, entre em contato comigo. Ou acrescente a sua interpretação no
arquivo README e mãos à obra.
