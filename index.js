const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const bodyParser = require("body-parser");
const usersRouter = require('./routes/users');

app.use(bodyParser.json())
app.use('/users', usersRouter)

app.get('/', (req, res) => res.send('Welcome to our server and database!'))

app.listen(port, () => {
  console.log('app is listening on port:', port)
})