
const publisherDB = require('../db/publishers/repository.cjs');

async function getAllPublishers(req, res) {
    const publishers = await publisherDB.getAllPublishers();
    res.render('pages/publishers/index', {publishers});
}

function getCreateForm(req, res) {
    res.render('pages/publishers/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await publisherDB.addPublisher(name);
    res.redirect("/publishers");
}

async function postDeletePublisher(req, res) {
    const {id} = req.params;
    await publisherDB.deletePublisher(id);
    res.redirect("/publishers");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const publisher = await publisherDB.getPublisherById(id);
    res.render('pages/publishers/updateForm', {publisher});
}

async function postUpdatePublisher(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await publisherDB.updatePublisher(id, name);
    res.redirect("/publishers");
}

module.exports.getAllPublishers = getAllPublishers;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeletePublisher = postDeletePublisher;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdatePublisher = postUpdatePublisher;