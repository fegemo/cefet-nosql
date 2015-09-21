<!--
  bespokeEvent: bullets.disable
-->

# _Document Stores_

---
# Roteiro

1. Como funcionam os bancos de documentos
1. Exemplos de bancos de documentos
1. O MongoDB
1. Quando usar + quando não usar

---
## Introdução aos Bancos de Documentos

- **Documentos** são o principal conceito
- Um banco de dados orientado a documentos armazena e recupera documentos
  - Eles podem ser **salvos em formatos "interoperáveis"**:
    - <abbr title="eXtensible Markup Language">XML</abbr>, <abbr title="JavaScript Object Notation">JSON</abbr>, <abbr title="Binary JSON">BSON</abbr> etc.
- Documentos são:
  - Auto-descritivos
  - Estruturas de dados hierárquicas (mapas, coleções e escalares)
    ```json
    {
      "name": "Sue",
      "age": 26,
      "groups": ["news", "sports"]
    }
    ```
---
## O que é um Banco de Documentos

- Eles armazenam documentos como o a parte **valor** dos bancos _key-value_,
  sendo que os documentos:
  - São indexados usando uma _BTree_
  - São consultados usando API para linguagens (não há SQL)
- Considere um banco de documentos como um _key-value_ onde o _value_ é
  examinável pelo banco (`WHERE`)

| Oracle                      | MongoDB              |
|-----------------------------|----------------------|
| instância de banco de dados | instância do MongoDB |
| schema                      | database             |
| table                       | collection           |
| row                         | document             |
| rowid                       | _id                  |

---
## Exemplo: **Coleção** de viajantes

```json
{
  "firstname": "Martin",
  "likes": ["Biking", "Photography"],
  "lastcity": "Boston"
}
```
```json
{
  "firstname": "Pramod",
  "lastcity": "Chicago"
}
```

- Documentos de uma coleção podem ter atributos diferentes
- Isto difere de uma tabela relacional onde colunas:
  - Armazenam o mesmo tipo de valor ou `null`

---
<!--
  backdrop: chapter
-->

# Exemplos de bancos de documentos
---
# Alguns Bancos de Documentos

- [**MongoDB**](https://www.mongodb.org/)
  - JSON, API com drivers, _auto-sharding_
- [CouchDB](http://couchdb.apache.org/)
  - JSON, JavaScript para MapReduce e acesso via HTTP
- [RethinkDB](https://www.rethinkdb.com/)
  - JSON, _real-time_, API com drivers
- [RavenDB](http://ravendb.net/)
  - JSON, Transações ACID, acesso via HTTP ou .NET

---
## <abbr title="Cluster of unreliable commodity hardware">Couch</abbr>DB

- ![right](../../images/couchdb.png)
  Escrito em Erlang, 2005-2008, doado à fundação Apache
- Documentos armazenados em `JSON`
- A linguagem de consulta é em JavaScript/RESTful WebService e
  suporta MapReduce
- Conceito de <abbr title="Multi-Version Concurrency Control">MVCC</abbr> como
  uma estratégia de **resolução otimista para conflitos**

---
## CouchDB: Características

- Característica de destaque: **replicação _multi-master_**
  - Todo nó pode **escrever**
  - Diferente de _peer-to-peer_ porque é síncrono
  - É possível por causa do estilo _append-only_ dos _commits_
- Versões para dispositivos móveis
- Interação com os dados via HTTP (RESTful WebService) apenas
  - Não há um protocolo binário

---
## ![](../../images/rethinkdb.png)

- Escrito em C++, executa em Linux e OSX
- Armazena documentos no formato JSON
- Principal característica: **notificação de atualizações para aplicação
  _real-time_**
- Suporta MapReduce e consultas geoespaciais

```js
r.table('tv_shows')
  .insert([
    { name: 'Star Trek TNG', episodes: 178 },
    { name: 'Battlestar Galactica', episodes: 75 }
  ]);
```

---
<!--
  backdrop: chapter
-->

# O MongoDB
---
## O MongoDB

---
<!--
  backdrop: chapter
-->

# Quando usar + quando não usar
---
## Vantagens

- Documentos são unidades independentes
- Lógica de aplicação é fácil de escrever
- _Schema free_:
  - Dados não estruturados podem ser facilmente armazenados
  - Migrações de dados podem ser evitadas já que o banco não precisa
    ter conhecimento de um _schema_

---
<div class="layout-split-2" style="height: auto;">
  <section style="border-right: 4px dotted silver;">
  <h2>Quando usar</h2>
    <ul style="text-align: left">
      <li>**Log de eventos**: diferentes tipos de eventos, várias aplicações</li>
      <li>**Gerenciadores de Conteúdo**: _schema free_ dá flexibilidade</li>
      <li>**_Web Analytics_**: atualizar contadores e outras métricas</li>
      <li>**_E-commerce_**: _schema_ flexível para diferentes categorias
        de produtos</li>
    </ul>
  </section>
  <section>
    <h2>Quando não usar</h2>
    <ul style="text-align: left">
      <li>**Transações com muitas operações**: atomicidade de operações entre
        documentos não é garantido. Novos bancos têm suporte: RabenDB</li>
      <li>**Consultas sobre estruturas agregadas que mudam muito**: se a
        estrutura dos agregados está sob constante alteração, eles devem
        ser normalizados</li>
    </ul>
  </section>
</div>
