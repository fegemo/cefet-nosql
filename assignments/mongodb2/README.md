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
1. O tempo gasto para executar a consulta **antes de criar o índice**
1. O comando para criar o índice
1. O tempo gasto para executar a consulta **depois de criar** o índice

---
## Exercício 2: **Consultas**

Considerando o mesmo _dataset_ do primeiro exercício, construa as
seguintes consultas:

1. Todos os restaurantes do bairro (_borough_) "Brooklyn".
2. Os 5 primeiros restaurantes no bairro "Bronx".
3. Os 5 primeiros restaurantes do "Bronx", pulando os primeiros 20.
4. Todos os restaurantes com pontuação (_score_) maior que 90.
5. Todos os restaurantes do bairro "Manhattan" com pontuação entre 80 e
  100 (inclusos).
6. Restaurantes cuja latitude é menor que -95.754168.
7. Restaurantes que não preparam culinária (_cuisine_) "American".
8. Restaurantes (apenas campos id, nome e bairro) cujo **nome (_name_)
  começa com 'Wil'**.
9. Restaurantes do bairro "Bronx" e que preparam comida (_cuisine_)
  "American" ou "Chinese".

### Desafios

Valendo 15% extra, tente fazer também as seguintes operações:

1. Restaurantes a uma distância de 500m do ponto cujas coordenadas são
  (-73.978220, 40.643525).
  - Dica: necessário um índice geoespacial (`2d` ou `2dsphere`) e
    o [operador `$near`][near]
2. A média das pontuações (_score_) de todos os restaurantes do
  bairro "Brooklyn".
  - Dica: use [agregações do MongoDB][aggregations]
3. Encontre a quantidade de restaurantes por cada tipo de culinária
  (_cuisine_) no "Brooklyn".
  - Idem

[near]: https://docs.mongodb.com/manual/reference/operator/query/near/#op._S_nearM
[aggregations]: https://docs.mongodb.com/manual/aggregation/
