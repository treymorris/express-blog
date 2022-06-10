var express = require("express");
var router = express.Router();
const commentController = require("../controllers/commentController");
const verifyToken = require("../config/verifyToken");

// GET all comments.
router.get("/", commentController.get_all_comments);

// GET one comment.
router.get("/:id", commentController.one_comment);

// CREATE comment.
router.post("/create", commentController.create_comment);

// EDIT comment.
router.put("/:id/edit", verifyToken, commentController.edit_comment);

// DELETE comment.
router.delete("/:id/delete", verifyToken, commentController.delete_comment);


module.exports = router;
