// server/index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// All routes will be under /api to match client.js
const router = express.Router()

// ---------- Health check ----------
router.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    res.json({ ok: true, db: rows[0].ok })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false, error: err.message })
  }
})

/**
 * 1) AUTH EXAMPLE: POST /auth/login
 * Adjust table/column names to match your schema.
 */
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const [rows] = await pool.query(
      'SELECT user_id, name, email, password_hash FROM users WHERE email = ?',
      [email]
    )

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = rows[0]

    // For now, plain compare (for demo). If you have hashes, use bcrypt.
    if (user.password_hash !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // You can shape this however the frontend expects
    res.json({
      id: user.user_id,
      name: user.name,
      email: user.email,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

/**
 * 2) TASKS EXAMPLE
 * GET /tasks  → list tasks (for board)
 * POST /tasks → create a new task
 */

// GET /tasks
router.get('/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.task_id AS id,
              t.title,
              t.description,
              t.budget,
              u.name AS ownerName
       FROM task t
       JOIN users u ON u.user_id = t.owner_id
       ORDER BY t.created_at DESC`
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /tasks
router.post('/tasks', async (req, res) => {
  const { title, description, budget, ownerId } = req.body
  try {
    const [result] = await pool.query(
      `INSERT INTO task (title, description, budget, owner_id)
       VALUES (?, ?, ?, ?)`,
      [title, description, budget, ownerId]
    )

    res.status(201).json({ id: result.insertId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// mount router under /api
app.use('/api', router)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}/api`)
})
