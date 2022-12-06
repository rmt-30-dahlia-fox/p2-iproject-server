function errorHandler(err, req, res, next) {
  let code = 500;
  let message = "Internal server error";

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
