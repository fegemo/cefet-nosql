<!--
  bespokeEvent: bullets.disable
  backdrop: mongodb-forest
-->

# MongoDB e Node.js

---
<link href='https://fonts.googleapis.com/css?family=Bangers' rel='stylesheet' type='text/css'>

# Roteiro

1. Uma <span style="font-family: Bangers">historinha</span> NoSQL
1. **Modelos de dados** não-relacionais
1. O MongoDB
1. Usando MongoDB + Node.js
---
![](../../images/nosql-cv.png)

---
<!--
  backdrop: chapter
-->

# Uma <span style="font-family: Bangers; color: #351035;">historinha</span> NoSQL

---
# <span style="font-family: Bangers;color:black;">Descompasso de Impedância</span>

<p style="margin:0;">
  ![](../../images/impedance-mismatch.png)
</p>

- Apesar de grandes vantagens, os RDBMSs não são perfeitos
- Desenvolvedores frustram-se pelo **descompasso de impedância**, que é a
  **"diferença entre o modelo relacional e as estruturas de dados na memória"**

---
# <span style="font-family: Bangers;color:black;">O Ataque dos _Clusters_</span>

- Para lidar com **o aumento de tráfego e dados**, pode-se melhorar a infra-estrutura de _hardware_ usando:
  - Abordagem **vertical**: servidores mais potentes, mais processadores, discos e memória
    - Preços aumentam mais rapidamente quanto mais alto é a demanda
    - Limites reais (físicos)
- Abordagem **horizontal**: dividir os dados em diversos computadores (_culsters_) mais simples
    - **Mais barato**, porque pode-se usar _commodity hardware_
    - Mais sucetível a erro na individualidade, porém muito **mais confiável** em conjunto
    - Virtualmente **sem limites de expansão**

---
## <span style="font-family: Bangers;color:black;">Adoção de _clusters_</span>

- Grandes empresas começaram a preferir a abordagem horizontal
  - Problema: **bancos relacionais não foram projetados para _clusters_**
    - Oracle RAC e Microsoft SQL Server usam um **subsistema de disco compartilhado**
      - Contudo, dependem dele como **único ponto de falha**
    - É  possível separar servidores para conjuntos diferentes dos dados (técnica de _sharding_)
      - A aplicação precisa saber em qual servidor cada conjunto de dados está
      - Perde-se: consultas, integridade referencial, transações entre _shards_
      - Problema de licensiamento: os bancos relacionais tipicamente vendiam a licença para apenas 1 servidor

---
## <span style="font-family: Bangers;color:black;">Google e Amazon</span>

