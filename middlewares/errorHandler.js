const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal server error";
  console.log(err);

  if (err.name === "Email is required") {
    code = 400;
    message = err.name;
  } else if (err.name === "Password is required") {
    code = 400;
    message = err.name;
  } else if (err.name === "Invalid email/password") {
    code = 401;
    message = err.name;
  } else if (err.name === "Invalid Token" || err.name === "JsonWebTokenError") {
    code = 401;
    message = "Invalid Token";
  } else if (err.name === "Doctor not found") {
    code = 404;
    message = err.name;
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 404;
    const error = err.errors[0].message;
    message = error;
  } else if (err.name === "Medicine not found") {
    code = 404;
    message = err.name;
  } else if (err.name === "Amount is required") {
    code = 401;
    message = err.name;
  } else if (err.name === "Medicine is not enough") {
    code = 400;
    message = err.name;
  } else if (err.name === "Prescription is claimed") {
    code = 400;
    message = err.name;
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
