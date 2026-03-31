
const { validationResult, matchedData } = require('express-validator');
const customerDB = require('../db/customers/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllCustomers(req, res) {
    const customers = await customerDB.getAllCustomers();
    res.render('pages/customers/index', {customers});
}

function getCreateForm(req, res) {
    res.render('pages/customers/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/customers/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await customerDB.addCustomer(name);
    res.redirect("/customers");
}

async function postDeleteCustomer(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await customerDB.deleteCustomer(id);
    res.redirect("/customers");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const customer = await customerDB.getCustomerById(id);
    res.render('pages/customers/updateForm', {customer});
}

async function postUpdateCustomer(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/customers/updateForm', { errors: errors.array(), customer: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await customerDB.updateCustomer(id, name);
    res.redirect("/customers");
}

module.exports.getAllCustomers = getAllCustomers;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeleteCustomer = [idValidator, postDeleteCustomer];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateCustomer = [idValidator, nameValidator, postUpdateCustomer];