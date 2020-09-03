const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/", async (req, res) => {
  let search = { $regex: new RegExp(req.query.q, "i") };

  let queryParams = { name: search };

  const courses = await loadCourseData();
  res.send(
    await courses
      .find(queryParams, "name certificate_pdf certificate_image track_image course_date")
      .toArray()
  );
});

async function loadCourseData() {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );

  return client.db("nodejs").collection("courses");
}

module.exports = router;
