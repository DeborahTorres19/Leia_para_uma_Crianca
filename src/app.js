const express = require('express')
require('dotenv').config()
const cors = require('cors')
const db = require('./database/mongooseConnect')

const app = express()

 const livroRoutes = require('./routes/livroRoutes')
 const doadorRoutes = require('./routes/doadorRoutes')
 const ongRoutes = require('./routes/ongRoutes')

app.use(express.json())
app.use(cors())

db.connect()

app.use("/livros", livroRoutes)
app.use("/doadores", doadorRoutes)
app.use("/ongs", ongRoutes)

module.exports = app