
const platformDB = require('../db/platforms/platformQueries.cjs');

async function getAllPlatforms(req, res) {
    const platforms = await platformDB.getAllPlatforms();
    res.render('pages/platforms/index', {platforms});
}

function getCreateForm(req, res) {
    res.render('pages/platforms/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await platformDB.addPlatform(name);
    res.redirect("/platforms");
}

async function postDeletePlatform(req, res) {
    const {id} = req.params;
    await platformDB.deletePlatform(id);
    res.redirect("/platforms");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const platform = await platformDB.getPlatformById(id);
    res.render('pages/platforms/updateForm', {platform});
}

async function postUpdatePlatform(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await platformDB.updatePlatform(id, name);
    res.redirect("/platforms");
}

module.exports.getAllPlatforms = getAllPlatforms;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeletePlatform = postDeletePlatform;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdatePlatform = postUpdatePlatform;