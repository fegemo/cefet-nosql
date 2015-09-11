<!--
 backdrop: batman-symbol
-->

# Teoria Subjacente ao NoSQL

---
## Roteiro

1. **_Views_ Materializadas**
1. **Modelando para Acesso aos Dados**
1. Modelos de **Distribuição** (capítulo 4)
1. Consistência e **Teorema CAP** (capítulo 5)
1. Modelos de Processamento e **_MapReduce_** (capítulo 7)

---
<!--
  backdrop: chapter
-->
# _Views_ Materializadas

---
## Modelo Orientado a **Agregados**

- Vimos o que são os modelos agregados e algumas vantagens que eles têm
  - Faz sentido manter, _e.g._, os itens de um pedido dentro de um documento de
    pedido
- Contudo, o modelo orientado a agregados fica em **desvantagem na realização
  de consultas analíticas (relatórios)**
  - O custo do JOIN é caro e consultas analíticas são cheias deles
  - Uma solução é criar índices, mas mesmo assim a performance sofre porque
    os dados podem estar em nós diferentes

---
## _Views_ Materializadas: RDBMSs

- Bancos relacionais oferecem um **mecanismo para lidar com consultas analíticas,
  que são as _views_**
- **Uma _view_ é** como uma **tabela** relacional, mas é **definida por
  computação** em cima das tabelas base
- Quando uma _view_ é acessada, o banco executa a computação necessária
- Ou a _view_ pode ser **materializada: computada previamente e armazenada**
  no disco

---
## _Views_ Materializadas: NoSQL

- Bancos **NoSQL não possuem _views_**, mas podem ter consultas
  pré-computadas e armazenadas
  - Podemos pensar que, nesses bancos, devemos **fazer o JOIN em tempo de
    inserção, e não em tempo de consulta**
- Este é um aspecto fundamental dos bancos orientados a agregados
  - Já que algumas consultas não se encaixam bem na estrutura agregada
- Normalmente, **_views_ materializadas são criadas** e mantidas usando
  computação no **modelo _Map-Reduce_**

---
## _Views_ Materializadas: Abordagens

- Há duas abordagens: _eager_ e _lazy_
  1. _Eager_: a _view_ materializada é atualizada quando os dados originais
    são atualizados ou inseridos
    - Melhor alternativa quando temos mais leitura do que escrita
  1. _Lazy_: atualizações nas _views_ materializadas ocorrem via
    _batch jobs_ em intervalos regulares
    - Boa alternativa quando atualização dos dados não é de importância
      crítica

---
## _Views_ Materializadas: Abordagens (2)

- As _views_ podem ser criadas fora do banco de dados
  - Podemos ler os dados, computar a _view_ e salvá-la de volta ao banco
    **(_Map-Reduce_)**
- Normalmente o próprio banco de dados suporta a construção de _views_
  materializadas por ele mesmo
  - Nós provemos qual a computação para gerar e o banco a executa
    apenas quando necessário **(_Map-Reduce_ Incremental)**

---
<!--
  backdrop: chapter
-->

# Modelando para Acesso aos Dados
---
## Modelando para Acesso aos Dados

- Agora vamos considerar como podemos modelar os dados quando usamos um
  modelo orientado a agregados
- Devemos considerar:
  1. Como os dados serão lidos/acessados/usados
  1. Quais são os efeitos colaterais aos dados relacionados a esses
    agregados
- Vejamos um cenário de _e-commerce_ nos 4 tipos de modelos de dados NoSQL

---
## Modelando: **_key-value store_**

- ![right](../../images/modeling-keyvalue.png)
  Neste cenário, a aplicação pode ler a informação do cliente e todos os
  dados relacionados usando a chave (_key_)
- Se precisarmos recuperar "os produtos vendidos em cada pedido" devemos
  ler e percorrer todo o objeto
  - Afinal, o _value_ é apenas um "blob" que o banco armazena e envia pro
    cliente, que deve fazer _parse_ dele

---
## Modelando: **_document_**

- ![right](../../images/modeling-document.png)
  Quando referências são necessárias, podemos usar documentos e consultar
  por campos específicos
- Com referências podemos encontrar pedidos independentemente dos clientes
- Em bancos de documentos, como eles permitem consulta por atributo (campo),
  é fácil (e barato) consultar e.g. "todos os pedidos que incluem o produtos X"

---
## Modelando: **_column-family_**

- Há várias formas - a regra geral é **tornar a consulta fácil e barata**,
  **desnormalizando** os dados **durante a escrita**
- Ao usar um banco _column-family_, **modele de acordo com o requisito da
  consulta e não do ponto de vista de armazenamento**
