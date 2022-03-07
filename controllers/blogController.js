require("dotenv").config();
const Blog = require("../models/blog");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// GET all blogs.
exports.get_all_blogs = function (req, res) {
    Blog.find()
      .sort([["date", "descending"]])
      .exec((err, posts) => {
        if (err) return res.json(err);
  
        return res.json(posts);
      });
  };

// Create blog.
exports.create_blog = [
    (req, res, next) => {
        jwt.verify(req.token, process.env.SECRET, (err, authData) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.json({
              authData
            })
            next();
          }
        });
    },
    // validate and sanitize
    body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
    body("blog", "Content cannot be empty").trim().isLength({ min: 1 }),

    // process request
    (req, res) => {
        // extract errors
        const errors = validationResult(req.body);

        if (!errors.isEmpty()) return res.json({ errors: errors.array() });


        Blog.create(
            {
                title: req.body.title,
                blog: req.body.blog,
                published: req.body.published,
                date: Date.now(),
            },
            (err, newBlog) => {
                if (err) return res.json(err);
                console.log(newBlog)
              return res.json(newBlog);
            }
        );
    },
];

// Publish blog.
exports.publish = function (req, res) {
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    };
  
    Blog.findOneAndUpdate(
      { _id: req.params.id },
      { published: true },
      { useFindAndModify: false, new: true }
    )
      .exec((err, post) => {
        if (err) return res.status(400).json(err);
        res.json(post);
      });
};
  
// UNpublish blog.
exports.unpublish = function (req, res) {
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    },
      Blog.findOneAndUpdate(
        { _id: req.params.id },
        { published: false },
        { useFindAndModify: false, new: true }
      )
        .exec((err, post) => {
          if (err) return res.status(400).json(err);
          res.json(post);
        });
};
  
// Edit blog.
exports.edit_blog = [
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    },
  
    // validate and sanitize
    body("title", "Title cannot be empty").trim().isLength({ min: 1 }).escape(),
    body("blog", "Blog cannot be empty").trim().isLength({ min: 1 }),
  
    // process request
    (req, res) => {
      // extract errors
      const errors = validationResult(req.body);
  
      if (!errors.isEmpty()) {
        return res.json(errors.array());
      }
  
      // create new blog
      const blog = new Blog({
        title: req.body.title,
        blog: req.body.content,
        published: req.body.published,
        date: Date.now(),
        _id: req.params.id,
      });
  
      // update blog
      Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .exec((err, newBlog) => {
          if (err) return res.json(err);
  
          return res.json(newBlog);
        });
    },
  ];
  
// DELETE blog.
exports.delete_blog = function (req, res) {
    (req, res, next) => {
      jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if (err) return res.status(400).json(err);
        req.authData = authData;
        next();
      });
    },
      Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) return res.json(err);
  
        res.json({
          message: "Blog deleted successfully",
        });
      });
  };
  
  // GET single blog.
  exports.get_one_blog = function (req, res) {
    Blog.findById(req.params.id)
      .exec((err, blog) => {
        if (err) return res.json(err);
  
        return res.json(blog);
      });
  };