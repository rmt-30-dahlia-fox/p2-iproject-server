const errorHandler = (err, req, res, next) => {
    console.log("ERROR>>>>", err);
    let code = 500;
    let message = "Internal Server Error";

    if (err.name === "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError") {
        code = 400;
        message = err.errors[0].message;
    } else if (err.name == "invalid token" || err.name == "JsonWebTokenError") {
        code = 401;
        message = "invalid token"
    } else if (err.name == "data not found") {
        code = 401
        message = err.message
    } else if (err.name == "404data not found") {
        code = 404
        message = err.message
    } else if (err.name == 'forbidden') {
        code = 403;
        message = "forbidden"
    } else if (err.name == 'SequelizeDatabaseError') {
        code = 401;
        message = err.parent.error
    } else if (err.name == "required" || err.name == '400status') {
        code = 400;
        message = err.message
    }

    res.status(code).json({ message })
}

module.exports = errorHandler