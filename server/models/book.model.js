const { Schema, model } = require("mongoose");

const bookSchema = new Schema(
  {
    name: String,
    genre: String,
    authorId: String,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Book", bookSchema);
