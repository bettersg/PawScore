import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export enum AdoptionStatus {
  Ongoing = "Ongoing",
  Adopted = "Adopted",
  Archived = "Archived"
}

// These are all the attributes for the model
export interface AdoptionStatusAttributes {
  id: string;
  status: AdoptionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class AdoptionStatusModel extends Model<AdoptionStatusAttributes>
  implements AdoptionStatusAttributes {
  public id!: string;
  public status!: AdoptionStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AdoptionStatusModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM(...toEnumValues(AdoptionStatus)),
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
    tableName: "adoption_status",
    sequelize, // passing the `sequelize` instance is required
  }
);
