
const { validationResult, matchedData } = require('express-validator');
const gameDB = require('../db/games/repository.cjs');
const genreDB = require('../db/genres/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const descriptionValidator = require('../middlewares/validation/formValidation.cjs').body.descriptionValidator;
const genreIdsValidator = require('../middlewares/validation/formValidation.cjs').body.genreIdsValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllGames(req, res) {
    const games = await gameDB.getAllGames();
    res.render('pages/games/index', {games});
}

async function getCreateForm(req, res) {
    
    const genres = await genreDB.getAllGenres();
    res.render('pages/games/createForm', {genres});
}

async function getGameDetails(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.sendStatus(400);
    }

    const {id} = matchedData(req);

    const game = await gameDB.getGameById(id);

    res.render('pages/games/details', {game});
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const genres = await genreDB.getAllGenres();
        return res.status(400).render('pages/games/createForm', { errors: errors.array(), genres });
    }
    const {name, description, genres} = matchedData(req);
    await gameDB.addGame(name, description, genres);
    res.redirect("/games");
}

async function postDeleteGame(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    await gameDB.deleteGame(id);
    res.redirect("/games");
}

async function getUpdateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.sendStatus(400);
    }
    const {id} = matchedData(req);
    const game = await gameDB.getGameById(id);
    const genres = await genreDB.getAllGenres();
    res.render('pages/games/updateForm', {game, genres});
}

async function postUpdateGame(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const genres = await genreDB.getAllGenres();
        return res.status(400).render('pages/games/updateForm', { errors: errors.array(), game: {id: req.params.id, name: req.body.name, description: req.body.description, genres: req.body.genres}, genres });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name, description, genres} = matchedData(req, {locations: ['body']});
    await gameDB.updateGame(id, name, description, genres);
    res.redirect("/games");
}

function normalizeGenreIds(req, res, next) {
    if(req.body.genres && !Array.isArray(req.body.genres)){
        req.body.genres = [req.body.genres];
    }

    next();
}

module.exports.getAllGames = getAllGames;
module.exports.getCreateForm = getCreateForm;
module.exports.getGameDetails = [idValidator, getGameDetails];
module.exports.postCreateForm = [nameValidator, descriptionValidator, normalizeGenreIds, genreIdsValidator, postCreateForm];
module.exports.postDeleteGame = [idValidator, postDeleteGame];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateGame = [idValidator, nameValidator, descriptionValidator, normalizeGenreIds, genreIdsValidator, postUpdateGame];