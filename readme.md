# Jack Vinaterias V_1

## Proyecto eCommerce desarrollado con una arquitectura de capas en Node.js

Ete proyecto es la simulacion de una Vinateria en linea capaz de renderizar o responder en Json
Con 2 bases de datos Firebase y MongoAtlas y persistencia en memoria para desarrollo

🟢 App deploy AWS
http://jackvinateriasv1-env.eba-mxwwsges.us-east-1.elasticbeanstalk.com/

> La aplicacion esta desarrollada con una arquitectura en capas con la finalidad de poder usar y agregar
> distintas bases de datos sin afectar la logica de todo el proyecto.

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

Desarrollo con memoria !!solo funciona con cuenta Admin:

```sh
c) npm run devMem
```

(optional) La app es capas de responder en Json para trabajar el backend co los siguinetes scripts
Dentro de la carpeta root tenemos el archivo JSON para probar en postman

```sh
a) npm run devMongoJson
b) npm run demFirebasJson
!!SOlo con cuenta de Admin
c) npm run dev memJson
```

## Cuenta admin y funciones 🚀

!! Al crear una cuenta Automaticamente existira en la otra DB

```sh
1.- Ver todos los items existentes
2.- Buscar item por letra que incluya
3.- Agregar productos a carrito
3.- visuaizar perfil con tu carrito
4.- Ingresar un pedido
5.- Visualizar tu historial de pedidos
```

```sh
!!SOlo con cuenta de Admin, Ademas podras
6.- Agregar Productos a inventario
7.- Editar productos
8.- Eliminar productos
9.- ver tickets de ordenes
```

## Construido con 🛠️

Tecnologias y Librerias implementadas

- [javaScript](https://www.w3schools.com/js/js_es6.asp) - Lenguaje de programación interpretado ECMAScript 6
- [Node.js](https://nodejs.org/es/docs) - Entorno de ejecucion
- [Html](https://developer.mozilla.org/es/docs/Web/HTML) - Lenguage de etiquetas de hipertexto
- [Express](https://expressjs.com/es/) - Entorno de trabajo para aplicaciones web
- [Express-session](https://www.npmjs.com/package/express-session) - Almacenamiento de datos de session
- [Joi](https://www.npmjs.com/package/joi) - Validacion de datos
- [Winston](https://www.npmjs.com/package/winston) - Loggers
- [socket.io](https://socket.io/get-started/chat) - Bidirectional and low-latency communication for every.platform.
- [Nodemailer](https://nodemailer.com/usage/) - Applications to allow easy as cake email sending.
- [Passport](https://www.passportjs.org/) - Passport is authentication middleware.
- [Bcrypt](https://openbase.com/js/bcrypt/documentation) - Función de hashing de contraseñas.
- [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) - Framework CSS.
- [Cors](https://www.npmjs.com/package/cors) - CORS (Cross-Origin Resource Sharing).
- [MongoAtlas](https://www.mongodb.com/es/atlas/database) - Base de datos en la nube
- [Firestore](https://firebase.google.com/) - Base de datos en la nube
- [Sass](https://sass-lang.com/documentation/) - Procesador css
- [dotenv](https://www.npmjs.com/package/dotenv) - variables de entorno

## Versionado

```sh
1.0
```

## Autor

```sh
- Enrique Hernandez Montiel
```
