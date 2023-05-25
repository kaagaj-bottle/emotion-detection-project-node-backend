const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");

const { connectToDatabase } = require("./utilities/db");
const { Song } = require("./models/index");
const { ML_ENDPOINT } = require("./utilities/config");
const logger = require("./utilities/logger");

const label = [
  "angry",
  "disgust",
  "fear",
  "happy",
  "neutral",
  "sad",
  "surprise",
];

app.use(cors());
app.use(express.json());

app.get("/", async (request, response) => {
  response.send("<h1>Welcome</h1>");
});

app.get("/:emotion", async (request, response) => {
  const song = await Song.findAll({
    where: {
      emotion: request.params.emotion,
    },
  });
  response.json(song);
});

app.post("/", async (request, response) => {
  const song = request.body;
  try {
    const savedSong = await Song.create(song);
    response.json(savedSong);
  } catch (error) {
    logger.error(error);
  }
});

app.post("/predict", async (request, response) => {
  const base64Image = request.body.image;
  const options = {
    method: "post",
    url: ML_ENDPOINT,
    data: { image: base64Image },
  };
  try {
    model_response = await axios(options);
    const songs_recommendation = await Song.findAll({
      where: {
        emotion: model_response.data.prediction,
      },
    });
    response.json({
      songs_recommendation,
      mood: label[model_response.data.prediction],
    });
  } catch (error) {
    logger.error(error);
  }
});

app.use(express.json());
const start = async () => {
  await connectToDatabase();
};

start();

module.exports = app;
