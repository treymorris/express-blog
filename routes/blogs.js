const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const verifyToken = require("../config/verifyToken");

// GET all blogs.
router.get("/", blogController.get_all_blogs);

//GET one blog.
router.get("/:id", blogController.get_one_blog);

// POST create blog.
router.post("/create", verifyToken, blogController.create_blog);

// POST publish blog.
router.put("/:id/publish", verifyToken, blogController.publish);

// POST unpublish blog.
router.put("/:id/unpublish", verifyToken, blogController.unpublish);

//  PUT edit blog.
router.put("/:id/edit", verifyToken, blogController.edit_blog);

// DELETE blog.
router.delete("/:id/delete", verifyToken, blogController.delete_blog);

module.exports = router;
