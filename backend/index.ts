import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './database/db';
import UserController from './controllers/UserController';
import errorMiddlware  from './middlware/error-middlware';
dotenv.config();
import { NextFunction, Request, Response } from "express";

// Синхронизация базы данных
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

const app = express();
const PORT = process.env.PORT;

const requestLogger = (req : Request, res: Response, next: NextFunction) => {
  // Получаем IP-адрес клиента
  const clientIp = req.ip || req.connection.remoteAddress;

  // Логируем IP-адрес
  console.log('Request from IP:', clientIp);

  // Логируем заголовки запроса
  console.log('Request Headers:', req.headers);

  // Передаем управление следующему middleware или обработчику маршрута
  next();
};

app.use(requestLogger);

app.use(cors());
app.options('*', cors())

// app.use(
//   cors({
//     // попробуй с клиента слать запросы не на localhost а на адресс IP
//     origin: `http://localhost:3000`, // Разрешить запросы только с этого домена
//     credentials: true, // Разрешить отправку куки и заголовков авторизации
//   })
// );

app.use(express.json());


// Регистрация пользователя
app.post('/register', UserController.register);

// Логин пользователя
app.post('/login', UserController.login);
app.get('/whoami', UserController.whoAmI);

app.use(errorMiddlware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});