require("dotenv").config();

module.exports = {
  development: {
    DB: process.env.DATABASE_NAME,
    USER: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    HOST: process.env.DATABASE_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
