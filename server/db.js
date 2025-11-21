// server/db.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'timebank_app',
  password: process.env.DB_PASS || 'your_password_here',
  database: process.env.DB_NAME || 'timebank',
  port: Number(process.env.DB_PORT || 3306),
})
