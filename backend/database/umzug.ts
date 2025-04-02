import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import sequelize from './db';

const umzug = new Umzug({
    migrations: {
      glob: 'migrations/*.ts', // Путь к миграциям (TypeScript-файлы)
      resolve: ({ name, path, context }) => {
        // Динамически импортируем миграцию
        const migration = require(path!);
        return {
          name,
          up: async () => migration.up(context, Sequelize),
          down: async () => migration.down(context, Sequelize),
        };
      },
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});
  
const runMigrations = async () => {
    try {
        await sequelize.authenticate();
        console.log('Подключение к базе данных успешно установлено.');

        // Выполнить миграции
        await umzug.up();
        console.log('Миграции успешно выполнены.');
    } catch (error) {
        console.error('Ошибка при выполнении миграций:', error);
        process.exit(1); // Завершить процесс с ошибкой
    }
};

runMigrations();