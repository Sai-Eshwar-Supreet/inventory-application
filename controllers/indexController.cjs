const releaseDB = require('../db/releases/repository.cjs');

async function getHome(req, res){
    const releases = await releaseDB.getAllReleases();
    res.render("home", {releases});
}

module.exports.getHome = getHome;