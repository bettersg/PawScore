import Sequelize from "sequelize";
import { sequelize } from "../database";

export interface AnimalImageAttributes {
  animalId: string;
  photoUrl: string;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AnimalImageCreationAttributes = Sequelize.Optional<
  AnimalImageAttributes,
  "createdAt" | "updatedAt"
>;

export class AnimalImageModel
  extends Sequelize.Model<AnimalImageAttributes, AnimalImageCreationAttributes>
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
      type: Sequelize.DataTypes.STRING,
      primaryKey: true
    },
    photoUrl: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "animal_image",
    sequelize // passing the `sequelize` instance is required
  }
);
