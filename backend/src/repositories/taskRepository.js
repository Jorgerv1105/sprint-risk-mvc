const db = require('../config/db');

const getTasksBySprint = (sprintId) => {

    return new Promise((resolve, reject) => {

        db.query(

            'SELECT * FROM tasks WHERE sprint_id = ?',

            [sprintId],

            (error, results) => {

                if (error) {

                    reject(error);

                }

                resolve(results);

            }

        );

    });

};

module.exports = {

    getTasksBySprint

};