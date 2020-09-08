const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  //
  const home = await loadHomeData();
  res.send(await home.find({}).toArray());
});

async function loadHomeData() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("homes");
}

module.exports = router;
