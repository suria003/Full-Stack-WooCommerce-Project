const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const connections = mysql.createPool({
    host: 'localhost',
    user: 'woocommerce',
    password: 'woocommerce123',
    database: 'woocommerce',
    waitForConnections: false,
    connectionLimit: 50,
})

connections.execute('SELECT VERSION() AS version', (err, results) => {
    if (err){
        console.log('connection error:', err);
    } else {
        console.log('DB Connected.');
    }
    console.log('Version:', results[0].version);
});

module.exports = connections.promise();