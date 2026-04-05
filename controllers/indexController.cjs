const releaseDB = require('../db/releases/repository.cjs');

async function getHome(req, res){
    const searchTerm = req.query.searchTerm;
    const releases = await releaseDB.getAllReleasesWithSearch(searchTerm);
    res.render("home", {releases, searchTerm: searchTerm});
}

async function postSearchForm(req, res){
    const searchTerm = req.body.searchTerm;

    res.redirect(`/?searchTerm=${searchTerm}`);
}

module.exports.getHome = getHome;
module.exports.postSearchForm = postSearchForm;