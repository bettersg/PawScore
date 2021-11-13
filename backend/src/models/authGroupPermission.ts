import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface AuthGroupPermissionAttributes {
	id: string;
	authGroupId: string;
	authPermissionId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthUserPermissionModel
	extends Model<AuthGroupPermissionAttributes>
	implements AuthGroupPermissionAttributes
{
	public id!: string;
	public authGroupId!: string;
	public authPermissionId!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AuthUserPermissionModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		authGroupId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		authPermissionId: {
			type: DataTypes.STRING,
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
		tableName: "auth_group_permission",
		sequelize
	}
);
