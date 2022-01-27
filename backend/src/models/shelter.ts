import { Shelter } from "@contract";
import { Model, DataTypes, Optional, UUIDV4 } from "sequelize";
import { sequelize } from "../database";

export type ShelterDbAttributes = Shelter.Attributes;

export type ShelterDbCreationAttributes = Optional<
	ShelterDbAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class ShelterModel
	extends Model<ShelterDbAttributes, ShelterDbCreationAttributes>
	implements ShelterDbAttributes
{
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
			type: DataTypes.UUIDV4,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		country: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		contact: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		registrationNo: {
			type: DataTypes.STRING,
			allowNull: true,
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
		tableName: "shelter",
		sequelize, // passing the `sequelize` instance is required
	},
);
