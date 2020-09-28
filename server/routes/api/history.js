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
      .sort({ _id: 1, created: 1, end_date: 1, name: -1 })
      .limit(50)
      .toArray()
  );
});

async function loadHistoryData() {
  //process.env.MONGODB_URI
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("companies");
}

module.exports = router;
