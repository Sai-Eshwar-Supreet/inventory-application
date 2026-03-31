const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addDeveloper(name) {
    await pool.query(queries.create, [name]);
}

async function getAllDevelopers() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getDeveloperById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deleteDeveloper(id) {
    await pool.query(queries.delete, [id]);
}

async function updateDeveloper(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addDeveloper,
    getAllDevelopers,
    getDeveloperById,
    deleteDeveloper,
    updateDeveloper
};