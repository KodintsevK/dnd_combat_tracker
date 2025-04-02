import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './database/db';
import errorMiddlware  from './middlware/error-middlware';
import './database/umzug';
import router from './routers';
dotenv.config();



const app = express();
const PORT = process.env.PORT;

const CORS_URL : string = process.env.CORS_URL || 'localhost'
const CORS_PORT : string = process.env.CORS_PORT || '3000'
const clientIP : string = process.env.clientIP!;

const corsOptions = {
  origin: [`http://${CORS_URL}:${CORS_PORT}`, clientIP],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

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