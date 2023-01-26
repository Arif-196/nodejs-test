const express = require("express");
const morganMiddleware = require("./middleware/morgan.middleware");
const logger = require("./helper/logger");
const taskRoutes = require("./routes/index");
const PORT = process.env.PORT || 7070;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(morganMiddleware);
app.get("/", (req, res) => {
  logger.info("Checking the API status: Everything is OK");
  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.use("/task", taskRoutes);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});
