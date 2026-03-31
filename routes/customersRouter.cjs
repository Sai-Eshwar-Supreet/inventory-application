const {Router} = require('express');
const customerController = require('../controllers/customersController.cjs');

const customersRouter = Router();

customersRouter.get("/", customerController.getAllCustomers);
customersRouter.get("/new", customerController.getCreateForm);
customersRouter.post("/new", customerController.postCreateForm);
customersRouter.post("/:id/delete", customerController.postDeleteCustomer);
customersRouter.get("/:id/edit", customerController.getUpdateForm);
customersRouter.post("/:id/edit", customerController.postUpdateCustomer);

module.exports = customersRouter;