require("dotenv").config();
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.get_all_comments = function (req, res) {
  Comment.find()
    .sort([["date", "descending"]])
    .exec((err, data) => {
      if (err) return res.json(err);

      let comments = data.filter(
        (comment) => comment.blogId === req.params.blog_id
      );

      return res.json(comments);
    });
};

exports.create_comment = [
  body("comment", "Please enter a comment.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const comment = new Comment({
      //user: req.body.user,
      author: req.body.author,
      blog: req.body.blog,
      comment: req.body.comment,
    }).save(function (err, data) {
      if (err) {
        return next(err);
      }
      Blog.findByIdAndUpdate(
        req.body.blog,
        { $push: { comments: data._id } },
        { new: true }
      ).exec();
      res.json({
        message: "Comment Created!",
        data,
      });
    });
  },
];

// Edit comment.
exports.edit_comment = [
  (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
      console.log(req.token);
      if (err) return res.status(400).json(err);
      req.authData = authData;
      next();
    });
  },

  body("username", "Username cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Comment cannot be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res) => {
    const errors = validationResult(req.body);

    if (!errors.isEmpty()) return res.json(errors.array());

    const comment = {
      username: req.body.username,
      comment: req.body.content,
      postId: req.params.post_id,
    };

    Comment.findByIdAndUpdate(
      req.params.id,
      comment,
      { new: true },
      function (err, thecomment) {
        if (err) return res.json();

        return res.json(thecomment);
      }
    );
  },
];

// DELETE comment.
exports.delete_comment = function (req, res) {
  Comment.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.json(err);

    return res.json({
      message: "Comment deleted successfully",
    });
  });
};

// GET single comment.
exports.one_comment = function (req, res) {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) return res.json(err);

    return res.json(comment);
  });
};
