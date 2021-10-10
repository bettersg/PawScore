import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export enum AuthPermissionName {
	CREATE_USER = "CREATE_USER",
	READ_USER = "READ_USER",
	UPDATE_USER = "UPDATE_USER",
	DELETE_USER = "DELETE_USER"
}

export interface AuthPermissionAttributes {
	id: string;
	name: AuthPermissionName;
	codeName: number;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthPermissionModel
	extends Model<AuthPermissionAttributes>
	implements AuthPermissionAttributes
{
	public id!: string;
	public name!: AuthPermissionName;
	public codeName!: number;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AuthPermissionModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.ENUM(...toEnumValues(AuthPermissionName)),
			allowNull: false
		},
		codeName: {
			type: DataTypes.INTEGER,
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
		tableName: "auth_permission",
		sequelize
	}
);
