const mysql = require('mysql2');

const connection = mysql.createConnection({
    // IMPORTANTE: Sin espacios y escrito exactamente así
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306 // Puerto estándar de MySQL
});

connection.connect((error) => {
    if (error) {
        console.error('Error detallado de conexión:', error);
    } else {
        console.log('¡Conexión exitosa a la base de datos de FreeDB!');
    }
});

module.exports = connection;