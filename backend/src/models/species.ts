import { Animal } from "@contract";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export interface SpeciesAttributes {
	id: string;
	name: Animal.Species;
	createdAt: Date;
	updatedAt: Date;
}

export class SpeciesModel
	extends Sequelize.Model<SpeciesAttributes>
	implements SpeciesAttributes {
	public id!: string;
	public name!: Animal.Species;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

SpeciesModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: Sequelize.DataTypes.ENUM(...toEnumValues(Animal.Species)),
			allowNull: false,
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
		tableName: "species",
		sequelize, // passing the `sequelize` instance is required
	},
);
