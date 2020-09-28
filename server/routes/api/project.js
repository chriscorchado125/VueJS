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
        company_name: search
      },
      {
        technology: search
      },
      {
        screenshots: search
      }
    ]
  };

  const courses = await loadProjectData();
  res.send(
    await courses
      .find(
        queryParams,
        "screenshots name description company_name videos technology project_date"
      )
      .sort({ _id: 1, project_date: 1, name: 1, created: 1 })
      .limit(50)
      .toArray()
  );
});

async function loadProjectData() {
  //process.env.MONGODB_URI
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("projects");
}

module.exports = router;
