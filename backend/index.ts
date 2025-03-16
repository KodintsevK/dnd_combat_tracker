import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import sequelize from './database/db';
import UserController from './controllers/UserController';
import errorMiddlware  from './middlware/error-middlware';
dotenv.config();

// Синхронизация базы данных
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
});

const app = express();
const PORT = process.env.PORT;
const IP : string = process.env.IP || `localhost`

app.use(
  cors({

    // попробуй с клиента слать запросы не на localhost а на адресс IP
    origin: `http://${IP}:3000`, // Разрешить запросы только с этого домена
    credentials: true, // Разрешить отправку куки и заголовков авторизации
  })
);

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