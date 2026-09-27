const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Test backend
app.get('/', (req, res) => {
  res.send('Student Management API is running');
});

// Test database
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Database connected successfully',
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

// GET all students
app.get('/api/students', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM students ORDER BY id ASC'
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch students',
    });
  }
});

// GET one student
app.get('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM students WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch student',
    });
  }
});

// POST add student
app.post('/api/students', async (req, res) => {
  try {
    const { name, email, phone, department, year } = req.body;

    const result = await pool.query(
      `INSERT INTO students
       (name, email, phone, department, year)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, email, phone, department, year]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create student',
    });
  }
});

// PUT update student
app.put('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, department, year } = req.body;

    const result = await pool.query(
      `UPDATE students
       SET name = $1,
           email = $2,
           phone = $3,
           department = $4,
           year = $5,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [name, email, phone, department, year, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update student',
    });
  }
});

// DELETE student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM students WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Student not found',
      });
    }

    res.json({
      message: 'Student deleted successfully',
      student: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete student',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});