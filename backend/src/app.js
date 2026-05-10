require('./config/db');

const express = require('express');

const cors = require('cors');

const taskRoutes =
require('./routes/taskRoutes');

const developerRoutes =
require('./routes/developerRoutes');

const sprintRoutes =
require('./routes/sprintRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/tasks', taskRoutes);

app.use('/developers', developerRoutes);

app.use('/sprints', sprintRoutes);

app.get('/', (req, res) => {

    res.json({
        message: 'Backend funcionando'
    });

});

app.listen(3000, () => {

    console.log('Servidor en puerto 3000');

});