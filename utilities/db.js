const Sequelize = require("sequelize");
const { PGDATABASE, PGHOST, PGPASSWORD, PGPORT, PGUSER } = require("./config");
const logger = require("./logger");

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  dialect: "postgres",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info("connected to database ");
  } catch (error) {
    logger.error("connection failed");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };
