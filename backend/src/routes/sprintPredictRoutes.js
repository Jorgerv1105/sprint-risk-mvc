const express = require('express');

const router = express.Router();

const sprintPredictController =
require('../controllers/sprintPredictController');

router.post(

    '/sprint',

    sprintPredictController.predictSprint

);

module.exports = router;