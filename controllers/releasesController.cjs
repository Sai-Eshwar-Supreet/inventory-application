
const { validationResult, matchedData, body } = require('express-validator');
const releaseDB = require('../db/releases/repository.cjs');
const gameDB = require('../db/games/repository.cjs');
const editionDB = require('../db/editions/repository.cjs');
const platformDB = require('../db/platforms/repository.cjs');
const publisherDB = require('../db/publishers/repository.cjs');
const regionDB = require('../db/regions/repository.cjs');

const releaseCreationValidation = [
    body('game').toInt().isInt().withMessage('Please select a valid game'),
    body('edition').toInt().isInt().withMessage('Please select a valid edition'),
    body('platform').toInt().isInt().withMessage('Please select a valid platform'),
    body('publisher').toInt().isInt().withMessage('Please select a valid publisher'),
    body('region').toInt().isInt().withMessage('Please select a valid region'),
    body('releaseDate').isDate().withMessage('Please select a valid Date'),
    body('price').isFloat().withMessage('Please enter a valid price'),
    body('coverImagePath').isURL().withMessage('Please enter a valid url').bail()
    .matches(/\.(png|jpe?g|gif)$/).withMessage('Expects image url to be .PNG, .JPEG, .JPG, .GIF'),
];

async function getAllReleases(req, res){
    const releases = await releaseDB.getAllReleases();
    res.render('pages/releases/index', {releases});
}

async function getCreateForm(req, res){
    const games = await gameDB.getAllGames();
    const editions = await editionDB.getAllEditions();
    const platforms = await platformDB.getAllPlatforms();
    const publishers = await publisherDB.getAllPublishers();
    const regions = await regionDB.getAllRegions();

    res.render('pages/releases/createForm', {games, editions, platforms, publishers, regions});
}

async function postCreateForm(req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const games = await gameDB.getAllGames();
        const editions = await editionDB.getAllEditions();
        const platforms = await platformDB.getAllPlatforms();
        const publishers = await publisherDB.getAllPublishers();
        const regions = await regionDB.getAllRegions();
        return res.status(400).render('pages/releases/createForm', {games, editions, platforms, publishers, regions, errors: errors.array()});
    }

    const {game, edition, platform, publisher, region, releaseDate, price, coverImagePath} = matchedData(req);

    const {rows} = await releaseDB.addRelease(game, edition, platform, publisher, region, releaseDate, price, coverImagePath);
    const {id} = rows[0];
    res.redirect(`/games/releases/${id}/details`);
}

module.exports.getAllReleases = getAllReleases;
module.exports.getCreateForm = getCreateForm;
module.exports.postCreateForm = [releaseCreationValidation, postCreateForm];