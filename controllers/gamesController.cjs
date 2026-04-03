
const { validationResult, matchedData } = require('express-validator');
const gameDB = require('../db/games/repository.cjs');
const genreDB = require('../db/genres/repository.cjs');
const developerDB = require('../db/developers/repository.cjs');
const releasesDB = require('../db/releases/repository.cjs');

const nameValidator = require('../middlewares/validation/formValidation.cjs').body.nameValidator;
const descriptionValidator = require('../middlewares/validation/formValidation.cjs').body.descriptionValidator;
const genreIdsValidator = require('../middlewares/validation/formValidation.cjs').body.genreIdsValidator;
const developersIdsValidator = require('../middlewares/validation/formValidation.cjs').body.developersIdsValidator;
const idValidator = require('../middlewares/validation/formValidation.cjs').params.idValidator;

async function getAllGames(req, res) {
    const games = await gameDB.getAllGames();
    res.render('pages/games/index', {games});
}

async function getCreateForm(req, res) {
    
    const genres = await genreDB.getAllGenres();
    const developers = await developerDB.getAllDevelopers();
    res.render('pages/games/createForm', {genres, developers});
}

async function getGameDetails(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.sendStatus(400);
    }

    const {id} = matchedData(req);

    const game = await gameDB.getGameById(id);
    const releases = await releasesDB.getAllReleasesByGame(id);

    res.render('pages/games/details', {game, releases});
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const genres = await genreDB.getAllGenres();
        const developers = await developerDB.getAllDevelopers();
        return res.status(400).render('pages/games/createForm', { errors: errors.array(), genres, developers });
    }
    const {name, description, genres, developers} = matchedData(req);
    const {rows} = await gameDB.addGame(name, description, genres, developers);
    const {id} = rows[0];
    res.redirect(`/games/${id}/details`);
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
    const developers = await developerDB.getAllDevelopers();
    res.render('pages/games/updateForm', {game, genres, developers});
}

async function postUpdateGame(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const genres = await genreDB.getAllGenres();
        const developers = await developerDB.getAllDevelopers();
        return res.status(400).render('pages/games/updateForm', { errors: errors.array(), game: {id: req.params.id, name: req.body.name, description: req.body.description, genres: req.body.genres}, genres, developers });
    }
    const {id} = matchedData(req, {locations: ['params']});
    const {name, description, genres, developers} = matchedData(req, {locations: ['body']});
    await gameDB.updateGame(id, name, description, genres, developers);
    res.redirect(`/games/${id}/details`);
}

function normalizeIds(req, res, next) {
    if(req.body.genres && !Array.isArray(req.body.genres)){
        req.body.genres = [req.body.genres];
    }
    if(req.body.developers && !Array.isArray(req.body.developers)){
        req.body.developers = [req.body.developers];
    }
    next();
}

module.exports.getAllGames = getAllGames;
module.exports.getCreateForm = getCreateForm;
module.exports.getGameDetails = [idValidator, getGameDetails];
module.exports.postCreateForm = [nameValidator, descriptionValidator, normalizeIds, genreIdsValidator, developersIdsValidator, postCreateForm];
module.exports.postDeleteGame = [idValidator, postDeleteGame];
module.exports.getUpdateForm = [idValidator, getUpdateForm];
module.exports.postUpdateGame = [idValidator, nameValidator, descriptionValidator, normalizeIds, genreIdsValidator, developersIdsValidator, postUpdateGame];