const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const routerAuth = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const { requestLogger, errorLogger } = require("../middleware/logger");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/aroundb");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use(requestLogger);

//Ruta sin autenticacion (login y registro)
app.use(routerAuth);
//Middleware de autenticacion para las rutas protegidas
app.use(authMiddleware);
//Rutas con autenticacion
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Ha ocurrido un error en el servidor" : message,
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
