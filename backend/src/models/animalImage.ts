import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface AnimalImageAttributes {
  animalId: string;
  photoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AnimalImageCreationAttributes = AnimalImageAttributes

export class AnimalImageModel extends Model<AnimalImageAttributes, AnimalImageCreationAttributes>
  implements AnimalImageAttributes {
  public animalId!: string;
  public photoUrl!: string;
  public thumbnailUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AnimalImageModel.init(
  {
    animalId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false
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
    tableName: "animal_image",
    sequelize, // passing the `sequelize` instance is required
  }
);
