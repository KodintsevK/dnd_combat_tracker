'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    try {
      // -- Шаг 1: Добавить новый столбец uid с типом UUID
      // -- Шаг 2: Заполнить новый столбец uid уникальными значениями
      // -- Шаг 3: Удалить старый столбец id
      // -- Шаг 4: Сделать uid первичным ключом

      await queryInterface.sequelize.query(`
        ALTER TABLE users ADD COLUMN uid UUID;

        UPDATE users SET uid = gen_random_uuid();

        ALTER TABLE users DROP COLUMN id;

        ALTER TABLE users 
          ALTER COLUMN uid SET NOT NULL,
          ADD CONSTRAINT users_pkey PRIMARY KEY (uid);
      `); 
    } catch (error) {
      console.log(error);
      
    }
  },

  async down (queryInterface: QueryInterface, Sequelize: typeof DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
