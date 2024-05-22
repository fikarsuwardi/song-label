const labelRouter = require("express").Router();
const Controller = require("../controllers/labelController")

labelRouter.get('/', Controller.listLabels) //=> /labels

labelRouter.get('/detail', Controller.listLabelsDetail) //=> /labels/detail

module.exports = labelRouter