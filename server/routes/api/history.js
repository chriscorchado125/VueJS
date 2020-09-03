const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  let search = { $regex: new RegExp(req.query.q, "i") };

  let queryParams = {
    $or: [
      {
        name: search
      },
      {
        description: search
      },
      {
        job_title: search
      }
    ]
  };
  const history = await loadHistoryData();
  res.send(
    await history
      .find(queryParams, "name description screenshots job_title start_date end_date")
      .toArray()
  );
});

async function loadHistoryData() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("companies");
}

module.exports = router;
