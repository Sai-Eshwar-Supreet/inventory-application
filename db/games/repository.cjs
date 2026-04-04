const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readByIdForDetails', 'readByIdForForm');

async function addGame(name, description, genreIds, developerIds) {
    return await pool.query(queries.create, [name, description, genreIds, developerIds]);
}

async function getAllGames() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getGameByIdForDetails(id) {
    const {rows} = await pool.query(queries.readByIdForDetails, [id]);
    return rows[0];
}
async function getGameByIdForForm(id) {
    const {rows} = await pool.query(queries.readByIdForForm, [id]);
    return rows[0];
}

async function deleteGame(id) {
    await pool.query(queries.delete, [id]);
}

async function updateGame(id, name, description, genreIds, developerIds) {
    await pool.query(queries.update, [id, name, description, genreIds, developerIds]);
}

module.exports = {
    addGame,
    getAllGames,
    getGameByIdForDetails,
    getGameByIdForForm,
    deleteGame,
    updateGame
};