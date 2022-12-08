const errorHandler = (err, req, res, next) => {
    let code = 500;
    let message = 'Internal Server Error';

    if(err.name === 'SequelizeValidationError'){
        code = 400;
        message = err.errors[0].message;
    } else if(err.name === 'RequiredDataLogin'){
        code = 400;
        message = 'Email or Password is required'
    } else if(err.name === "ForbiddenDoubleTeam"){
        code = 400;
        message = "You already have a team"
    } else if(err.name === 'InvalidLogin'){
        code = 401;
        message = 'Invalid email or password'
    } else if(err.name === 'InvalidToken' || err.name === 'JsonWebTokenError'){
        code = 401;
        message = 'Invalid Token';
    } else if(err.name === 'DataNotFound' || err.name === 'InvalidId'){
        code = 404;
        message = 'Player not found';
    } else if(err.name === 'InvalidTeamId'){
        code = 404;
        message = 'Team not found';
    } else if(err.name === "YourTeamNotFound"){
        code = 404;
        message = 'Team not found, you must make team first';
    } else if(err.name === 'Forbidden'){
        code = 403;
        message = 'Forbidden'
    }

    res.status(code).json(message)
}

module.exports = errorHandler