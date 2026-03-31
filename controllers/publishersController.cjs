
const { validationResult, matchedData } = require('express-validator');
const publisherDB = require('../db/publishers/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllPublishers(req, res) {
    const publishers = await publisherDB.getAllPublishers();
    res.render('pages/publishers/index', {publishers});
}

function getCreateForm(req, res) {
    res.render('pages/publishers/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/publishers/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await publisherDB.addPublisher(name);
    res.redirect("/publishers");
}

async function postDeletePublisher(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await publisherDB.deletePublisher(id);
    res.redirect("/publishers");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const publisher = await publisherDB.getPublisherById(id);
    res.render('pages/publishers/updateForm', {publisher});
}

async function postUpdatePublisher(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/publishers/updateForm', { errors: errors.array(), publisher: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await publisherDB.updatePublisher(id, name);
    res.redirect("/publishers");
}

module.exports.getAllPublishers = getAllPublishers;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeletePublisher = [idValidator, postDeletePublisher];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdatePublisher = [idValidator, nameValidator, postUpdatePublisher];