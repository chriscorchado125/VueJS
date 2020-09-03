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
      .toArray()
  );
});

async function loadProjectData() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("projects");
}

module.exports = router;
