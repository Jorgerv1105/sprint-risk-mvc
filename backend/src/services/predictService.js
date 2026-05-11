const db = require('../config/db');

exports.predictTask = (taskData) => {

    return new Promise((resolve, reject) => {

        db.query(

            'SELECT * FROM historical_tasks',

            (error, historicalTasks) => {

                if (error) {

                    return reject(error);

                }

                let similarTasks = [];

                historicalTasks.forEach((history) => {

                    let similarityScore = 0;

                    if (

                        history.task_type ===
                        taskData.task_type

                    ) {

                        similarityScore += 40;

                    }

                    if (

                        history.complexity ===
                        taskData.complexity

                    ) {

                        similarityScore += 30;

                    }

                    if (

                        history.technology ===
                        taskData.technology

                    ) {

                        similarityScore += 20;

                    }

                    const pointsDifference =

                        Math.abs(

                            history.story_points -
                            taskData.story_points

                        );

                    if (pointsDifference <= 2) {

                        similarityScore += 10;

                    }

                    if (similarityScore >= 60) {

                        similarTasks.push({

                            ...history,

                            similarityScore

                        });

                    }

                });

                if (similarTasks.length === 0) {

                    return resolve({

                        message:
                        'No similar tasks found'

                    });

                }

                let weightedHours = 0;

                let totalWeight = 0;

                similarTasks.forEach((task) => {

                    weightedHours +=

                        task.real_hours *

                        (task.similarityScore / 100);

                    totalWeight +=

                        (task.similarityScore / 100);

                });

                const predictedHours =

                    weightedHours /
                    totalWeight;

                let risk = 'Low';

                if (

                    predictedHours >
                    taskData.estimated_hours

                ) {

                    risk = 'Medium';

                }

                if (

                    predictedHours >
                    taskData.estimated_hours * 1.5

                ) {

                    risk = 'High';

                }

                resolve({

                    estimated_hours:
                    taskData.estimated_hours,

                    predicted_hours:
                    Math.round(predictedHours),

                    risk,

                    similar_tasks:
                    similarTasks.length,

                    matches:
                    similarTasks

                });

            }

        );

    });

};