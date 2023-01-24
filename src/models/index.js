const { Sequelize } = require("sequelize");

const { development } = require("../config/db.config");

const sequelize = new Sequelize(
  development.DB,
  development.USER,
  development.PASSWORD,
  {
    host: development.HOST,
    dialect: development.dialect,
  }
);

//checking if connection is done
try {
  sequelize.authenticate();
  sequelize.sync();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.task = require("./task.model")(sequelize, Sequelize);
