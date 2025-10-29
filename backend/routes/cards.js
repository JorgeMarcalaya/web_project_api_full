const express = require("express");
const router = express.Router();
const {
  validateCreateCard,
  validateIdCard,
} = require("../middleware/validation");

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);
router.post("/", validateCreateCard, createCard);
router.delete("/:cardId", validateIdCard, deleteCard);
router.put("/:cardId/likes", validateIdCard, likeCard);
router.delete("/:cardId/likes", validateIdCard, dislikeCard);

module.exports = router;
