
const editionDB = require('../db/editions/repository.cjs');

async function getAllEditions(req, res) {
    const editions = await editionDB.getAllEditions();
    res.render('pages/editions/index', {editions});
}

function getCreateForm(req, res) {
    res.render('pages/editions/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await editionDB.addEdition(name);
    res.redirect("/editions");
}

async function postDeleteEdition(req, res) {
    const {id} = req.params;
    await editionDB.deleteEdition(id);
    res.redirect("/editions");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const edition = await editionDB.getEditionById(id);
    res.render('pages/editions/updateForm', {edition});
}

async function postUpdateEdition(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await editionDB.updateEdition(id, name);
    res.redirect("/editions");
}

module.exports.getAllEditions = getAllEditions;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeleteEdition = postDeleteEdition;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdateEdition = postUpdateEdition;