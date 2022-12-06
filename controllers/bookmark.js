const { Bookmark, Movie } = require("../models");

class Controller {
  static async addBookmark(req, res, next) {
    try {
      const UserId = req.user.id;
      const { title, imgUrl, movie_id } = req.body;

      const [findMovie, createdMovie] = await Movie.findOrCreate({
        where: { title },
        defaults: { title, imgUrl, movie_id },
      });

      const MovieId = findMovie.id;

      const [findBookmark, created] = await Bookmark.findOrCreate({
        where: { UserId, MovieId },
        defaults: { UserId, MovieId, status: "Unwatched" },
      });

      if (!created) throw { name: "Already in your bookmarks" };

      res.status(201).json({
        message: `${findMovie.title} successfully added to your bookmarks`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateBookmark(req, res, next) {
    try {
      const UserId = req.user.id;
      const MovieId = req.params.id;
      const { status } = req.body;
      const findBookmark = req.bookmark;

      if (findBookmark.status === status)
        throw { name: "Status is already like that" };

      await Bookmark.update(
        { status },
        {
          where: { UserId, MovieId },
        }
      );

      res.status(200).json({
        message: `${findBookmark.Movie.title} has been update from ${findBookmark.status} to ${status}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBookmark(req, res, next) {
    try {
      const UserId = req.user.id;
      const MovieId = req.params.id;
      const findBookmark = req.bookmark;

      await Bookmark.destroy({ where: { UserId, MovieId } });

      res.status(200).json({
        message: `${findBookmark.Movie.title} has been remove from your bookmark`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readBookmark(req, res, next) {
    try {
      const UserId = req.user.id;
      const readBookmark = await Bookmark.findAll({
        where: { UserId },
        include: [
          {
            model: Movie,
            attributes: {
              include: [["imgUrl", "poster_path"]],
              exclude: ["imgUrl"],
            },
          },
        ],
      });

      const result = {};
      readBookmark.forEach((el) => {
        result[el.status] = result[el.status] || [];
        result[el.status].push(el.Movie);
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
