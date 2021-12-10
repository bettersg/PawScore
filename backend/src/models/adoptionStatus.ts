import { Animal } from "@contract";
import Sequelize from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export interface AdoptionStatusAttributes {
	id: string;
	status: Animal.AdoptionStatus;
	createdAt: Date;
	updatedAt: Date;
}

export class AdoptionStatusModel
	extends Sequelize.Model<AdoptionStatusAttributes>
	implements AdoptionStatusAttributes {
	public id!: string;
	public status!: Animal.AdoptionStatus;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AdoptionStatusModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true,
		},
		status: {
			type: Sequelize.DataTypes.ENUM(...toEnumValues(Animal.AdoptionStatus)),
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
		tableName: "adoption_status",
		sequelize, // passing the `sequelize` instance is required
	},
);
