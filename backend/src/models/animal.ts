import { Animal } from "@contract";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import { dateOnlyStringToDate, numericStringToFloat } from "../utils/modelType";
import { AnimalImageModel } from "./animalImage";

interface AnimalAttributesDbModel extends Animal.Attributes {
	createdAt: Date;
	updatedAt: Date;
}

// Some attributes are optional in `Animal.build` and `Animal.create` calls
export type AnimalCreationAttributes = Sequelize.Optional<
	AnimalAttributesDbModel,
	"id" | "createdAt" | "updatedAt"
>;

export class AnimalModel
	extends Sequelize.Model<AnimalAttributesDbModel, AnimalCreationAttributes>
	implements AnimalAttributesDbModel {
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
		animalImages: Sequelize.Association<AnimalModel, AnimalImageModel>;
	};
}

AnimalModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUID,
			defaultValue: Sequelize.DataTypes.UUIDV4,
			primaryKey: true,
		},
		shelterId: {
			type: Sequelize.DataTypes.UUIDV4,
			allowNull: false,
		},
		adoptionStatus: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		species: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		healthIssues: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		dateOfBirth: {
			type: Sequelize.DataTypes.DATEONLY,
			get: dateOnlyStringToDate("intakeDate"),
		},
		sizeCm: {
			type: Sequelize.DataTypes.INTEGER,
		},
		breed: {
			type: Sequelize.DataTypes.STRING,
		},
		color: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		weightKg: {
			type: Sequelize.DataTypes.DECIMAL,
			get: numericStringToFloat("weightKg"),
		},
		furLength: {
			type: Sequelize.DataTypes.STRING,
		},
		vaccinated: {
			type: Sequelize.DataTypes.BOOLEAN,
		},
		dewormed: {
			type: Sequelize.DataTypes.BOOLEAN,
		},
		sterilised: {
			type: Sequelize.DataTypes.BOOLEAN,
		},
		toiletTrained: {
			type: Sequelize.DataTypes.BOOLEAN,
		},
		adoptionFee: {
			type: Sequelize.DataTypes.DECIMAL,
			get: numericStringToFloat("adoptionFee"),
		},
		intakeDate: {
			type: Sequelize.DataTypes.DATEONLY,
			allowNull: false,
			get: dateOnlyStringToDate("intakeDate"),
		},
		visible: {
			type: Sequelize.DataTypes.BOOLEAN,
		},
		createdAt: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: Sequelize.DataTypes.DATE,
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
