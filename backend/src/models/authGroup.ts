import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export enum AuthGroupName {
	admin_user = "admin_user",
	normal_user = "normal_user"
}

export interface AuthGroupAttributes {
	id: string;
	type: AuthGroupName;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthGroupModel
	extends Model<AuthGroupAttributes>
	implements AuthGroupAttributes
{
	public id!: string;
	public type!: AuthGroupName;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AuthGroupModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		type: {
			type: DataTypes.ENUM(...toEnumValues(AuthGroupName)),
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
		tableName: "auth_group",
		sequelize
	}
);
