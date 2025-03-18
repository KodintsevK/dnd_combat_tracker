import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import User from './User';
import Unit from './Unit';
dotenv.config();
console.log(process.env.DATABASE_URL);


const sequelize = new Sequelize(
  process.env.DATABASE_URL!, // URL базы данных из .env
  {
    dialect: 'postgres', // Указываем, что используем PostgreSQL
    logging: false, // Отключаем логирование SQL-запросов (можно включить для отладки)
  }
);

export default sequelize;