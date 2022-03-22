const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  writer: {
    type: String,
    required: true,
  },
  pw: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);