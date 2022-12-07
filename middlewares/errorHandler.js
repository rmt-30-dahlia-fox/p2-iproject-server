const errorHandler = (err, req, res, next) => {
  let code = 500
  let message = 'Internal Server Error'

  if (err.message == 'Email is required' || err.message == 'Password is required') {
    code = 400
    message = err.message
  } else if (err.message == 'Invalid email/password') {
    code = 401
    message = err.message
  }

  res.status(code).json({ message })
}

module.exports = errorHandler