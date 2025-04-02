import { DataTypes, Model, BelongsToGetAssociationMixin  } from 'sequelize';
import sequelize from './db';
import User from './User';

class Unit extends Model {
  public uid                !: string;
  public name               !: string;
  public armorClass         !: number;
  public initiative         !: number;
  public maxHP              !: number;
  // public damageTaken        !: number;
  // public timelessHp         !: number;

  public userUID            !: string;
  public getUser            !: BelongsToGetAssociationMixin<User>;

  public readonly createdAt !: Date;
  public readonly updatedAt !: Date;
}

Unit.init(
  {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    armorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    initiative: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    maxHP: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // damageTaken: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    // timelessHp: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    // },
    userUID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
  },
  {
    sequelize,
    modelName: 'Unit',
    tableName: 'units', // Имя таблицы в базе данных
    timestamps: true, // Добавляет поля createdAt и updatedAt
  }
);


export default Unit;