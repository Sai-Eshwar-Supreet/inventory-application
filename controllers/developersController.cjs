
const developerDB = require('../db/developers/repository.cjs');

async function getAllDevelopers(req, res) {
    const developers = await developerDB.getAllDevelopers();
    res.render('pages/developers/index', {developers});
}

function getCreateForm(req, res) {
    res.render('pages/developers/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await developerDB.addDeveloper(name);
    res.redirect("/developers");
}

async function postDeleteDeveloper(req, res) {
    const {id} = req.params;
    await developerDB.deleteDeveloper(id);
    res.redirect("/developers");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const developer = await developerDB.getDeveloperById(id);
    res.render('pages/developers/updateForm', {developer});
}

async function postUpdateDeveloper(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await developerDB.updateDeveloper(id, name);
    res.redirect("/developers");
}

module.exports.getAllDevelopers = getAllDevelopers;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeleteDeveloper = postDeleteDeveloper;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdateDeveloper = postUpdateDeveloper;