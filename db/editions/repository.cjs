const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addEdition(name) {
    await pool.query(queries.create, [name]);
}

async function getAllEditions() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getEditionById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deleteEdition(id) {
    await pool.query(queries.delete, [id]);
}

async function updateEdition(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addEdition,
    getAllEditions,
    getEditionById,
    deleteEdition,
    updateEdition
};