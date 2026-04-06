const {Client} = require('pg');

const connectionString = process.argv[2];

if(!connectionString){
    console.error('Connection string not found');
    process.exit(1);
}

const queries = require('../buildQueries.cjs')(__dirname, 
    'createTables', 
    'insertDefaultValues', 
);

async function main(){
    console.log('Initializing DB');

    const client  = new Client(
        {
            connectionString: connectionString,
            ssl: {rejectUnauthorized: false}
        }
    );

    await client.connect();
    for(let query of Object.values(queries)){
        await client.query(query);
    }
    await client.end();

    console.log('Done');
} 

main();