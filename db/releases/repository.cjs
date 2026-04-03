const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readForDetailsById', 'readForFormById', 'readByGame');

async function addRelease(gameId, editionId, platformId, publisherId, regionId, releaseDate, price, coverImagePath) {
    return await pool.query(queries.create, [gameId, editionId, platformId, publisherId, regionId, releaseDate, price, coverImagePath]);
}

async function getAllReleases() {
    const {rows} = await pool.query(queries.read);
    return rows;
}
async function getAllReleasesByGame(gameId){
    const {rows} = await pool.query(queries.readByGame, [gameId]);
    return rows;
}

async function getReleaseByIdForForms(id) {
    const {rows} = await pool.query(queries.readForFormById, [id]);
    return rows[0];
}
async function getReleaseByIdForDisplay(id) {
    const {rows} = await pool.query(queries.readForDetailsById, [id]);
    return rows[0];
}

async function deleteRelease(id) {
    await pool.query(queries.delete, [id]);
}

async function updateRelease(id, gameId, editionId, platformId, publisherId, regionId, releaseDate, price, coverImagePath) {
    await pool.query(queries.update, [id, gameId, editionId, platformId, publisherId, regionId, releaseDate, price, coverImagePath]);
}


module.exports = {
    addRelease,
    getAllReleases,
    getAllReleasesByGame,
    getReleaseByIdForForms,
    getReleaseByIdForDisplay,
    deleteRelease,
    updateRelease
};