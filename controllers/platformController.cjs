
const { validationResult, matchedData } = require('express-validator');
const platformDB = require('../db/platforms/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllPlatforms(req, res) {
    const platforms = await platformDB.getAllPlatforms();
    res.render('pages/platforms/index', {platforms});
}

function getCreateForm(req, res) {
    res.render('pages/platforms/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/platforms/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await platformDB.addPlatform(name);
    res.redirect("/platforms");
}

async function postDeletePlatform(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await platformDB.deletePlatform(id);
    res.redirect("/platforms");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const platform = await platformDB.getPlatformById(id);
    res.render('pages/platforms/updateForm', {platform});
}

async function postUpdatePlatform(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/platforms/updateForm', { errors: errors.array(), platform: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await platformDB.updatePlatform(id, name);
    res.redirect("/platforms");
}

module.exports.getAllPlatforms = getAllPlatforms;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeletePlatform = [idValidator, postDeletePlatform];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdatePlatform = [idValidator, nameValidator, postUpdatePlatform];