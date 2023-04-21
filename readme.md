# Jack Vinaterias V_1

##!!!Me falta agregar endpoints postman y terminar mi redmi

## Proyecto eCommerce desarrollado con una arquitectura de capas en Node.js

Ete proyecto es la simulacion de un a Vinateria en linea capaz de renderizar o responder en Json
Con 2 Bases de datos Firebase y MongoAtlas y persistencia en memoria para desarrollo

🟢 App deploy AWS
http://jackvinateriasv1-env.eba-mxwwsges.us-east-1.elasticbeanstalk.com/

> La aplicacion esta desarrollada con una arquitectura en capaz con la finalidad de poder usar y agregar
> Distintas bases de datos sin afectar la logica de todo el proyecto.

## Ejecutar App en local 🔧

En tu terminal

Aentrar a la carpeta:

```sh
cd root
```

instala dependencias:

```sh
npm i
```

#### Scripts

Produccion con Mongo Atlas:

```sh
 a) npm start
```

Produccion con Firebas:

```sh
b) npm run devFirebas
```

Desarrolo con memoria !!solo funciona con cuenta Admin:

```sh
c) npm run devMem
```

(optional) La app es capas de responder en Json para trabajar el backend co los siguinetes scripts

```sh
a) npm run devMongoJson
b) npm run demFirebasJson
!!SOlo con cuenta de Admin
c) npm run dev memJson
```

## Construido con 🛠️

Tecnologias y Librerias implementadas

- [javaScript][dill] - Lenguaje de programación interpretado ECMAScript 6
- [Node.js][dill] - Entorno de ejecucion
- [Html][dill] - Lenguage de etiquetas de hipertexto
- [Express][dill] - Entorno de trabajo para aplicaciones web
- [Winston][dill] - Loggers
- [socket.io][dill] - Bidirectional and low-latency communication for every.platform.
- [Nodemailer][dill] - Applications to allow easy as cake email sending.
- [Passport][dill] - Passport is authentication middleware.
- [Bcript][dill] - Función de hashing de contraseñas.
- [Bootstrap][dill] - Framework CSS.
- [Cors][dill] - CORS (Cross-Origin Resource Sharing).
- [MongoAtlas][dill] - Base de datos en la nube
- [Firestore][dill] - Base de datos en la nube
- [Sass][dill] - Procesador css
- [dotenv][dill] - variables de entorno
