const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'secret123',
  database: process.env.DB_NAME || 'notesdb',
});

// Test de conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL');
    release();
  }
});

// ============= RUTAS DE LA API =============

// GET / - Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 API de Notas funcionando!',
    endpoints: {
      'GET /notes': 'Obtener todas las notas',
      'GET /notes/:id': 'Obtener una nota por ID',
      'POST /notes': 'Crear nueva nota',
      'PUT /notes/:id': 'Actualizar nota',
      'DELETE /notes/:id': 'Eliminar nota'
    }
  });
});

// GET /notes - Obtener todas las notas
app.get('/notes', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notes ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener notas:', error);
    res.status(500).json({ error: 'Error al obtener notas' });
  }
});

// GET /notes/:id - Obtener una nota por ID
app.get('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM notes WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener nota:', error);
    res.status(500).json({ error: 'Error al obtener nota' });
  }
});

// POST /notes - Crear nueva nota
app.post('/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }
    
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content || '']
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear nota:', error);
    res.status(500).json({ error: 'Error al crear nota' });
  }
});

// PUT /notes/:id - Actualizar nota
app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }
    
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, content || '', id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ error: 'Error al actualizar nota' });
  }
});

// DELETE /notes/:id - Eliminar nota
app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM notes WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Nota no encontrada' });
    }
    
    res.json({ message: 'Nota eliminada correctamente', note: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar nota:', error);
    res.status(500).json({ error: 'Error al eliminar nota' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
