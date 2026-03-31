
const {validationResult, matchedData } = require('express-validator');
const developerDB = require('../db/developers/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllDevelopers(req, res) {
    const developers = await developerDB.getAllDevelopers();
    res.render('pages/developers/index', {developers});
}

function getCreateForm(req, res) {
    res.render('pages/developers/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/developers/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await developerDB.addDeveloper(name);
    res.redirect("/developers");
}

async function postDeleteDeveloper(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await developerDB.deleteDeveloper(id);
    res.redirect("/developers");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const developer = await developerDB.getDeveloperById(id);
    res.render('pages/developers/updateForm', {developer});
}

async function postUpdateDeveloper(req, res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/developers/updateForm', { errors: errors.array(), developer: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await developerDB.updateDeveloper(id, name);
    res.redirect("/developers");
}

module.exports.getAllDevelopers = getAllDevelopers;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeleteDeveloper = [idValidator, postDeleteDeveloper];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateDeveloper = [idValidator, nameValidator, postUpdateDeveloper];