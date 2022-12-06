const router = require("express").Router();
const Controller = require("../controllers/movie");

router.get("/", Controller.findMovie)
router.get("/trending", Controller.trendingMovie)
router.get("/top-vote", Controller.topVoteMovie)
router.get("/:id", Controller.detailMovie)
router.get("/:id/trailer", Controller.movieTrailer)

module.exports = router;
