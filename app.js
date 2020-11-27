const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT || 3000
const errorHandler = require('./middlewares/errorHandler')

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log('listening on '+PORT)
})