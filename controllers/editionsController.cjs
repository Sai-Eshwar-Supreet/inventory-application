
const { validationResult, matchedData } = require('express-validator');
const editionDB = require('../db/editions/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllEditions(req, res) {
    const editions = await editionDB.getAllEditions();
    res.render('pages/editions/index', {editions});
}

function getCreateForm(req, res) {
    res.render('pages/editions/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/editions/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await editionDB.addEdition(name);
    res.redirect("/editions");
}

async function postDeleteEdition(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await editionDB.deleteEdition(id);
    res.redirect("/editions");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const edition = await editionDB.getEditionById(id);
    res.render('pages/editions/updateForm', {edition});
}

async function postUpdateEdition(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/editions/updateForm', { errors: errors.array(), edition: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await editionDB.updateEdition(id, name);
    res.redirect("/editions");
}

module.exports.getAllEditions = getAllEditions;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [ nameValidator, postCreateForm ];
module.exports.postDeleteEdition = [ idValidator, postDeleteEdition ];
module.exports.getUpdateForm = [ idValidator, getUpdateForm ];
module.exports.postUpdateEdition = [ idValidator, nameValidator, postUpdateEdition ];