var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, minlength: 5 },
  blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
});

module.exports = mongoose.model("User", UserSchema);