- Devemos usar do fato de que colunas são ordenadas e famílias de colunas
  são recuperadas juntas pelo banco de dados

---
## Modelando **_column-family_**

- ![right](../../images/modeling-columnfamily2.png)
  ![right](../../images/modeling-columnfamily1.png)
  Podemos colocar cliente e pedido em famílias de _"column-family"_
- A referência para todos os pedidos feitos por cliente está no cliente (mas
  o pedido também refere ao cliente)
- Outras **desnormalizações** são normalmente feitas para **melhorar o
  desempenho de leitura**

---
## Modelando: **_graph databases_**

- ![right](../../images/modeling-graph.png)
  Modelamos objetos como nós e relacionamentos como arestas
- Relacionamentos têm tipos e direção de significado
- Relacionamentos têm nomes, que possibilitam navegar pelo grafo
- Bancos de grafos permitem consultar, _e.g._:
  - Liste todos os clientes que compraram o livro "A Torre Negra"

---
<!--
  backdrop: chapter
-->

# Modelos de Distribuição

---
# Modelos de Distribuição

- Já discutimos as vantagens de se escalar verticalmente _vs._ horizontalmente
  - Horizontalmente é mais atrativo porque podemos ter os bancos de dados em
    _clusters_
  - Dependendo do modelo de distribuição, o banco pode proporcionar habilidade
    de:
    1. Lidar com grandes volumes de dados
    1. Processar tráfego de leitura/escrita maior
    1. Ter melhor disponibilidade em caso de problemas na rede

---
## Modelos de Distribuição

- Os benefícios são importantes e muito bons, mas eles têm seu preço
  - Executar sistemas em _clusters_ introduz complexidade ao problema
- Há duas abordagens para distribuição de trabalho:
  1. Replicação
    - Uma cópia dos dados em cada nó
  1. _Sharding_ (Estilhaçamento dos dados)
    - Dados diferentes em cada nó
- Vejamos algumas configurações possíveis dos modelos

---
## Modelo: **Servidor Único**

- A primeira e mais simples forma de distribuição
- Consiste em ter o banco de dados em apenas um computador
- Faz sentido usar um banco NoSQL em um único servidor:
  - Já que o modelo agregado está mais próximo do modelo de dados
    da aplicação
- Bancos de dados NoSQL de grafos não são apropriados para _clusters_
- Se o uso dos dados é bem voltado à manipulação de agregados, um _key-value_
  ou um _document store_ pode ter melhor desempenho do que um relacional

---
## Modelo: **_Sharding_**

- Frequentemente, um banco fica ocupado porque **pessoas diferentes estão acessando
  partes diferentes dos dados**
- Nesse caso, pode-se escalar horizontalmente ao colocar partes diferentes dos
  dados em servidores diferentes (_sharding_)
- O conceito de _sharding_ não é novidade do NoSQL - já existia antes
  - Contudo, era controlado na aplicação e não no banco
- Consistia em (_e.g._) colocar todos os clientes A-D em um _shard_, E-G em
  outro...
---
## Modelo: **_Sharding_** (2)

- _Sharding_ torna o modelo de programação mais complexo já que o código da
  aplicação precisa distribuir a carga entre os _shards_
- Idealmente, cada usuário deveria acessar um servidor diferente e apenas um
  servidor
  - Mas o caso ideal é ideal :)

---
## _Sharding_: Abordagens

- Para tentar aproximar do caso ideal, precisamos garantir que dados acessados
  em conjunto ("JOIN") fiquem armazenados no mesmo nó
  - Isso é muito simples usando agregados
    - **Agregados formam uma unidade natural para ser distribuída**
- Ao considerar a distribuição dos dados entre os nós temos mais alternativas:
  - _E.g._, se um cliente de Manaus acessa o sistema, seus dados (agregados)
    estarão todos em um nó (_shard_) que está na região Norte

---
## _Sharding_: Abordagens

- Deve-se considerar também que o acesso aos nós deve ser o mais balanceado
  possível
- Os agregados devem ser distribuídos uniformemente para que cada nó receba
  a mesma quantidade de carga
- Outra abordagem é colocar agregados juntos se supomos que eles serão lidos
  em sequência (_column-family_)
  - _E.g._, o BigTable armazena informações sobre páginas _web_ ordenando de
    acordo com o reverso dos domínios das páginas
    ![](../../images/bigtable-reversed-row-keys.png)

---
## _Sharding_ e NoSQL

