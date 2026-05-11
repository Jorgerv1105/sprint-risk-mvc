const db = require('./config/db'); 

const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const predictRoutes = require('./routes/predictRoutes');
const sprintPredictRoutes = require('./routes/sprintPredictRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/predict', predictRoutes);
app.use('/predict', sprintPredictRoutes);

app.get('/developers', (req, res) => {
    // Hace un SELECT a tu tabla developers
    db.query('SELECT id, name FROM developers', (error, results) => {
        if (error) {
            console.error("Error obteniendo developers:", error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/sprints', (req, res) => {
    // Hace un SELECT a tu tabla sprints
    db.query('SELECT id, name FROM sprints', (error, results) => {
        if (error) {
            console.error("Error obteniendo sprints:", error);
            return res.status(500).json({ error: error.message });
        }
        res.json(results);
    });
});

app.get('/', (req, res) => {
    res.json({
        message: 'Backend funcionando'
    });
});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});