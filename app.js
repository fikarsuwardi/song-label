// Happy coding guys
"use strict"

const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index.js')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))

// ini ke folder routes
app.use('/', router)

//! HARUS PALING BAWAH
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


