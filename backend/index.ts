import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

import User from './database/User';
import sequelize from './database/db';

// Синхронизация базы данных
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET as string;

app.use(
  cors({
    origin: 'http://localhost:3000', // Разрешить запросы только с этого домена
    credentials: true, // Разрешить отправку куки и заголовков авторизации
  })
);

app.use(express.json());


// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET , { expiresIn: '1h' });

    res.status(201).json({ token: token, email: user.email });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET , { expiresIn: '1h' });
    res.json({ token: token, email: user.email });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});