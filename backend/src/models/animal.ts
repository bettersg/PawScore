import { Animal } from "@contract";
import { Association, DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../database";
import { numericStringtoFloat } from "../utils/modelType";
import { AnimalImageModel } from "./animalImage";

// Some attributes are optional in `Animal.build` and `Animal.create` calls
export type AnimalCreationAttributes = Optional<
	Animal.Attributes,
	"id" | "createdAt" | "updatedAt"
>;

export class AnimalModel
	extends Model<Animal.Attributes, AnimalCreationAttributes>
	implements Animal.Attributes
{
	public id!: string;
	public shelterId!: string;
	public adoptionStatus!: Animal.AdoptionStatus;
	public species!: Animal.Species;
	public name!: string;
	public description!: string;
	public healthIssues!: string;
	public gender!: "F" | "M";
	public dateOfBirth!: Date | null;
	public sizeCm!: number | null;
	public breed!: string | null;
	public color!: string;
	public weightKg!: number | null;
	public furLength!: string | null;
	public vaccinated!: boolean | null;
	public dewormed!: boolean | null;
	public sterilised!: boolean | null;
	public toiletTrained!: boolean | null;
	public adoptionFee!: number | null;
	public intakeDate!: Date;
	public visible!: boolean;
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
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		healthIssues: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
		},
		sizeCm: {
			type: DataTypes.INTEGER,
		},
		breed: {
			type: DataTypes.STRING,
		},
		color: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weightKg: {
			type: DataTypes.DECIMAL,
			get: numericStringtoFloat("weightKg"),
		},
		furLength: {
			type: DataTypes.STRING,
		},
		vaccinated: {
			type: DataTypes.BOOLEAN,
		},
		dewormed: {
			type: DataTypes.BOOLEAN,
		},
		sterilised: {
			type: DataTypes.BOOLEAN,
		},
		toiletTrained: {
			type: DataTypes.BOOLEAN,
		},
		adoptionFee: {
			type: DataTypes.DECIMAL,
			get: numericStringtoFloat("adoptionFee"),
		},
		intakeDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		visible: {
			type: DataTypes.BOOLEAN,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	},
	{
		tableName: "animal",
		sequelize, // passing the `sequelize` instance is required
	},
);

AnimalModel.hasMany(AnimalImageModel, {
	sourceKey: "id",
	foreignKey: "animalId",
	as: "animalImages",
});
