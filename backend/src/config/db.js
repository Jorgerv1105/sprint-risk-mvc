const mysql = require('mysql2');

const connection = mysql.createConnection({

    host: 'localhost',

    user: 'root',

    password: '1234',

    database: 'sprint_risk_manager'

});

connection.connect((error) => {

    if (error) {

        console.log(error);

    } else {

        console.log('MySQL conectado');

    }

});

module.exports = connection;