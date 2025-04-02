import { DataTypes, Model, HasManyGetAssociationsMixin } from 'sequelize';
import sequelize from './db';
import Unit from './Unit';


class User extends Model {
  public uid                !: string;
  public email              !: string;
  public password           !: string;

  public getUnits!: HasManyGetAssociationsMixin<Unit>;

  public readonly createdAt !: Date;
  public readonly updatedAt !: Date;
}

User.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', // Имя таблицы в базе данных
    timestamps: true, // Добавляет поля createdAt и updatedAt
  }
);

User.hasMany(Unit, {
  foreignKey: 'userUID', // Внешний ключ в таблице units
  sourceKey: 'uid', // Первичный ключ в таблице users
});

// Определяем связь "многие к одному"
Unit.belongsTo(User, {
  foreignKey: 'userUID', // Внешний ключ в таблице units
  targetKey: 'uid', // Первичный ключ в таблице users
});

export default User;