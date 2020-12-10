const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const MAX_ITEMS_PER_PAGE = 50

router.get('/', async (req, res) => {
  const home = await loadHomeData()
  const dataToReturn = await home.find({}).toArray()

  res.cookie('recordCount', dataToReturn.length)
  res.cookie('maxItemsPerPage', MAX_ITEMS_PER_PAGE)

  res.send(dataToReturn)
})

async function loadHomeData () {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )

  return client.db('nodejs').collection('homes')
}

module.exports = router
