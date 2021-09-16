'use strict';
import { Sequelize, Model, Optional, DataTypes, UUIDV4 } from "sequelize";

// Initializing sequelize
import allConfig from "../config/config";
// eslint-disable-next-line 
const config: any = allConfig.databaseConfig;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// These are all the attributes for the model
interface BookingAttributes {
  id: string;
  shelterId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
}

// Some attributes are optional in model.build() or model.create()
// type BookingCreationAttributes = Optional<BookingAttributes, "id">
// eslint-disable-next-line 
interface BookingCreationAttributes extends Optional<BookingAttributes, "id"> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes {
  public id!: string;
  public shelterId!: string;
  public userId!: string;
  public startDate!: Date;
  public endDate!: Date;

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

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    shelterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "booking",
    sequelize, // passing the `sequelize` instance is required
  }
);

export { Booking, BookingCreationAttributes, BookingAttributes };

