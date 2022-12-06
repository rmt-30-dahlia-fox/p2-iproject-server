function errorHandler (err, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
    code = 400;
    message = err.errors[0].message;
  }
  else if(err === "noEmail"){
    code = 400;
    message = "Email is required";
  }
  else if(err === "noPassword"){
    code = 400;
    message = "Password is required";
  }
  else if(err === "invalid"){
    code = 400;
    message = "Invalid email or password";
  }
  else if(err === "invalidToken" || err.name === "JsonWebTokenError"){
    code = 401;
    message = "Invalid token";
  }
  else if(err === "notFound"){
    code = 404;
    message = "Error not found";
  }
  else if(err === "forbidden"){
    code = 403;
    message = "Access denied!";
  }
  res.status(code).json({message});
}

module.exports = errorHandler;