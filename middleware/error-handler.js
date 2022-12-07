// nyobain bentukann arrow function yg langsung disimpen ke variable
const catchError = (err, req, res, next) => {
  // console.log('----- ini di error-handler --->', err.name);
  let [code, msg] = [500, "Internal Server Error"]

  /* ------------ handle error from authentication.js ---------------*/
  if (err.name === "Invalid Token" || err.name === "JsonWebTokenError") [code, msg] = [401, "Invalid Token"]


  /*------------ handle error from authorization.js ----------------*/
  if (err.name === "Forbidden") [code, msg] = [403, "Unauthorize"]


  /*------------ handle error from UserController.js ---------------*/
  // handle error from userController.js       -->        login 
  if (err.name === "Invalid Login") [code, msg] = [401, 'Error invalid email or password']


  /*------------ handle error from Controllers ---------------*/
  if (['Genre Not Found', 'Movie Not Found'].includes(err.name)) [code, msg] = [404, err.name]


  /*------------ handle error from Controllers with FAILED sequelize ---------------*/
  if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    code = 400
    // msg = err.errors.map(el => el.message)
    msg = err.errors.map(el => el.message)
  }


  res.status(code).json({ message: msg })
}

module.exports = catchError