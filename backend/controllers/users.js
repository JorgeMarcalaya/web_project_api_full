const bcrypts = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../errors/errors");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.register = (req, res, next) => {
  const { email, password } = req.body;
  const salt = bcrypts.genSaltSync(10);
  const hashPassword = bcrypts.hashSync(password, salt);
  User.create({ email, password: hashPassword })
    .then((user) => {
      res.send({
        status: true,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email ya registrado"));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Credenciales inválidas");
      }
      if (bcrypts.compareSync(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "1w",
        });
        res.send({ token });
      } else {
        throw new UnauthorizedError("Credenciales inválidas");
      }
    })
    .catch(next);
};

module.exports.userInfo = (req, res, next) => {
  const _id = req.user._id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Usuario no encontrado");
      }
      res.send(user);
    })
    .catch(next);
};
