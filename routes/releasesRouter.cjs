const {Router} = require('express');
const releaseController = require('../controllers/releasesController.cjs');

const releasesRouter = Router();

releasesRouter.get("/", releaseController.getAllReleases);
releasesRouter.get("/new", releaseController.getCreateForm);
releasesRouter.post("/new", releaseController.postCreateForm);
releasesRouter.get("/:id/edit", releaseController.getUpdateForm);
releasesRouter.post("/:id/edit", releaseController.postUpdateForm);
releasesRouter.post("/:id/delete", releaseController.postDeleteRelease);

module.exports = releasesRouter;