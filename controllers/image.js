const Clarifai = require("clarifai");

// Add Clarifai key.
const app = new Clarifai.App({
  apiKey: "871ff7beec79455a9bbc1836e039ed5d"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("Unable to work with API."));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries."));
};

module.exports = {
  handleImage,
  handleApiCall
};
