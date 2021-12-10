import Sequelize from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export enum ApplicationType {
	Adoption = "Adoption",
	Foster = "Foster"
}

export interface ApplicationTypeAttributes {
	id: string;
	type: ApplicationType;
	createdAt: Date;
	updatedAt: Date;
}

export class ApplicationTypeModel
	extends Sequelize.Model<ApplicationTypeAttributes>
	implements ApplicationTypeAttributes {
	public id!: string;
	public type!: ApplicationType;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ApplicationTypeModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true
		},
		type: {
			type: Sequelize.DataTypes.ENUM(...toEnumValues(ApplicationType)),
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
		tableName: "application_type",
		sequelize
	}
);
