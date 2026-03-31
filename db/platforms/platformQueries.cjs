const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

console.log(queries);

async function addPlatform(name) {
    await pool.query(queries.create, [name]);
}

async function getAllPlatforms() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getPlatformById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deletePlatform(id) {
    await pool.query(queries.delete, [id]);
}

async function updatePlatform(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addPlatform,
    getAllPlatforms,
    getPlatformById,
    deletePlatform,
    updatePlatform
};