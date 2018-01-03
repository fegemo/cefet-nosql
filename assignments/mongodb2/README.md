<!--
  Resolução do exercício: http://www.w3resource.com/mongodb-exercises/
-->
# Atividade Prática: **MongoDB** parte 2

Esta atividade tem o objetivo de fixar os conceitos de NoSQL vistos em
aula.

Vamos dar continuidade ao aprendizado do MongoDB, que é o banco NoSQL
orientado a documentos mais usado.

## Pré-requisitos

Para fazer esta atividade, você vai precisar:

1. Uma instalação do MongoDB¹
  - Dentro da pasta instalada, execute `mongod.exe` e depois `mongo.exe`
  - Se precisar, [baixe](https://www.mongodb.org/downloads) e instale
1. Opcionalmente, use o [Robomongo](http://robomongo.org/) em vez do
  shell (`mongo.exe`)

¹ Para verificar se está instalado, procure na pasta "Arquivos de Programas"
se uma pasta "MongoDB" existe:
  `C:\Program Files\MongoDB\Server\3.X\bin`

Nos laboratórios do CEFET, é preciso:
1. Criar a pasta `C:/data/db` (onde o MongoDB armazenará os dados)
1. Executar o `mongod` manualmente
1. Adicionar uma exceção ao _firewall_ do Windows
  (pode pedir senha de administrador, pergunte ao
    professor)

## Entrega do Exercício

Você deve entregar, no Moodle, um documento `.pdf` contendo os entregáveis de
cada um dos exercícios abaixo. Você pode usar um editor de texto como o Word ou
Writer.


---
## Exercício 1: Índices

Surgiu uma demanda para poder fazer uma consulta filtrando por
bairros (`"borough"`). Para acelerar essas consultas, você deve criar um
índice usando esse campo.

### Entrega

Você deve entregar:

1. O comando para fazer a consulta

  <!-- db.restaurants.find({ borough: 'Manhattan' }); -->
1. O tempo gasto para executar a consulta **antes de criar o índice**

  <!-- db.restaurants.find({ borough: 'Manhattan' }).explain(true); -->
1. O comando para criar o índice

  <!-- db.restaurants.createIndex('borough'); -->
1. O tempo gasto para executar a consulta **depois de criar** o índice

  <!-- db.restaurants.find({ borough: 'Manhattan' }).explain(true); -->

---
## Exercício 2: **Consultas**

Considerando o mesmo _dataset_ do primeiro exercício, construa as
seguintes consultas:

1. Todos os restaurantes do bairro (_borough_) "Brooklyn".

  <!-- db.restaurants.find({ borough: 'Brooklyn' }); -->
1. Os 5 primeiros restaurantes no bairro "Bronx".

  <!-- db.restaurants.find({ borough: 'Bronx' }).limit(5); -->
1. Os 5 primeiros restaurantes do "Bronx", pulando os primeiros 20.

  <!-- db.restaurants.find({ borough: 'Manhattan' }).skip(20).limit(5); -->
1. Todos os restaurantes com pontuação (_score_) maior que 90.

  <!-- db.restaurants.find({ 'grades.score': { $gt: 90 } }); -->
1. Todos os restaurantes do bairro "Manhattan" com pontuação entre 80 e
  100 (inclusos).
  - Atenção: a solução correta precisa usar o [operador `$elemMatch`][elemMatch]
    e o resultado são 8 restaurantes (e não 9)

  <!--
    // solução incorreta:
    // semântica: um restaurante deve conter ao menos uma nota >= 80
    // e outra <= 100
    db.restaurants.find({
      borough: 'Manhattan',
      'grades.score': {
        $and: [80, 100]
      }
    });
    // solução correta:
    // semântica: um restaurante deve conter, ao mesmo tempo, ao menos uma nota
    // que esteja >= 80 e <= 100
    db.restaurants.find({
      borough: 'Manhattan',
      grades : {
        $elemMatch: {
          score: {
            $gte: 80,
            $lte :100
          }
        }
      }
    });
  -->
1. Restaurantes cuja latitude é menor que -95.754168.

  <!-- db.restaurants.find({ 'address.coords.0': { $lt: -95.754168 } }); -->
1. Restaurantes que não preparam culinária (_cuisine_) `"American "`.
  - Repare que o _dataset_ possui um erro e a culinária `"American "` tem um
    caracter de espaço no final

    <!-- db.restaurants.find({ cuisine: {$ne: 'American '} }); -->
1. Restaurantes (apenas campos id, nome e bairro) cujo **nome (_name_)
  começa com 'Wil'**.

  <!-- db.restaurants.find({ name: /^Wil/i }, { name: 1, borough: 1}); -->
1. Restaurantes do bairro "Bronx" e que preparam comida (_cuisine_)
  "American" ou "Chinese".

  <!--
    db.restaurants.find({
      borough: 'Bronx',
      $or: [
        { cuisine: 'American '},
        { cuisine: 'Chinese' }
      ]
    });
  -->

### Desafios

Valendo 15% extra, tente fazer também as seguintes operações:

1. Encontre a quantidade de restaurantes por cada tipo de culinária
  (_cuisine_) no "Brooklyn".
  - Dica: use [_aggregations_ do MongoDB][aggregations]

  <!--
  db.restaurants.aggregate([
    {
        $match: { borough: 'Brooklyn' }
    },
    {
        $group: {
            _id: '$cuisine',
            qtde: { $sum: 1 }
        }
    },
    {
        $sort: { qtde: -1 }
    }
  ]);
  -->
1. Restaurantes a uma distância de 500m do ponto cujas coordenadas são
  (-73.978220, 40.643525).
  - Dica: necessário um índice geoespacial (`2dsphere`) e
    o [operador `$nearSphere`][near]

    <!--
    db.restaurants.ensureIndex({"address.coord": "2dsphere"});
    // usando $nearSphere
    db.restaurants.find({
      "address.coord": {
          $nearSphere: {
              $geometry: {
                  type: "Point",
                  coordinates: [ -73.9784606, 40.6434024 ]
              },
              $maxDistance: 550
          }
      }
    });
    // usando $near
    db.restaurants.find({
      "address.coord": {
        $near: [ -73.9667, 40.78 ],
        $maxDistance: 500
      }
    });
    -->
1. A média das pontuações (_score_) de todos os restaurantes do
  bairro "Brooklyn".
  - Dica: use [_mapReduce_ do MongoDB][aggregations]

    <!--
    db.restaurants.mapReduce(
      // funcao "map"
      function map() {
          // emite pares para este restaurante: <bairro, array_com_todas_as_notas>
          var bairroDesteRestaurante = this.borough;
          var avaliacoes = this.grades;
          var todasNotasDesteRestaurante = avaliacoes.map(
              function(avaliacao) {
                  return avaliacao.score || 0;
              }
          );
          emit(bairroDesteRestaurante, todasNotasDesteRestaurante);
      },
      // funcao "reduce"
      function reduce(bairro, notas) {
          // "notas" eh um array de arrays
          // antes de usa-lo, vamos "achatar" de forma que fique um arrayzao
          notas = notas.reduce(function(a,b) {
              if (!Array.isArray(b)) b = [b];
              return a.concat(b);
          }, []);
          // soma todos os itens do array e divide pelo tamanho (pra tirar a media)
          return Array.sum(scores)/scores.length;
      },
      {
          query: {},
          // nome da "collection" onde os resultados serao colocados
          out: "media-de-notas"
      }
  );
  -->

[near]: https://docs.mongodb.com/manual/reference/operator/query/near/#op._S_nearM
[aggregations]: https://docs.mongodb.com/manual/aggregation/
[elemMatch]: https://docs.mongodb.com/manual/reference/operator/query/elemMatch/
