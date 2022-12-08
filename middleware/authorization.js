const { User, Movie } = require("../models")

async function authOnDelete(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id)
    const aMovie = await Movie.findByPk(req.params.id)

    if (user.role !== 'Admin') {
      if (aMovie && (req.user.id !== aMovie.authorId)) throw ({ name: "Forbidden" })
    }

    next()
  } catch (error) {
    next(error)
  }
}

const authOnUpdateStatus = async (req, res, next) => {
  // console.log('--------- ini auth on update STATUS!', req.user.role)
  try {
    const user = await User.findByPk(req.user.id)
    const { id } = req.params
    const aMovie = await Movie.findByPk(id)
    if (!aMovie) {
      throw { name: "Movie not found" };
    }
    if (user.role !== "Admin") {
      throw ({ name: "Forbidden" })
    }
    next()
  } catch (error) {
    next(error)
  }
}

const authForPublic = async (req, res, next) => {
  // console.log('--------- ini auth on update STATUS!', req.user.role)
  try {
    const user = await User.findByPk(req.user.id)
    if (user.role !== "Customer") {
      throw ({ name: "Forbidden" })
    }
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = { authOnDelete, authOnUpdateStatus, authForPublic }