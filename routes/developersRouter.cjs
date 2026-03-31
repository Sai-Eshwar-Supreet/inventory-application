const {Router} = require('express');
const developerController = require('../controllers/developersController.cjs');

const developersRouter = Router();

developersRouter.get("/", developerController.getAllDevelopers);
developersRouter.get("/new", developerController.getCreateForm);
developersRouter.post("/new", developerController.postCreateForm);
developersRouter.post("/:id/delete", developerController.postDeleteDeveloper);
developersRouter.get("/:id/edit", developerController.getUpdateForm);
developersRouter.post("/:id/edit", developerController.postUpdateDeveloper);

module.exports = developersRouter;