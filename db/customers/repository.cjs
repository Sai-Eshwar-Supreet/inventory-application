const pool = require('../pool.cjs');

const queries = require('../buildQueries.cjs')(__dirname, 'create', 'read', 'update', 'delete', 'readById');

async function addCustomer(name) {
    await pool.query(queries.create, [name]);
}

async function getAllCustomers() {
    const {rows} = await pool.query(queries.read);
    return rows;
}

async function getCustomerById(id) {
    const {rows} = await pool.query(queries.readById, [id]);
    return rows[0];
}

async function deleteCustomer(id) {
    await pool.query(queries.delete, [id]);
}

async function updateCustomer(id, name) {
    await pool.query(queries.update, [id, name]);
}

module.exports = {
    addCustomer,
    getAllCustomers,
    getCustomerById,
    deleteCustomer,
    updateCustomer
};