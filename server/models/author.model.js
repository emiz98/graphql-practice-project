const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    name: String,
    age: Number,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Author", authorSchema);