- O descompasso entre bancos relacionais e _clusters_ levaram empresas a repensar seu armazenamento de dados
- Google e Amazon já usavam _clusters_ e ambas possuíam um volume imenso de dados e bastante dinheiro ;)
- Resultados:
  - Google propôs o [BigTable, 2006](http://static.googleusercontent.com/media/research.google.com/pt-BR//archive/bigtable-osdi06.pdf)
  - Amazon propôs o [Dynamo, 2007](http://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)

---
# <span style="font-family: Bangers;color:black;">O Surgimento do NoSQL</span>

- Em 1998, Carlo Strozzi criou um banco de dados relacional de código aberto, mas que não usava SQL
  - Mas isso não tem a ver com nossa aula ;)
- Johan Oskarsson organizou uma [_meetup_](http://www.meetup.com/) para discutir sobre bancos de dados alternativos
  - BigTable e Dynamo haviam inspirado pessoas e organizações a criar bancos para escalar horizontalmente
  - Johan precisava de um nome (algo que desse **uma boa _#hashtag_**)
    - Em um chat, sugeriram (Eric Evans) **NoSQL** e o nome "pegou"

---
## <span style="font-family: Bangers;color:black;">O Surgimento do NoSQL</span>

- Interpretações do nome
  - NoSQL -&gt; ~~Sem SQL~~
  - NoSQL -&gt; ~~Não apenas SQL~~
- Melhor **enxergar NoSQL como um movimento** do que uma tecnologia
- A ideia é ter mais uma ferramenta na caixa
  - Este ponto de vista é chamado de **persistência poliglota**

---
<!--
  backdrop: chapter
-->

# Modelos de dados **não-relacionais**

---
## Introdução

- <p class="note" style="float:right;width: 40%;">Um **modelo de dados**
  é a forma como **vemos e manipulamos nossos dados**</p>
  Modelo de dados é diferente de modelo de armazenamento
  - O modelo relacional usa **relações (tabelas) e tuplas (linhas/registros)**
  - Modelos NoSQL são divididos em 4 grandes tipos:
    1. _key-value_ (chave-valor)
    1. _documents_ (documentos)
    1. _column-family_ (famílias de colunas)
    1. _graph_ (grafo)
  - Os 3 primeiros têm uma característica em comum: são **orientados a
    agregados**
    - Vamos ver o que isso significa... mas primeiro, o que o
      <span style="font-family: Ravie, Bangers, Comic Sans MS, cursive; color: gray;">cachorritos</span> tem
      a dizer sobre tudo isso?

---
![](../../images/nosql-bar.png)

---
## Um agregado

- Às vezes (_e.g._ quando programamos) é mais fácil pensar e usar registros
  mais complexos que uma tupla - que permitam listas e aninhamento

<p class="note" style="width: 70%;">Um **agregado** é uma **coleção de objetos**
relacionados que queremos **tratar de forma unitária**</p>

- Em particular:
  1. **Operações atômicas** são realizadas por agregado (ACID)
  1. O banco matém **consistência no nível dos agregados**
  1. **Comunicamos com o banco** usando agregados

---

<div class="layout-split-2">
  <section style="border-right: 4px dotted silver;" class="bullet">
    <h2>Tupla</h2>
    <img src="../../images/tuple.png">
  </section>
  <section class="bullet">
    <h2>Agregado</h2>
<pre>
<code class="hljs lang-json" style="text-align: left;">
{
  "id": 1,
  "name": "Martin",
  "billingAddress": ["Chicago"]
}
</code>
</pre>
  </section>
</div>

---
# Principais **modelos de Dados NoSQL**

<figure style="position: relative;width:100%;height:260px;">
  <img src="../../images/model-flavors.png" class="bullet bullet-no-anim" style="position:absolute;top:0;left:0;">
  <img src="../../images/model-flavors-2.png" class="bullet bullet-no-anim" style="position:absolute;top:0;left:0;">
</figure>

- [Lista curada](http://nosql-database.org/) de bancos NoSQL (150 _and counting_ :)

---
## Tipo: **_Document_**

- ![right](../../images/document-scheme.png)
  _Key-Value_ com um pouco mais de estrutura
- Valor armazenado utiliza formatos como `XML, JSON, BSON`
- Estrutura de documentos flexíveis.
- Consultas por campos dos documentos.
- Inserção de documentos e atualização de campos

---
<!--
  backdrop: mongodb-forest
-->

# ![MongoDB](../../images/mongodb-large.png)

---
## Por que o MongoDB?

![](../../images/document-dbs-trends.png)

[https://www.google.com/trends/explore#q=MongoDB...](https://www.google.com/trends/explore#q=MongoDB%2C%20CouchDB%2C%20RethinkDB%2C%20RavenDB&cmpt=q&tz=Etc%2FGMT%2B2)

---
## ![](../../images/mongodb.png)

<p class="note" style="width: 90%;">
  _“MongoDB” derives from the word **“humongous”** because of its ability to
  scale up with ease and hold very large amounts of data._
</p>

- Dados possuem formato flexível
- Nossa interface com o banco é feita por documentos no formato
  <abbr title="JavaScript Object Notation">`JSON`</abbr>, mas
  são armazenados em <abbr title="Binary JSON">`BSON`</abbr>
  - `BSON` ocupa bem menos espaço
  - `BSON` possui bem mais tipos de dados do que `JSON`
- Relações podem ser representadas como referências ou como documentos
  aninhados (embutidos)
- _Whitepaper_ da [Arquitetura do MongoDB](http://s3.amazonaws.com/info-mongodb-com/MongoDB_Architecture_Guide.pdf)

---
## Por onde começar (1)

![](../../images/mongodb-site.png)

- [Site do MongoDB - _open-source_](https://www.mongodb.org/)
- [Site da empresa do MongoDB ](https://www.mongodb.com/)

---
## Por onde começar (2)

![](../../images/mongodb-university.png)

- [Universidade MongoDB](https://university.mongodb.com)
  1. MongoDB para desenvolvedores (Java, .NET...)
  1. MongoDB para DBAs, etc.

---
## JSON e BSON

- `JSON` é um [formato aberto](http://json.org/) para representação de dados,
  **fácil para pessoas e máquinas lerem**
  - <img src="../../images/crockford.jpg" class="portrait right">
    Criado por Douglas Crockford, Engenheiro da YAHOO
- Pode ser usado pelo mesmo objetivo que o `XML`: **interoperabilidade de
  dados**
- Possui alguns tipos de dados:
  1. Números (_double_ de 64 bits)
  1. _Strings_ (texto)
  1. Valores _Boolean_ (`true`/`false`)
  1. _Arrays_
  1. Objetos (estilo tabelas _hash_)

---
## Exemplo de um Objeto em JSON

- Arquivo `celebridade_da_computacao.json`
  ```json
  {
    "_id" : 1,
    "nome" : { "primeiro" : "John", "ultimo" : "Backus" },
    "contribs" : [ "Fortran", "ALGOL", "Backus-Naur Form" ],
    "premio" : [
      {
        "nome" : "W.W. McDowell Award",
        "ano" : 1967,
        "entregue_por" : "IEEE Computer Society"
      }
    ]
  }
  ```

---
## Formato **JSON para Armazenar**

- Não é a melhor ideia, visto que:
  - O formato `JSON` não tem um tipo:
    1. Para data/_timestamp_
    1. Para diferenciar números inteiros/reais, 32/64bits
    1. Para representar um campo binário (_e.g._, imagem)
  - Ele é textual, então ocupa mais espaço em disco do que se fosse binário

---
## Formato **BSON**

- Os criadores do MongoDB propuseram, então, o
  **[_Binary `JSON`_](http://bsonspec.org/)**, que o **`JSON` atendesse a
  demanda de armazenamento**

  ![](../../images/json-bson.png)
  - Além dos tipos mencionados, há também o tipo `ObjectId`

---
## Documentos: **_ObjectId_**

- O `ObjectId` é um tipo de dados `BSON` usado como chave dos documentos
  - Ele tem 12 _bytes_ e é construído por:
    ![4 bytes representando um timestamp do "agora", 3 bytes identificando a máquina, 2 bytes identificando o process id, 3 bytes de um contador, iniciando de um número aleatório](../../images/mongodb-objectid.png)
  - A ideia é que o `ObjectId` de cada documento seja único na coleção
  - **Todo documento recebe um campo `_id`**, com um valor de `ObjectId` único
    gerado pelo banco
    - Contudo também podemos passar um valor único nosso para `_id`

---
## Ferramentas

|                   | MongoDB          | MySQL  | Oracle  | Informix  | DB2        |
|-------------------|------------------|--------|---------|-----------|------------|
| Servidor do Banco | [mongod][mongod] | mysqld | oracle  | IDS       | DB2 Server |
| Cliente           | [mongo][mongo]   | mysql  | sqlplus | DB-Access | DB2 Client |

- Além de `mongod` e `mongo`, há diversas ferramentas auxiliares. Algumas são:
  - `mongoimport`, `mongoexport`
  - [Robomongo](http://robomongo.org/) (_3rd-party_)
  - [E outras várias ferramentas administrativas](http://docs.mongodb.org/ecosystem/tools/administration-interfaces/) não oficiais

[mongo]:http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo
[mongod]: http://docs.mongodb.org/manual/reference/program/mongod/#bin.mongod


---
<!--
  backdrop: emphatic
-->

# DQL, DML e DDL

---
## **Consultas**

- Todas as consultas são feitas usando o método `db.collection.find()`
  - Recebe os **critérios**, **projeção** e retorna um **cursor**
- Todas as consultas **operam em uma <u>única coleção</u>**
- Consulta em MongoDB:
  ![](../../images/mongodb-query1.png)
- Em um banco relacional:
  ![](../../images/mongodb-query2.png)

---
## <abbr title="Data Query Language">D**Q**L</abbr>: **Consultas**

![](../../images/mongodb-find1.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - **WHERE**

![](../../images/mongodb-find2.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - WHERE (2)

![](../../images/mongodb-find3.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - **Regex**

![](../../images/mongodb-find4.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - **Ordenando**

![](../../images/mongodb-find5.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - **Contando**

![](../../images/mongodb-find6.png)

---
## <abbr title="Data Query Language">DQL</abbr>: Consultas - **_Limit_ e _Skip_**

![](../../images/mongodb-find7.png)

---
## <abbr title="Data Definition Language">D**D**L</abbr>: **Criar**

![](../../images/mongodb-create-alter.png)

---
## <abbr title="Data Definition Language">DDL</abbr>: Alterar (**novo campo**)

![](../../images/mongodb-alter.png)

---
## <abbr title="Data Definition Language">DDL</abbr>: Alterar (**remover campo**)

![](../../images/mongodb-alter-drop.png)

---
## <abbr title="Data Manipulation Language">D**M**L</abbr>: **Inserção**

![](../../images/mongodb-insert.png)

---
## <abbr title="Data Manipulation Language">DML</abbr>: **Atualização**

![](../../images/mongodb-update.png)

---
## <abbr title="Data Manipulation Language">DML</abbr>: **Exclusão**

![](../../images/mongodb-remove.png)

---
<!--
  backdrop: emphatic
-->

# Modelando os Dados

---
## Modelagem

- Dados no MongoDB possuem _schema_ flexível (_schemaless_)
  - Coleções não forçam a estrutura de seus documentos
  - Isso reduz o descompasso de impedância
- O desafio é modelar os dados de forma a atender:
  1. **A demanda da aplicação** (que tipos de uso dos dados serão feitos)
  1. As características de desempenho do MongoDB
  1. Os padrões de recuperação dos dados (relatórios)
- A principal decisão é sobre a **estrutura dos documentos**:
  1. **Referências** entre documentos
  1. Documentos **embutidos**

---
## Documentos: Estrutura com **Referências**

- Estrutura normalizada
- Referências armazenam relacionamentos entre documentos
- **Aplicações** podem usá-las para acessar dados relacionados

![](../../images/mongo-structure1.png)

---
## Documentos: Estrutura **Embutida**

- Estrutura desnormalizada
- Capturam os relacionamentos ao armazenar objetos aninhados
- Torna o _sharding_ possível/eficiente

![](../../images/mongo-structure2.png)

---
## Documentos: Operações de Escrita

- Escritas são **atômicas no nível de um documento**
- Um modelo de dados desnormalizado facilita as escritas atômicas
- Normalizar os dados em várias coleções pode requerer múltiplas operações
  de escrita que não são atômicas
  - Aumento no risco de inconsistência

---
## Critérios para escolher a estrutura

<div class="layout-split-2" style="height: auto;">
  <section style="border-right: 4px dotted silver;">
    <h3><u>Embutidos</u></h3>
    <ul style="text-align: left;">
      <li>Usar quando:
        <ul>
          <li>Há relações de "contém" entre entidades (_one-to-one_)</li>
          <li>Há relações de um-pra-muitos entre entidades</li>
        </ul>
      </li>
      <li>**Desempenho para leitura** (muito) melhor </li>
      <li>É possível **alterar** dados de forma **atômica**</li>
      <li>Requer **mais espaço**</li>
      <li>Pode causar **incosistência**</li>
    </ul>
  </section>
  <section>
    <h3><u>Referências</u></h3>
    <ul style="text-align: left;">
      <li>Usar quando:
        <ul>
          <li>Embutir resultaria em duplicação mas pouco ganho de desempenho</li>
          <li>Representar relacionamentos mais complexos (_many-to-many_)</li>
          <li>Modelar grandes _datasets_ hierárquicos</li>
        </ul>
      </li>
      <li>Mais flexibilidade</li>
      <li>Menos espaço para armazenar</li>
      <li>Desempenho menor</li>
    </ul>
  </section>
</div>

---
<!--
  backdrop: chapter
-->

# MongoDB + Node.js

---
## Usando MongoDB com Node.js

- Há pelo menos duas opções:
  1. Usar o **_driver_** do MongoDB para Node.js:
    ```
    npm install --save mongodb
    ```
    - API muito parecida àquela do próprio MongoDB
  1. Usar alguma **biblioteca de mapeamento de objetos** (_e.g._, Mongoose):
    ```
    npm install --save mongoose
    ```
    - Facilidades como: validação de _schema_, _pseudo-joins_ etc.
    - É uma camada de abstração acima do _driver_

---
## Usando o **_driver_** diretamente (1/2)

```js
var MongoClient = require('mongodb').MongoClient;

// URL de conexão ao banco
var url = 'mongodb://localhost/blogIncrivel';

MongoClient.connect(url, function(err, db) {
  console.log('woot woot - conectou!');

  // aqui podemos executar operações
  // ...
  db.close();
});
```

---
## Usando o **_driver_** diretamente (2/2)

- Inserindo um documento (uma postagem):
  ```js
  db.collection('postagens').insert({
    autor: 'Flavio Coutinho',
    titulo: 'A Floresta Encantada de Igarapé',
    texto: 'Em uma terra longínqua e cheia de mistérios [...]'
  });
  ```
- Recuperando as últimos 5 postagens do autor "Flávio":
  ```js
  db.collection('postagens').find({ autor: 'Flavio' }).limit(5)
    .toArray(function(err, posts) { console.log(posts[0]); });
  ```

---
## Usando o **Mongoose**

```js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogIncrivel');

var Post = mongoose.model('Postagem', {
  autor: String,
  titulo: String,
  texto: String
});

var post = new Post({ autor: 'Flavio Coutinho' /*...*/ });
post.save(function (err) {
  if (!err) {
    console.log('Post foi salvo!');
  }
});
```

---
## Sobre o **Mongoose**

<p class="note" style="width: 70%"><em>Mongoose provides a straight-forward,
**schema-based** solution to model your application data. It includes
built-in type casting, **validation**, **query building**, business logic
hooks and more, out of the box.</em></p>

- Site oficial: http://mongoosejs.com/

---
# Referências

- Livro _"NoSQL Distilled"_
  - Capítulo 1: _Why NoSQL?_
  - Capítulo 2: _Aggregate Data Models_
  - Capítulo 8: _Document Stores_
- [Manual do MongoDB](http://docs.mongodb.org/manual/core/) (3.0)
