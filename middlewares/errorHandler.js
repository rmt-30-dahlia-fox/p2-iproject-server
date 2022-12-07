const errorHandler = (err, req, res, next) => {
  let code = 500
  let message = 'Internal Server Error'
  console.log(err);

  if (err.message == 'Email is required' || err.message == 'Password is required') {
    code = 400
    message = err.message
  } else if (err.message == 'Invalid email/password' || err.message == 'Invalid token') {
    code = 401
    message = err.message
  } else if (err.message == 'Data is not found') {
    code = 404
    message = err.message
  } else if (err.name == 'JsonWebTokenError') {
    code = 401
    message = 'Invalid token'
  }

  res.status(code).json({ message })
}

module.exports = errorHandler