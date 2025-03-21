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
const IP : string = process.env.IP || 'localhost'
const clientIP : string = process.env.clientIP || "http://localhost:8080"
console.log(IP);
console.log('clientIP: ',clientIP);


const corsOptions = {
  origin: clientIP,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.send('ok');
});

// Регистрация пользователя
app.post('/api/register', UserController.register);

// Логин пользователя
app.post('/api/login', UserController.login);
app.get('/api/whoami', UserController.whoAmI);

app.use(errorMiddlware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});