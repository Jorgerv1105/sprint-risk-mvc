const predictService = require('../services/predictService');

exports.predictSprint = async (req, res) => {

    try {

        const {

            tasks,
            sprint_capacity

        } = req.body;

        let sprintResults = [];

        let totalPredictedHours = 0;

        for (const task of tasks) {

            const result = await predictService.predictTask(task);

            sprintResults.push(result);

            totalPredictedHours +=
            result.predicted_hours;

        }

        let sprintRisk = 'Low';

        if (

            totalPredictedHours >
            sprint_capacity

        ) {

            sprintRisk = 'Medium';

        }

        if (

            totalPredictedHours >
            sprint_capacity * 1.3

        ) {

            sprintRisk = 'High';

        }

        res.json({

            sprint_capacity,

            total_predicted_hours:
            totalPredictedHours,

            sprint_risk:
            sprintRisk,

            tasks_analyzed:
            sprintResults.length,

            results:
            sprintResults

        });

    } catch (error) {

        res.status(500).json({

            error: error.message

        });

    }

};