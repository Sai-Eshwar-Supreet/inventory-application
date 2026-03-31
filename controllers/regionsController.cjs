
const regionDB = require('../db/regions/repository.cjs');

async function getAllRegions(req, res) {
    const regions = await regionDB.getAllRegions();
    res.render('pages/regions/index', {regions});
}

function getCreateForm(req, res) {
    res.render('pages/regions/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await regionDB.addRegion(name);
    res.redirect("/regions");
}

async function postDeleteRegion(req, res) {
    const {id} = req.params;
    await regionDB.deleteRegion(id);
    res.redirect("/regions");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const region = await regionDB.getRegionById(id);
    res.render('pages/regions/updateForm', {region});
}

async function postUpdateRegion(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await regionDB.updateRegion(id, name);
    res.redirect("/regions");
}

module.exports.getAllRegions = getAllRegions;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeleteRegion = postDeleteRegion;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdateRegion = postUpdateRegion;