import Sequelize from "sequelize";
import { sequelize } from "../database";


export interface ShelterAttributes {
  id: string;
  name: string;
  address: string;
  country: string;
  contact: string;
  registrationNo: string | null;
}

export type ShelterCreationAttributes = Sequelize.Optional<ShelterAttributes, "id">

export class ShelterModel extends Sequelize.Model<ShelterAttributes, ShelterCreationAttributes>
  implements ShelterAttributes {
  public id!: string;
  public name!: string;
  public address!: string;
  public country!: string;
  public contact!: string;
  public registrationNo!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShelterModel.init(
  {
    id: {
      type: Sequelize.DataTypes.UUIDV4,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    registrationNo: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    tableName: "shelter",
    sequelize, // passing the `sequelize` instance is required
  }
);
