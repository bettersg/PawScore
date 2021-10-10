import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface AuthUserGroupPermissionAttributes {
	id: string;
	authUserId: string;
	authGroupId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthUserGroupPermissionModel
	extends Model<AuthUserGroupPermissionAttributes>
	implements AuthUserGroupPermissionAttributes
{
	public id!: string;
	public authUserId!: string;
	public authGroupId!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AuthUserGroupPermissionModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		authUserId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		authGroupId: {
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
		tableName: "auth_user_group_permission",
		sequelize
	}
);
