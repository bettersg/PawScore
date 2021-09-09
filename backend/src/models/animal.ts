import { Model, Optional, DataTypes, Association } from "sequelize";
import { sequelize } from "../database";
import { AdoptionStatus } from "./adoptionStatus";
import { AnimalImageAttributes, AnimalImageModel } from "./animalImage";
import { Species } from "./species";

export interface AnimalAttributes {
  id: string;
  shelterId: string;
  adoptionStatus: AdoptionStatus;
  species: Species;
  name: string;
  description: string;
  healthIssues: string;
  gender: "F" | "M";
  ageMonths: number;
  sizeCm: number;
  breed: string;
  color: string;
  weightKg: number;
  furLength: string;
  vaccinated: boolean;
  dewormed: boolean;
  sterilized: boolean;
  adoptionFee: number;
  intakeDate: string;
  createdAt: Date;
  updatedAt: Date;

  animalImages?: AnimalImageAttributes[];
}

// Some attributes are optional in `Animal.build` and `Animal.create` calls
// eslint-disable-next-line 
export interface AnimalCreationAttributes extends Optional<AnimalAttributes, "id"> { }

export class AnimalModel extends Model<AnimalAttributes, AnimalCreationAttributes>
  implements AnimalAttributes {
  public id!: string;
  public shelterId!: string;
  public adoptionStatus!: AdoptionStatus;
  public species!: Species;
  public name!: string;
  public description!: string;
  public healthIssues!: string;
  public gender!: "F" | "M";
  public ageMonths!: number | null;
  public sizeCm!: number | null;
  public breed!: string | null;
  public color!: string | null;
  public weightKg!: number;
  public furLength!: string | null;
  public vaccinated!: boolean | null;
  public dewormed!: boolean | null;
  public sterilized!: boolean | null;
  public adoptionFee!: number | null;
  public intakeDate!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly animalImages?: AnimalImageModel[];

  public static associations: {
    animalImages: Association<AnimalModel, AnimalImageModel>;
  };
}

AnimalModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    shelterId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
    adoptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    healthIssues: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ageMonths: {
      type: DataTypes.INTEGER
    },
    sizeCm: {
      type: DataTypes.INTEGER
    },
    breed: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    weightKg: {
      type: DataTypes.DECIMAL
    },
    furLength: {
      type: DataTypes.STRING
    },
    vaccinated: {
      type: DataTypes.BOOLEAN
    },
    dewormed: {
      type: DataTypes.BOOLEAN
    },
    sterilized: {
      type: DataTypes.BOOLEAN
    },
    adoptionFee: {
      type: DataTypes.DECIMAL
    },
    intakeDate: {
      type: DataTypes.DATEONLY,
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
    tableName: "animal",
    sequelize, // passing the `sequelize` instance is required
  }
);

AnimalModel.hasMany(AnimalImageModel, {
  sourceKey: "id",
  foreignKey: "animalId",
  as: "animalImages"
});
