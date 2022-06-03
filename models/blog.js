var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
  title: { type: String, required: true },
  blog: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: { type: Schema.Types.ObjectId, ref: "Comment" },
  published: { type: Boolean, default: false },
  author: { type: String, default: "Bob Smith" },
});

module.exports = mongoose.model("Blog", BlogSchema);
