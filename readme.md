# Jack Vinaterias V_1

## Proyecto eCommerce desarrollado con una arquitectura de capas en Node.js

Ete proyecto es la simulacion de un a Vinateria en linea capaz de renderizar o responder en Json
Con 2 Bases de datos Firebase y MongoAtlas y persistencia en memoria para desarrollo

🟢 App deploy AWS
http://jackvinateriasv1-env.eba-mxwwsges.us-east-1.elasticbeanstalk.com/

## Ejecutar App en local 🔧

- En una terminal bash entrar ala carpeta root
  1.- cd root
  2.- npm i
  3.- Scripts
  --Para ver app renderizada
  a) npm run devMongo
  b) npm run devFirebas
  --!!Memoria solo funciona con cuenta admin
  c) npm run devMem
  --Para usar respuestas en Json
  a) npm run devMongoJson
  b) npm run devFirebasJson
  --!!Memoria solo funciona con cuenta admin
  c) npm run devMemJson

Markdown is a lightweight markup language based on the formatting conventions
that people naturally use in email.
As [John Gruber] writes on the [Markdown site][df1]

> La aplicacion esta desarrollada con una arquitectura en capaz con la finalidad de poder usar y agregar
> Distintas bases de datos sin afectar la logica de todo el proyecto.

## Construido con 🛠️

Tecnologias y Librerias implementadas

- [javaScript] -Lenguaje de programación interpretado ECMAScript 6
- [Node.js] - Entorno de ejecucion
- [Express] - Entorno de trabajo para aplicaciones web
- [Winston] - Loggers
