function errorHandler(err, req, res, next) {
  console.log(err);

  let code = 500;
  let message = "Internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "email_required") {
    code = 400;
    message = "Email is required";
  } else if (err.name === "password_required") {
    code = 400;
    message = "Password is required";
  } else if (err.name === "invalid_login") {
    code = 401;
    message = "Invalid email/password";
  } else if (err.name === "unit_not_found") {
    code = 404;
    message = `Unit with id ${err.unitId} not found!`;
  } else if (err.name === "order_not_found") {
    code = 404;
    message = `Order with id ${err.orderId} not found!`;
  }

  res.status(code).json({ message });
}

module.exports = errorHandler;
