import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';

const app = express();
const port = Number(process.env.PORT || 3000);
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET no está configurado en backend/.env');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'proyecto_europa',
  connectionLimit: 10
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ ok: true });
  } catch {
    res.status(503).json({ ok: false, message: 'Base de datos no disponible.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  if (!username || !password) {
    res.status(400).json({ message: 'Usuario y contraseña son obligatorios.' });
    return;
  }

  try {
    const [rows] = await pool.execute(
      'SELECT id, username, password_hash FROM users WHERE username = ? AND active = 1 LIMIT 1',
      [username]
    );
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ message: 'Credenciales incorrectas.' });
      return;
    }

    const token = jwt.sign({ sub: user.id, username: user.username }, jwtSecret, { expiresIn: '2h' });
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
});

app.listen(port, () => {
  console.log(`API local ejecutándose en http://localhost:${port}`);
});
