PARA ENTRAR A LA CARPETA DONDE ESTA EL SERVER: cd root/ngixNode/public
//////////////////////////////////////////////////////////////////////////////scripts
npm run devMongo
npm run devFirebas
npm run devMem
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/Ruta para hacer el test cd root/test
///////script
npm run test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
objeto para probar en postmans
{
"product": "prueba",
"typeOfLiquor": "vodka",
"price": 1000,
"image": "https://ss388.liverpool.com.mx/xl/1064210455.jpg",
"description": "Nuvo es una bebida innovadora que mezcla vodka premium con vinos franceses",
"stockItems": 9,
"codeItem": 144

    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Tuve que Encender las bases de Datos desde el server por el tema de los usuarios en una carpeta de utils llamada conecctions con el patron singleton, A modo de ejemplo intento conectar de nuevo desde /percistencias en /firebas/productos y en /mongoose/productos
