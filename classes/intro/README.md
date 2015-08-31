<!--
 backdrop: batman-symbol
-->

# Introdução a NoSQL

---
<!--
  backdrop: batman-lego
-->

# Por que estamos aqui?

---
<!--
  backdrop: emphatic
-->

# Como chegamos até aqui?

---
## O valor dos bancos **relacionais**

- Dados persistidos
  - Arquitetura de duas memórias: principal e secundária
  - Sistemas de arquivos _vs._ bancos de dados
- Concorrência
  - Possibilitar (ou impedir) acessos/gravações simultâneas por mais de um
    usuário
  - Implementado por transações

---
## O valor dos bancos **relacionais** (cont.)

- Integração
  - Mais de uma aplicação acessando/gravando no mesmo banco de dados
  - Implementado por transações também
- Modelo (praticamente) padronizado
  - Apesar de vários "fabricantes", todos usam (praticamente) os mesmos mecanismos
    - _e.g._, dialetos SQL similares, transações funcionam de forma bem parecida

---
# Descompasso de Impedância

<p style="margin:0;">
  ![](../../images/impedance-mismatch.png)
</p>

- Apesar de grandes vantagens, os RDBMSs não são perfeitos
- Desenvolvedores frustram-se pelo **descompasso de impedância**, que é a
  **"diferença entre o modelo relacional e as estruturas de dados na memória"**

---
## Descompaso de Impedância (cont.)

- A frustração dos desenvolvedores era grande
  - Na década de 90, chegou-se a pensar que os RDBMSs seriam substituídos por bancos de dados que replicassem a estrutura _in-memory_ no disco
  - Linguagens orientadas a objeto em crescimento
  - Ideia: bancos de dados orientados a objetos (<abbr title="Object Oriented Database Management System">OODBMS</abbr>)
    - _e.g._, ObjectStore: _"Objects can be created in a database by overloading the operator `new()`"_
      - [Artigo na _Communications of the ACM_](http://dl.acm.org/citation.cfm?doid=125223.125244) descrevendo o funcionamento  

---
## Amenizando o Descompasso

- Linguagens <abbr title="Orientadas a Objetos">OO</abbr> tiveram sucesso, mas
  os bancos não. Motivos:
  - SQL já existia, mas o <abbr title="Object Query Language">OQL</abbr>
    demorou a sair (2001)
  - Divisão do trabalho entre desenvolvedor e DBAs
- Nova ideia para reduzir o descompasso de impedância: **mapeamento
  objeto-relacional**
  - Hibernate, ~~iBATIS~~[MyBATIS](http://blog.mybatis.org/)
- Apesar de ajudar muito, ainda há o problema do mapeamento
  - _e.g._, ao se esquecer que o banco é relacional, tende-se a criar
    consultas caras

---
<!--
  backdrop: emphatic
-->

# **Quantos** bancos de dados devo ter?

---

![](../../images/types-of-use-of-databases.png)

---
<!--
  backdrop: types-of-use-of-databases
  classes: no-bulletasdfadsf
-->

<div class="layout-split-2" style="height: auto;">
  <section style="border-right: 4px dotted silver;" class="bullet">
    <h2>Banco de **Integração**</h2>
    <ul style="text-align: left" class="no-bullet">
      <li>**Várias aplicações** compartilhando o mesmo banco</li>
      <li>Boa comunicação: conjunto consistente de dados persistidos</li>
      <li>Muito mais complexo: demandas e manutenção de várias aplicações</li>
      <li>Um índice necessário a uma aplicação pode piorar o desempenho de outra</li>
      <li>Banco tem que assegurar a integridade dos dados</li>
    </ul>
  </section>
  <section class="bullet">
    <h2>Banco de **Aplicação**</h2>
    <ul style="text-align: left" class="no-bullet">
      <li>Acessado por uma **única aplicação**, feita por **um único time**</li>
      <li>Mais fácil manter e evoluir o _schema_</li>
      <li>Integridade pode ser mantida pela aplicação</li>
      <li>Integração passou a ser feita usando **_web services_**</li>
    </ul>
  </section>
</div>

---
## Uso de **_web services_**

- Mudança **ocorrida no final dos 90s** e início dos 00s
- Aplicações se comunicam usando HTTP
  - **_Text over HTTP_**
  - Antes, usavam outras formas de <abbr title="Remote Procedure Call">RPC</abbr>
- Trouxe mais **flexibilidade para a estrutura dos dados** sendo trocados
  - SQL &#10137; relações
  - XML, JSON &#10137; registros e listas aninhadas
- Integrar sistemas via serviços possibilita:
  - **Desacoplar** armazenamento de dados da disponibilização dos dados
  - **Não usar o banco para integridade, lógica, segurança**
  - Trocar o tipo do banco para outro (_e.g._, não relacional)

---
<!--
  backdrop: attack-of-the-clones
-->

# O Ataque dos ~~Clones~~ _Clusters_
---
## O Ataque dos _Clusters_

- No início dos anos 00s, a bolha (.com) estourou
  - Os _websites_ por si só não angariariam o que as empresas esperavam
  - Passou-se a **apostar na _web_ como um meio** e não como um fim
    - Daí surgiram as **_web apps_**, juntamente com a **_web 2.0_**
      (_e.g._, conteúdo gerado pelo usuário)
- A **demanda por mais infra-estrutura** aumentou muito
  - Várias **fontes de dados surgiram**: redes sociais, atividades em logs,
    mapas
  - Mais interessantes, as _web apps_ passaram a atrair mais usuários

---
## O Ataque dos _Clusters_

- Para lidar com **o aumento de tráfego e dados**, pode-se melhorar a infra-estrutura de _hardware_ usando:
  - Abordagem **vertical**: servidores mais potentes, mais processadores, discos e memória
    - Preços aumentam mais rapidamente quanto mais alto é a demanda
    - Limites reais (físicos)
- Abordagem **horizontal**: dividir os dados em diversos computadores (_culsters_) mais simples
    - **Mais barato**, porque pode-se usar _commodity hardware_
    - Mais sucetível a erro na individualidade, porém muito **mais confiável** em conjunto
    - Virtualmente **sem limites de expansão**

---
## Adoção de _clusters_

- Grandes empresas começaram a preferir a abordagem horizontal
  - Problema: **bancos relacionais não foram projetados para _clusters_**
    - Oracle RAC e Microsoft SQL Server usam um **subsistema de disco compartilhado**
      - Contudo, dependem dele como **único ponto de falha**
    - É  possível separar servidores para conjuntos diferentes dos dados (técnica de _sharding_)
      - A aplicação precisa saber em qual servidor cada conjunto de dados está
      - Perde-se: consultas, integridade referencial, transações entre _shards_
      - Problema de licensiamento: os bancos relacionais tipicamente vendiam a licença para apenas 1 servidor

---
## Google e Amazon

- O descompasso entre bancos relacionais e _clusters_ levaram empresas a repensar seu armazenamento de dados
- Google e Amazon já usavam _clusters_ e ambas possuíam um volume imenso de dados e bastante dinheiro ;)
- Resultados:
  - Google propôs o BigTable
  - Amazon propôs o Dynamo


---
# O Surgimento do NoSQL

- Em 1998, Carlo Strozzi criou um banco de dados relacional de código aberto, mas que não usava SQL
  - Mas isso não tem a ver o nossa aula ;)
