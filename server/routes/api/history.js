const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  //
  const search = { $regex: new RegExp(req.query.q, "i") };

  const queryParams = {
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
      .limit(51)
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
