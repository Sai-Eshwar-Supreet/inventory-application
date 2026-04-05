const {Router} = require('express');
const indexController = require('../controllers/indexController.cjs');
const indexRouter = Router();

indexRouter.get("/", indexController.getHome);
indexRouter.post("/search", indexController.postSearchForm);

module.exports = indexRouter;