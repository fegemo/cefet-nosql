# Atividade Prática: **MongoDB**

Esta atividade tem o objetivo de fixar os conceitos de NoSQL vistos em
aula. Em particular, estamos interessados em praticar os comandos de
realização de consultas e outras manipulações de dados.

Para isso, vamos usar o MongoDB, que é o banco NoSQL orientado a documentos
mais usado.

## Pré-requisitos

Para fazer esta atividade, você vai precisar:

1. Uma instalação do MongoDB¹
  - Dentro da pasta instalada, execute `mongod.exe` e depois `mongo.exe`
  - Se precisar, [baixe](https://www.mongodb.org/downloads) e instale
1. Opcionalmente, use o [Robomongo](http://robomongo.org/) em vez do
  shell (`mongo.exe`)

¹ Para verificar se está instalado, procure na pasta "Arquivos de Programas"
se uma pasta "MongoDB" existe:
  `C:\Program Files\MongoDB\Server\3.0\bin`

## Entrega do Exercício

Você deve entregar, no Moodle, um documento `.pdf` contendo os entregáveis de
cada um dos exercícios abaixo. Você pode usar um editor de texto como o Word ou
Writer.

---
## Exercício 1: **Importando um _dataset_**

Vamos importar um _dataset_ que é uma única coleção e armazena informações
sobre restaurantes de Nova York.

Veja um dos documentos que forma o _dataset_ que vamos usar:

```json
{
  "address": {
     "building": "1007",
     "coord": [ -73.856077, 40.848447 ],
     "street": "Morris Park Ave",
     "zipcode": "10462"
  },
  "borough": "Bronx",
  "cuisine": "Bakery",
  "grades": [
     { "date": { "$date": 1393804800000 }, "grade": "A", "score": 2 },
     { "date": { "$date": 1378857600000 }, "grade": "A", "score": 6 },
     { "date": { "$date": 1358985600000 }, "grade": "A", "score": 10 },
     { "date": { "$date": 1322006400000 }, "grade": "A", "score": 9 },
     { "date": { "$date": 1299715200000 }, "grade": "B", "score": 14 }
  ],
  "name": "Morris Park Bake Shop",
  "restaurant_id": "30075445"
}
```

Para importar os dados, vamos usar o utilitário `mongoimport.exe`, que vem
junto com a instalação do MongoDB (na pasta `bin/`).

- **Passo 1**: baixar o _dataset_: https://fegemo.github.io/cefet-nosql/attachments/restaurants-dataset.json (11 MB)
- **Passo 2**: importar o _dataset_:
  - Vamos usar um banco de dados chamado `cefet-nosql`
  - Vamos importar os dados para uma coleção chamada `restaurants`
  - Usando o terminal, execute o `mongoimport` no seguinte formato:
    ```
    mongoimport --db cefet-nosql --collection restaurants --drop --file c:/caminho-para/restaurant-dataset.json
    ```

### Entrega

Tire uma _screenshot_ (`exercicio1.png`) mostrando que a importação foi
realizada com sucesso e o tempo que o processo levou.

---
## Exercício 2: **Inserindo** um documento na coleção

Insira o seguinte documento na coleção `restaurants`:

```js
{
  "address" : {
    "street" : "2 Avenue",
    "zipcode" : "10075",
    "building" : "1480",
    "coord" : [ -73.9557413, 40.7720266 ],
  },
  "borough" : "Manhattan",
  "cuisine" : "Italian",
  "grades" : [
    {
      "date" : ISODate("2014-10-01T00:00:00Z"),
      "grade" : "A",
      "score" : 11
    },
    {
      "date" : ISODate("2014-01-16T00:00:00Z"),
      "grade" : "B",
      "score" : 17
     }
  ],
  "name" : "Vella",
  "restaurant_id" : "41704620"
}
```

### Entrega

O comando que foi executado para inserir o documento **e também** um comando
e seu resultado (_screenshot_ ou texto _output_) para mostrar quantos
documentos agora fazem parte da coleção `restaurants`.

---
## Exercício 3: Diversas **consultas simples**

Você deve fazer as seguintes consultas na coleção `restaurants`:

1. Listar todos os restaurantes
1. Encontrar todos os restaurantes no bairro (`borough`) `"Manhattan"`
1. Encontrar todos os restaurantes com CEP (`zipcode`, dentro de `address`) `"10022"`
1. Encontrar todos os restaurantes que possuem alguma nota (`grade`, dentro de `grades`) `"B"`
1. Mesmo que anterior, porém mostrar apenas o nome do restaurante (`"name"`)

### Entrega

O comando executado para realizar cada consulta.

---
## Exercício 4: Diversas **consultas com operadores**

Você deve fazer as seguintes consultas na coleção `restaurants`:

1. Restaurantes com pontuação (`"score"`, dentro de `"grades"`) **maior que** 30
1. Restaurantes com pontuação (`"score"`, dentro de `"grades"`) **menor que** 10
1. Restaurantes com culinária (`"cuisine"`) italiana (`"Italian"`), com CEP `"10075"`
1. Restaurantes com culinária (`"cuisine"`) italiana (`"Italian"`) **OU** com CEP `"10075"`
1. Mesmo que 4.3, porém ordenado por bairro (`"borough"`)

### Entrega

O comando executado para realizar cada consulta.

---
## Exercício 5: Índices

Surgiu uma demanda para poder fazer uma consulta filtrando por bairros (`"borough"`). Para acelerar essas consultas, você deve criar um índice usando esse campo.

### Entrega

Você deve entregar:

1. O comando para fazer a consulta
1. O tempo gasto para executar a consulta **antes de criar o índice**
1. O comando para criar o índice
1. O tempo gasto para executar a consulta **depois de criar** o índice
