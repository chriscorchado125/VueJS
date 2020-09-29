const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

ObjectID = require("mongodb").ObjectID;

const MAX_ITEMS_PER_PAGE = 50;

router.get("/", async (req, res) => {
  //
  let pageNum = req.query.page;
  let pageDir = req.query.dir;

  let paging;
  if (pageDir == "next") paging = { _id: { $gt: ObjectID(req.query.last) } };
  if (pageDir == "prev") paging = { _id: { $lt: ObjectID(req.query.first) } };

  // set query
  let searched = req.query.q || "";
  let queryParams = {};
  let search = "";

  if (searched) {
    search = { $regex: new RegExp(searched, "i") };
    queryParams = {
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
  }

  if (paging) queryParams = paging;

  if (paging && search !== "") {
    queryParams = {
      $and: [paging, queryParams]
    };
  }

  let recordsToSkip = 0;
  if (parseInt(pageNum) > 1 && pageDir == "prev") {
    recordsToSkip = parseInt(pageNum - 1) * MAX_ITEMS_PER_PAGE;
  }

  const projects = await loadProjectData();

  const dataToReturn = await projects
    .find(
      queryParams,
      "screenshots name description company_name videos technology project_date"
    )
    .sort({ _id: 1, project_date: 1, name: 1, created: 1 })
    // the max is 50 but we use 51 in order to check for more records and be able to set the 'Next' pagination link
    .limit(MAX_ITEMS_PER_PAGE + 1)
    .toArray();

  let firstID;
  let lastID;

  if (dataToReturn.length > 0) {
    if (dataToReturn.length > MAX_ITEMS_PER_PAGE) {
      res.cookie("nextLink", "true");
      dataToReturn.pop();
    } else {
      res.cookie("nextLink", "false");
    }

    firstID = Object.values(dataToReturn)[0]._id;
    lastID = Object.values(dataToReturn)[Object.keys(dataToReturn).length - 1]._id;

    res.cookie("firstIDcookie", firstID);
    res.cookie("lastIDcookie", lastID);
  }

  res.cookie("recordCount", dataToReturn.length);
  res.cookie("maxItemsPerPage", MAX_ITEMS_PER_PAGE);

  res.send(dataToReturn);
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
