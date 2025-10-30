const Card = require("../models/card");
const { NotFoundError, ForbiddenError } = require("../errors/errors");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner, likes: [] })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Tarjeta no encontrado");
      }
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError(
          "No tiene permisos para realizar dicha accion"
        );
      }
      return card.remove();
    })
    .then(() => {
      return res.status(200).send({ message: "Card eliminada" });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Tarjeta no encontrado");
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError("Tarjeta no encontrado");
      }
      res.send({ data: card });
    })
    .catch(next);
};
