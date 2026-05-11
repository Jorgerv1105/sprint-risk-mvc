const predictService =
require('../services/predictService');

exports.predictRisk = async (req, res) => {

    try {

        const result =
        await predictService.predictTask(req.body);

        res.json(result);

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};