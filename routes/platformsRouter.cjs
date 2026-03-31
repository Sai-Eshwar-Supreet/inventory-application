const {Router} = require('express');
const platformController = require('../controllers/platformController.cjs');

const platformsRouter = Router();

platformsRouter.get("/", platformController.getAllPlatforms);
platformsRouter.get("/new", platformController.getCreateForm);
platformsRouter.post("/new", platformController.postCreateForm);
platformsRouter.post("/:id/delete", platformController.postDeletePlatform);
platformsRouter.get("/:id/edit", platformController.getUpdateForm);
platformsRouter.post("/:id/edit", platformController.postUpdatePlatform);

module.exports = platformsRouter;