const taskRepository =
require('../repositories/taskRepository');

const validateSprintCapacity = async (

    sprintId,
    newHours,
    sprintCapacity

) => {

    const tasks =
    await taskRepository.getTasksBySprint(
        sprintId
    );

    let totalHours = 0;

    tasks.forEach(task => {

        totalHours += task.estimated_hours;

    });

    totalHours += parseInt(newHours);

    if (totalHours > sprintCapacity) {

        throw new Error(
            'Capacidad del sprint excedida'
        );

    }

};

module.exports = {

    validateSprintCapacity

};