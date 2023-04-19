const mostarInfoSistem = () => {
  try {
    const sistemaOperativo = process.platform;
    const nodeJsVersion = process.version;
    const rss = process.memoryUsage();
    const patEjecucion = process.execPath;
    const processId = process.pid;
    const carpetaProyecto = process.cwd();
    const puerto = parseInt(process.argv[2]);
    const info = {
      "sistema Operativo": sistemaOperativo,
      "carpeta del proyecto": carpetaProyecto,
      "ID  del proceso": processId,
      "version node JS": nodeJsVersion,
      "uso de la memoria": rss,
      "path de ejecucion": patEjecucion,
      " en uso": puerto,
    };
    return info;
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
const operacionRandom = (limite) => {
  try {
    const random = (min, max) => {
      return Math.floor(Math.random() * (max - min) + min);
    };
    let sum = [];
    let operador = limite || 1000000;
    for (let i = 0; i < operador; i++) {
      sum.push(random(1, 1000));
    }
    return sum;
  } catch (err) {
    logger.log("error", `${err}`);
  }
};
module.exports = { mostarInfoSistem, operacionRandom };
