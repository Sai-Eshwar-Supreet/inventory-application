
const genreDB = require('../db/genres/repository.cjs');

async function getAllGenres(req, res) {
    const genres = await genreDB.getAllGenres();
    res.render('pages/genres/index', {genres});
}

function getCreateForm(req, res) {
    res.render('pages/genres/createForm');
}

async function postCreateForm(req, res) {
    const {name} = req.body;
    await genreDB.addGenre(name);
    res.redirect("/genres");
}

async function postDeleteGenre(req, res) {
    const {id} = req.params;
    await genreDB.deleteGenre(id);
    res.redirect("/genres");
}

async function getUpdateForm(req, res) {
    const {id} = req.params;
    const genre = await genreDB.getGenreById(id);
    res.render('pages/genres/updateForm', {genre});
}

async function postUpdateGenre(req, res) {
    const {id} = req.params;
    const {name} = req.body;
    await genreDB.updateGenre(id, name);
    res.redirect("/genres");
}

module.exports.getAllGenres = getAllGenres;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = postCreateForm;
module.exports.postDeleteGenre = postDeleteGenre;
module.exports.getUpdateForm = getUpdateForm;
module.exports.postUpdateGenre = postUpdateGenre;