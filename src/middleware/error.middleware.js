const notFound = (req, res, next) => {
  const err = new Error(`Not found - ${req.originalUrl} vistit /api/productos`);
  res.status(400);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  let dbConected = process.argv[3];
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errRes = "not disp";
  if (dbConected && dbConected == "mem") {
    errRes = err;
  }
  res.status(statusCode).json({
    status: statusCode,
    err: errRes,
  });
};

module.exports = { notFound, errorHandler };
