var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  blog: { type: Schema.Types.ObjectId, ref: "Blog" },
});

module.exports = mongoose.model("Comment", CommentSchema);
