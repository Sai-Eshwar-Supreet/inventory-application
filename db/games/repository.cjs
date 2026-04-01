const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addGame(name, description, genreIds, developerIds) {
    return await pool.query(queries.create, [name, description, genreIds, developerIds]);
}

async function getAllGames() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getGameById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
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
    getGameById,
    deleteGame,
    updateGame
};