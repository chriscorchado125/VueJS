const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

const MAX_ITEMS_PER_PAGE = 50

router.get('/', async (req, res) => {
  const resume = await loadResumeData()
  const dataToReturn = await resume.find({}).toArray()

  res.cookie('recordCount', dataToReturn.length, { sameSite: 'None', secure: true })
  res.cookie('maxItemsPerPage', MAX_ITEMS_PER_PAGE, { sameSite: 'None', secure: true })

  res.send(dataToReturn)
})

async function loadResumeData () {
  const client = await mongodb.MongoClient.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )

  return client.db('nodejs').collection('resumes')
}

module.exports = router
