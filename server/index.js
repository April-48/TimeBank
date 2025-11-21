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

router.get('/tasks', async (req, res) => {
  const { status, search } = req.query;

  let sql = `
    SELECT
      t.task_id AS id,
      t.title,
      t.description,
      t.status,
      t.deadline_at,
      t.budget_timecoin,
      u.name AS poster_name,
      COUNT(DISTINCT p.proposal_id) AS proposal_count,
      GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS required_skills
    FROM TASK t
    JOIN USER u
      ON u.user_id = t.poster_user_id
    LEFT JOIN TASK_SKILL ts
      ON ts.task_id = t.task_id
    LEFT JOIN SKILL s
      ON s.skill_id = ts.skill_id
    LEFT JOIN PROPOSAL p
      ON p.task_id = t.task_id
  `;

  const params = [];
  const conditions = [];

  if (status) {
    conditions.push('t.status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(t.title LIKE ? OR t.description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  if (conditions.length) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += `
    GROUP BY
      t.task_id,
      t.title,
      t.description,
      t.status,
      t.deadline_at,
      t.budget_timecoin,
      u.name
    ORDER BY t.deadline_at ASC, t.created_at DESC
  `;

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('GET /tasks error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// mount router under /api
app.use('/api', router)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}/api`)
})
