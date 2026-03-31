const {Router} = require('express');
const editionController = require('../controllers/editionsController.cjs');

const editionsRouter = Router();

editionsRouter.get("/", editionController.getAllEditions);
editionsRouter.get("/new", editionController.getCreateForm);
editionsRouter.post("/new", editionController.postCreateForm);
editionsRouter.post("/:id/delete", editionController.postDeleteEdition);
editionsRouter.get("/:id/edit", editionController.getUpdateForm);
editionsRouter.post("/:id/edit", editionController.postUpdateEdition);

module.exports = editionsRouter;