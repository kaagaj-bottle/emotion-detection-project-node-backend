require("dotenv").config();

const PORT = process.env.PORT;

const PGHOST = process.env.PGHOST;
const PGPORT = process.env.PGPORT;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;

const ML_ENDPOINT = process.env.ML_ENDPOINT;

module.exports = { PORT, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE,ML_ENDPOINT };
