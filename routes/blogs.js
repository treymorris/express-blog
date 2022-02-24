const express = require('express');
const router = exprexx.Router();
const blogController = require('../controllers/blogController');
const verifyToken = require('../config/verifyToken');

// GET all blogs.
router.get('/', blogController.get_all_blogs);

//GET one blog.
router.get('/:id', blogController.get_one_blog);

// POST create blog.
router.post('/create', verifyToken, blogController.create_blog);

// POST publish blog.
router.post('/:id/publish', verifyToken, blogController.publish);

// POST unpublish blog.
router.post('/:id/unpublish', verifyToken, blogController.unpublish);

//  PUT edit blog.
router.put('/:id/edit', verifyToken, blogController.edit);

// DELETE blog.
router.delete('/:id/delete', verifyToken, blogController.delete);

module.exports = router;