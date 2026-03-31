const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addPublisher(name) {
    await pool.query(queries.create, [name]);
}

async function getAllPublishers() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getPublisherById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deletePublisher(id) {
    await pool.query(queries.delete, [id]);
}

async function updatePublisher(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addPublisher,
    getAllPublishers,
    getPublisherById,
    deletePublisher,
    updatePublisher
};