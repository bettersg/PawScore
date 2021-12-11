import { Model, DataTypes } from "sequelize";
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
	extends Model<ApplicationTypeAttributes>
	implements ApplicationTypeAttributes
{
	public id!: string;
	public type!: ApplicationType;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ApplicationTypeModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		type: {
			type: DataTypes.ENUM(...toEnumValues(ApplicationType)),
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
		tableName: "application_type",
		sequelize
	}
);
