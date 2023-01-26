const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal server error'
    console.log(err)

    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        code = 400
        message = err.errors[0].message
    } else if(err === "Email is required" || err === "Password is required") {
        code = 400
        message = err
    } else if (err === 'Invalid email/password') {
        code = 401
        message = err
    } else if(err === 'Invalid token' || err.name === 'JsonWebTokenError') {
        code = 401
        message = 'Invalid token'
    } 
    else if (err === 'Verification number is not valid!') {
        code = 401
        message = err
    }
    else if(err === 'Data not found') {
        code = 404
        message = err
    } else if (err === 'Forbidden') {
        code = 403
        message = err
    }

    res.status(code).json(err)
}

module.exports = errorHandler