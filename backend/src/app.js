// Asignamos la conexión a una constante 'db' para poder usarla en este archivo
const db = require('./config/db'); 

const express = require('express');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const predictRoutes = require('./routes/predictRoutes');
const sprintPredictRoutes = require('./routes/sprintPredictRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// ==========================================
// TUS RUTAS EXISTENTES (MVC)
// ==========================================
app.use('/tasks', taskRoutes);
app.use('/predict', predictRoutes);
app.use('/predict', sprintPredictRoutes);

// ==========================================
// NUEVAS RUTAS PARA LOS DROPDOWNS DE SVELTE
// ==========================================
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

// ==========================================
// RUTA DE PRUEBA Y SERVIDOR
// ==========================================
app.get('/', (req, res) => {
    res.json({
        message: 'Backend funcionando'
    });
});

app.listen(3000, () => {
    console.log('Servidor en puerto 3000');
});