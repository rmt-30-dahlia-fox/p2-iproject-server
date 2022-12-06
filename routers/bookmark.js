const router = require("express").Router();
const Controller = require("../controllers/bookmark");
const authorization = require("../middlewares/authorization");

router.post("/", Controller.addBookmark);
router.get("/", Controller.readBookmark);
router.patch("/:id", authorization, Controller.updateBookmark);
router.delete("/:id", authorization, Controller.deleteBookmark);

module.exports = router;
