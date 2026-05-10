const taskService =
require('../services/taskService');

const createTask = async (req, res) => {

    try {

        const {

            sprint_id,
            estimated_hours

        } = req.body;

        await taskService.validateSprintCapacity(

            sprint_id,
            estimated_hours,
            120

        );

        res.json({

            message: 'Tarea válida'

        });

    } catch (error) {

        res.status(400).json({

            error: error.message

        });

    }

};

module.exports = {

    createTask

};