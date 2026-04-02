const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readForDetailsById', 'readForFormById');

async function addRelease(name, description, genreIds, developerIds) {
    return await pool.query(queries.create, [name, description, genreIds, developerIds]);
}

async function getAllReleases() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getReleaseByIdForForms(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}
async function getReleaseByIdForDisplay(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deleteRelease(id) {
    await pool.query(queries.delete, [id]);
}

async function updateRelease(id, name, description, genreIds, developerIds) {
    await pool.query(queries.update, [id, name, description, genreIds, developerIds]);
}

module.exports = {
    addRelease,
    getAllReleases,
    getReleaseByIdForForms,
    getReleaseByIdForDisplay,
    deleteRelease,
    updateRelease
};