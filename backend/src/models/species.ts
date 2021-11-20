import { Species } from "@contract";
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export interface SpeciesAttributes {
  id: string;
  name: Species;
  createdAt: Date;
  updatedAt: Date;
}

export class SpeciesModel extends Model<SpeciesAttributes>
  implements SpeciesAttributes {
  public id!: string;
  public name!: Species;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SpeciesModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM(...toEnumValues(Species)),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    tableName: "species",
    sequelize, // passing the `sequelize` instance is required
  }
);
