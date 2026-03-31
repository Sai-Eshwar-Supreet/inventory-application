

const { validationResult, matchedData } = require('express-validator');
const genreDB = require('../db/genres/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllGenres(req, res) {
    const genres = await genreDB.getAllGenres();
    res.render('pages/genres/index', {genres});
}

function getCreateForm(req, res) {
    res.render('pages/genres/createForm');
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/genres/createForm', { errors: errors.array() });
    }
    const {name} = matchedData(req);
    await genreDB.addGenre(name);
    res.redirect("/genres");
}

async function postDeleteGenre(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await genreDB.deleteGenre(id);
    res.redirect("/genres");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const genre = await genreDB.getGenreById(id);
    res.render('pages/genres/updateForm', {genre});
}

async function postUpdateGenre(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('pages/genres/updateForm', { errors: errors.array(), genre: {id: req.params.id, name: req.body.name} });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name} = matchedData(req, {locations: ['body']});
    await genreDB.updateGenre(id, name);
    res.redirect("/genres");
}

module.exports.getAllGenres = getAllGenres;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [nameValidator, postCreateForm];
module.exports.postDeleteGenre = [idValidator, postDeleteGenre];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateGenre = [idValidator, nameValidator, postUpdateGenre];