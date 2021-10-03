'use strict';
import { DataTypes, Model, Optional, Sequelize, UUIDV4 } from "sequelize";
// Initializing sequelize
import allConfig from "../config/config";

// eslint-disable-next-line 
const config: any = allConfig.databaseConfig;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// These are all the attributes for the model
interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  shelterId: string | null;
}

// Some attributes are optional in `User.build` and `User.create` calls
// type UserCreationAttributes = Optional<UserAttributes, "id">
// eslint-disable-next-line 
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public shelterId!: string | null; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /*  The below are examples from https://sequelize.org/master/manual/typescript.html
   *  They will be used for associations
   *
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>;
  public hasProject!: HasManyHasAssociationMixin<Project, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Project>;
  };
  *
  *
  */
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: new DataTypes.ENUM('SHELTER_ADMIN', 'SHELTER_SUPER_ADMIN', 'ADOPTER'),
      allowNull: false,
    },
    shelterId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "user",
    sequelize, // passing the `sequelize` instance is required
  }
);

export { User, UserCreationAttributes, UserAttributes };