- Em geral, muitos bancos NoSQL oferecem _auto-sharding_
- Isso torna muito mais fácil usar essa técnica de distribuição em uma aplicação
- _Sharding_ melhora muito o desempenho porque **melhora os tempos de leitura e
  escrita**
  - Já que cada nó é responsável tanto pela escrita quando pela leitura de seus
    agregados

---
## _Sharding_ e Resiliência

- **_Sharding_ faz pouco pela resiliência dos dados** quando usado sozinho
  - Já que dados diferentes estão em cada nó, **a perda de um servidor faz com
    que seus dados fiquem indisponíveis**
- Assim, na prática, fazer **apenas _sharding_ pode reduzir a resiliência**

---
## _Sharding_: o momento certo

- Alguns bancos são destinados a sofrerem _sharding_ desde o início
- Outros permitem usuários começaram com um único nó e depois distribuir
- Contudo, fazer o _sharding_ muito tardio pode causar problemas:
  - Especialmente quando feito em produção

---
# Replicação

---
## Replicação **_Master-Slave_**

- Nesta configuração, um nó é designado como _master_ (primário) e os outros
  como _slaves_ (secundários)
  - O **_master_** é a fonte autoritativa dos dados e o **único que pode escrever**
  - Os **_slaves** são usados apenas **para leitura**
- Um **processo de replicação sincroniza os dados** dos _slaves_ com os do _master_
- É **útil quando** se tem um _dataset_ em que se faz **muita leitura**

---
## Replicação _Master-Slave_ (2)

- Escala-se horizontalmente ao adicionar mais _slaves_
  - Contudo, ainda estamos **limitados à capacidade do único _master_** de
    **processar escritas**
- Um benefício é a **resiliência de leitura**:
  - Se o _master_ falha, ainda é possível ler dos _slaves_
  - Mas escritas só estarão disponíveis quando o _master_ for restaurado

---
## Replicação _Master-Slave_ (3)

- Outra característica é que um _slave_ pode se tornar um _master_
  - _Masters_ podem ser designados manualmente ou automaticamente
- Para obtermos resiliência, aplicações precisam conhecer o caminho dos bancos
  para leitura e para escrita e usá-los separadamente
  - Isto é normalmente feito usando conexões separadas aos bancos de dados

---
## Replicação _Master-Slave_ (4)

- Replicação _master-slave_ introduz a possibilidade de problemas de
  consistência
  - Aplicações lendo de _slaves_ podem receber dados ainda não atualizados

---
## Replicação **_Peer-to-Peer_**

- **Replicação _master-slave_** nos dá **escalabilidade horizontal de
  leitura**, mas não da escrita dos dados
  - Além disso, **há resiliência da leitura**, mas **não da escrita**
  - O **_master_** ainda é um **ponto único de falha**
- **_Peer-to-Peer_** resolve esses problemas ao **não ter um nó _master_**

---
## Replicação **_Peer-to-Peer_** (2)

- Todas as réplicas são idênticas (aceitam escrita e leitura)
- Com _peer-to-peer_, podemos ter falhas nos nós sem perder a capacidade de
  escrita, nem perder dados

![](../../images/p2p-gains.png)

---
## Replicação **_Peer-to-Peer_** (3)

- Adicionar novos nós para escalar horizontalmente é simples
- O custo disso é cobrado na consistência
- Ao podermos escrever em qualquer nó, aumentamos a possibilidade de gerar
  inconsistências na escrita
  - _E.g._, dois+ clientes reservando o mesmo quarto de hotel
  - Contudo, é possível mitigar esse problema

---
## Usando **_Sharding_ + Replicação**

- _Master-slave_ + _Sharding_: múltiplos _masters_, mas **cada item tem
  apenas 1 master**
  - Um nó pode ser _master_ para um dataset e _slave_ para outro
- _Peer-to-peer_ + _Sharding_: cada dataset está presente (tipicamente)
  em 3 nós replicados
  - O **fator de replicação** 3 é normalmente usado
  - Comum em bancos _column-family_

---
<!--
  backdrop: white
-->

## _Master-slave_ + _Sharding_

![](../../images/sharding-and-master-slave-repl.png)

---
<!--
  backdrop: chapter
-->

# Consistência e Teorema CAP

---
## Consistência de Atualização


---
<!--
  backdrop: cap
-->

---
## **Consistência**



---
<!--
  backdrop: chapter
-->

# Modelos de Processamento e _Map-Reduce_

---
jlkj


---
# Referências


- Livro _"NoSQL Distilled"_
  - Capítulo 4: _Distribution Models_
  - Capítulo 5: _Consistency_
  - Capítulo 7: _Map-Reduce_
