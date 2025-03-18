import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './database/db';
import UserController from './controllers/UserController';
import errorMiddlware  from './middlware/error-middlware';
import './database/umzug';
dotenv.config();



const app = express();
const PORT = process.env.PORT;
const IP : string = process.env.IP || 'localhost'

const corsOptions = {
  origin: `http://${IP}:8080`,
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

app.get('/test', (req, res) => {
  res.send('ok');
});

// Регистрация пользователя
app.post('/register', UserController.register);

// Логин пользователя
app.post('/login', UserController.login);
app.get('/whoami', UserController.whoAmI);

app.use(errorMiddlware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});