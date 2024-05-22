"use  strict"
const router = require('express').Router()
const labelRoutes = require("./label")
const songRoutes = require("./song")
const Controller = require("../controllers/labelController")

router.get('/', Controller.home)
router.use('/labels', labelRoutes)
router.use('/songs', songRoutes)

module.exports = router