const songRouter = require("express").Router();
const Controller = require("../controllers/songController")

songRouter.get('/', Controller.listSongs) //=> /songs

songRouter.get('/add', Controller.getCreateSongs) // => songs/add
songRouter.post('/add', Controller.postCreateSongs)

songRouter.get('/:id', Controller.detailSongs) // => /songs/:id

songRouter.get('/:id/delete', Controller.delete)

songRouter.get('/:id/edit', Controller.getEditSongs) // => songs/:id/edit
songRouter.post('/:id/edit', Controller.postEditSongs)

songRouter.get('/:id/vote', Controller.vote);

module.exports = songRouter