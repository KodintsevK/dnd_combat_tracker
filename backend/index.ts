import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './database/db';
import errorMiddlware  from './middlware/error-middlware';
import './database/umzug';
import router from './routers';
import { NextFunction, Request, Response } from "express";

dotenv.config();



const app = express();
const PORT = process.env.PORT;

const CORS_URL : string = process.env.CORS_URL || 'localhost'
const CORS_PORT : string = process.env.CORS_PORT || '3000'
const clientIP : string = process.env.clientIP!;
console.log("clientIP: ", clientIP);
console.log("comboIP: ", `http://${CORS_URL}:${CORS_PORT}`);

const corsOptions = {
  origin: [`http://${CORS_URL}:${CORS_PORT}`, clientIP],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};




const requestLogger = (req : Request, res: Response, next: NextFunction) => {
  // Получаем IP-адрес клиента
  const clientIp_r = req.ip || req.connection.remoteAddress;

  // Логируем IP-адрес
  console.log('Request from IP:', clientIp_r);

  // Логируем заголовки запроса
  console.log('Request Headers:', req.headers);

  // Передаем управление следующему middleware или обработчику маршрута
  next();
};

app.use(requestLogger);

// Синхронизация базы данных
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api', router);

app.use(errorMiddlware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});