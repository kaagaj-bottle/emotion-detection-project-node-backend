const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const { connectToDatabase } = require("./utilities/db");
const { Song } = require("./models/index");
const { ML_ENDPOINT } = require("./utilities/config");
const logger = require("./utilities/logger");

app.use(cors());
app.use(express.json());

app.post("/", async (request, response) => {
  response.send("<h1>Welcome</h1>");
});

app.post("/predict", async (request, response) => {
  const base64Image = request.body.image;
  let output = "hello";
  const options = {
    method: "post",
    url: ML_ENDPOINT,
    data: { image: base64Image },
  };
  try {
    model_response = await axios(options);
    console.log(model_response.data);
  } catch (error) {
    logger.error(error);
  }

  response.json(output);
});

app.use(express.json());
const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
