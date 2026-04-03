const {Router} = require('express');
const gameController = require('../controllers/gamesController.cjs');
const releasesRouter = require('./releasesRouter.cjs');

const gamesRouter = Router();

gamesRouter.get("/", gameController.getAllGames);
gamesRouter.get('/:id/details', gameController.getGameDetails);
gamesRouter.get("/new", gameController.getCreateForm);
gamesRouter.post("/new", gameController.postCreateForm);
gamesRouter.post("/:id/delete", gameController.postDeleteGame);
gamesRouter.get("/:id/edit", gameController.getUpdateForm);
gamesRouter.post("/:id/edit", gameController.postUpdateGame);
gamesRouter.use('/releases', releasesRouter);

module.exports = gamesRouter;