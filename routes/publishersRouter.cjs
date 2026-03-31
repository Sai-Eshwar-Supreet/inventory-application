const {Router} = require('express');
const publisherController = require('../controllers/publishersController.cjs');

const publishersRouter = Router();

publishersRouter.get("/", publisherController.getAllPublishers);
publishersRouter.get("/new", publisherController.getCreateForm);
publishersRouter.post("/new", publisherController.postCreateForm);
publishersRouter.post("/:id/delete", publisherController.postDeletePublisher);
publishersRouter.get("/:id/edit", publisherController.getUpdateForm);
publishersRouter.post("/:id/edit", publisherController.postUpdatePublisher);

module.exports = publishersRouter;