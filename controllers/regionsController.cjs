
const { validationResult, matchedData } = require('express-validator');
const regionDB = require('../db/regions/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllRegions(req, res) {
    const regions = await regionDB.getAllRegions();
    res.render('pages/regions/index', {regions});
}

function getCreateForm(req, res) {
    res.render('pages/regions/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/regions/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await regionDB.addRegion(name);
    res.redirect("/regions");
}

async function postDeleteRegion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await regionDB.deleteRegion(id);
    res.redirect("/regions");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const region = await regionDB.getRegionById(id);
    res.render('pages/regions/updateForm', {region});
}

async function postUpdateRegion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/regions/updateForm', { errors: errors.array(), region: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await regionDB.updateRegion(id, name);
    res.redirect("/regions");
}

module.exports.getAllRegions = getAllRegions;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeleteRegion = [idValidator, postDeleteRegion];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateRegion = [idValidator, nameValidator, postUpdateRegion];