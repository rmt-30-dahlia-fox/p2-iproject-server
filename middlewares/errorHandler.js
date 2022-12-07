const errorHandler = (err, req, res, next) => {
    let code = 500;
    let message = 'Internal Server Error'
    
    if (err.name == "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
        code = 400;
        message = err.errors[0].message
    }
    if (err.name == 'InvalidUserLogin' || err.name == 'InvalidPasswordLogin') {
        code = 401;
        message = "Invalid Email/Password";
    }
    if (err.name == 'InvalidToken' || err.name == 'JsonWebTokenError') {
        code = 401;
        message = "Invalid Token/Authentication Failed";
    }
    if (err.name == 'FailedRegisterAuthorization') {
        code = 403;
        message = "Only Admin Can Register New User";
    }
    
    console.log(err);
    res.status(code).json({message})
}

module.exports = errorHandler;