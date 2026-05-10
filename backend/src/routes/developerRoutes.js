const express = require('express');

const router = express.Router();

const db = require('../config/db');

router.get('/', (req, res) => {

    db.query(

        'SELECT id, name FROM developers',

        (error, results) => {

            if (error) {

                return res.status(500).json(error);

            }

            res.json(results);

        }

    );

});

module.exports = router;