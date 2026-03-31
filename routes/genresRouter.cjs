const {Router} = require('express');
const genreController = require('../controllers/genresController.cjs');

const genresRouter = Router();

genresRouter.get("/", genreController.getAllGenres);
genresRouter.get("/new", genreController.getCreateForm);
genresRouter.post("/new", genreController.postCreateForm);
genresRouter.post("/:id/delete", genreController.postDeleteGenre);
genresRouter.get("/:id/edit", genreController.getUpdateForm);
genresRouter.post("/:id/edit", genreController.postUpdateGenre);

module.exports = genresRouter;