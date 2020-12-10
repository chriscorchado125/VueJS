const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(cors())

const home = require('./routes/api/home')
const history = require('./routes/api/history')
const course = require('./routes/api/course')
const project = require('./routes/api/project')
const resume = require('./routes/api/resume')

app.use('/api/home', home)
app.use('/api/history', history)
app.use('/api/course', course)
app.use('/api/project', project)
app.use('/api/resume', resume)

app.set('view engine', 'pug')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/')))
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`listening on port: ${port}`))
