const errorHandler = async (err, req, res, next) => {
    // console.log(err);
    function errTemplate(status, msg) {
      res.status(status).json({ message: msg });
    }

    if (err.name === "Email is required")
      return errTemplate(400, err.name);

    if (err.name === "Password is required")
      return errTemplate(400, err.name);

    if (err.name === "Already in your bookmarks")
      return errTemplate(400, err.name);

    if (err.name === "Status is already like that")
      return errTemplate(400, err.name);

    if (err.name === "SequelizeValidationError")
      return errTemplate(400, err.errors[0].message);

    if (err.name === "Invalid email or password")
      return errTemplate(401, err.name);

    if (err.name === "Login required")
      return errTemplate(401, err.name);

    if (err.name === "Invalid token")
      return errTemplate(401, err.name);

    if (err.name === "JsonWebTokenError")
      return errTemplate(401, "Invalid token");

    if (err.name === "Forbidden")
      return errTemplate(403, err.name);

    if (err.name === "Not found")
      return errTemplate(404, err.name);

    const errRes = err.response;
    if (errRes) {
      const errData = errRes.data;
      const status_code = errData.status_code;
      const status_message = errData.status_message;
      if (status_code === 22) return errTemplate(400, status_message);
    }

    if (errRes) {
      const errMsg = errRes.data.errors;
      return errTemplate(400, errMsg)
    }

    errTemplate(500, "Internal server error");
  };

  module.exports = errorHandler;
