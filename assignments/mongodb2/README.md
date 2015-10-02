<!--
Resolução do exercício: http://www.w3resource.com/mongodb-exercises/
-->
# Atividade Prática: **MongoDB** parte 2

Esta atividade tem o objetivo de fixar os conceitos de NoSQL vistos em
aula.

Vamos dar continuidade ao aprendizado do MongoDB, que é o banco NoSQL orientado a documentos mais usado.

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
## Exercício: **Consultas**

Considerando o mesmo _dataset_ do primeiro exercício, construa as seguintes consultas:

1. Todos os restaurantes do bairro (_borough_) "Brooklyn".
2. Os 5 primeiros restaurantes no bairro "Bronx".
3. Os 5 primeiros restaurantes do "Bronx", pulando os primeiros 20.
4. Todos os restaurantes com pontuação (_score_) maior que 90.
5. Todos os restaurantes do bairro "Manhattan" com pontuação entre 80 e 100 (inclusos).
6. Restaurantes cuja latitude é menor que -95.754168.
7. Restaurantes que não preparam culinária (_cuisine_) "American".
8. Restaurantes (apenas campos id, nome e bairro) cujo **nome (_name_) começa com 'Wil'**.
9. Restaurantes do bairro "Bronx" e que preparam comida (_cuisine_) "American" ou "Chinese".

### Desafios

Valendo 10% extra, tente fazer também as seguintes operações:

1. Restaurantes a uma distância de 500m do ponto cujas coordenadas são (-73.978220, 40.643525).
2. A média das pontuações (_score_) de todos os restaurantes do bairro "Brooklyn".
