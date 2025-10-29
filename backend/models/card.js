const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, "Registre un nombre!"],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[\w.~:/?%#[\]@!$&'()*+,;=]*)?(#)?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
