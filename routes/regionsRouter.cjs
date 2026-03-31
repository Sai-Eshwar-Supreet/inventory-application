const {Router} = require('express');
const regionController = require('../controllers/regionsController.cjs');

const regionsRouter = Router();

regionsRouter.get("/", regionController.getAllRegions);
regionsRouter.get("/new", regionController.getCreateForm);
regionsRouter.post("/new", regionController.postCreateForm);
regionsRouter.post("/:id/delete", regionController.postDeleteRegion);
regionsRouter.get("/:id/edit", regionController.getUpdateForm);
regionsRouter.post("/:id/edit", regionController.postUpdateRegion);

module.exports = regionsRouter;