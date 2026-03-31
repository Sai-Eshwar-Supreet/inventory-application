const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addRegion(name) {
    await pool.query(queries.create, [name]);
}

async function getAllRegions() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getRegionById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deleteRegion(id) {
    await pool.query(queries.delete, [id]);
}

async function updateRegion(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addRegion,
    getAllRegions,
    getRegionById,
    deleteRegion,
    updateRegion
};