const fs = require('fs');
const path = require('path');

function buildQueries(dirname, ...operations) {
    const queriesToReturn = {};
    operations.forEach(operation => {
        const query = fs.readFileSync(path.join(dirname, "queries", `${operation}.sql`), 'utf-8');
        queriesToReturn[operation] = query;
    });
    return queriesToReturn;
}

module.exports = buildQueries;