- Johan Oskarsson organizou uma [_meetup_](http://www.meetup.com/) para discutir sobre bancos de dados alternativos
  - BigTable e Dynamo haviam inspirado pessoas e organizações a criar bancos para escalar horizontalmente
  - Johan precisava de um nome (algo que desse **uma boa _#hashtag_**)
    - Em um chat, sugeriram (Eric Evans) **NoSQL** e o nome "pegou"

---
## O Surgimento do NoSQL

- Interpretações do nome
  - NoSQL -&gt; ~~Sem SQL~~
  - NoSQL -&gt; ~~Não apenas SQL~~
- Melhor **enxergar NoSQL como um movimento** do que uma tecnologia
- A ideia é ter mais uma ferramenta na caixa
  - Este ponto de vista é chamado de **persistência poliglota**

---
# Sumário (parte 1)

- Bancos **relacionais** são uma **ferramenta de sucesso há 20-30 anos**
  - Persistência, controle de concorrência e integração
- Desenvolvedores frustrados pelo **descompasso de impedância**
- Movimento de encapsular bancos dentro de aplicações e integrá-los usando serviços (_web services_)

---
## Sumário (parte 2)

- Fator vital para mudança: **escalar horizontalmente**
  - Relacionais não foram projetados para isso
- **NoSQL** é um neologismo acidental: **não há uma definição**, mas um conjunto de características:
  - Não relacional
  - Projetado para _clusters_
  - _Open-source_
  - Usos recentes da Web
  - _Schemaless_

---
# Referências

- Livro _"NoSQL Distilled"_
  - Capítulo 1: _Why NoSQL?_
  - Capítulo 2: _Aggregate Data Models_
  - Capítulo 3: _More Details on Data Models_
- [Lista curada de bancos de dados NoSQL](http://nosql-database.org/)
