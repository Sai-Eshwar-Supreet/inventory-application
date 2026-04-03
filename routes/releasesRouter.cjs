const {Router} = require('express');
const releaseController = require('../controllers/releasesController.cjs');

const releasesRouter = Router();

releasesRouter.get("/", releaseController.getAllReleases);
releasesRouter.get("/new", releaseController.getCreateForm);
releasesRouter.post("/new", releaseController.postCreateForm);

module.exports = releasesRouter;