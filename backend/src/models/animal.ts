import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../database";
import { numericStringtoFloat } from "../utils/modelType";
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
  ageMonths: number | null;
  sizeCm: number | null;
  breed: string | null;
  color: string;
  weightKg: number | null;
  furLength: string | null;
  vaccinated: boolean | null;
  dewormed: boolean | null;
  sterilized: boolean | null;
  adoptionFee: number | null;
  intakeDate: string;
  createdAt: Date;
  updatedAt: Date;

  animalImages?: AnimalImageAttributes[];
}

// Some attributes are optional in `Animal.build` and `Animal.create` calls
export type AnimalCreationAttributes = Optional<
  AnimalAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class AnimalModel
  extends Model<AnimalAttributes, AnimalCreationAttributes>
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
  public color!: string;
  public weightKg!: number | null;
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
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true
    },
    shelterId: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    adoptionStatus: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.DECIMAL,
      get: numericStringtoFloat("weightKg")
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
      type: DataTypes.DECIMAL,
      get: numericStringtoFloat("adoptionFee")
    },
    intakeDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: "animal",
    sequelize // passing the `sequelize` instance is required
  }
);

AnimalModel.hasMany(AnimalImageModel, {
  sourceKey: "id",
  foreignKey: "animalId",
  as: "animalImages"
});
