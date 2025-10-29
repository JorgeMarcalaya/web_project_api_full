const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)(www\.)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/[\w.~:/?%#[\]@!$&'()*+,;=-]*)?(#)?$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  email: {
    type: String,
    required: [true, "Se requiere un email"],
    validate: {
      validator: function (v) {
        return /^((?!\.)[\w\-_.]*[^.])(@[\w-]+)(\.\w+(\.[\w-]+)?[^.\W])$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Se requiere ingresar una contraseña"],
    select: false,
    /*validate: {
      validator: function (v) {
        return /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/.test(
          v
        );
      },
      message: (props) =>
        `${props.value} is not valid password, password must contain 1 number (0-9), password must contain 1 uppercase letters, password must contain 1 lowercase letters, password must contain 1 non-alpha numeric number, password is 8-16 characters with no space`,
    },
    */
  },
});

module.exports = mongoose.model("user", userSchema);
