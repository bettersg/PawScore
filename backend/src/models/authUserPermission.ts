import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface AuthUserPermissionAttributes {
	id: string;
	authUserId: string;
	authPermissionId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthUserPermissionModel
	extends Model<AuthUserPermissionAttributes>
	implements AuthUserPermissionAttributes
{
	public id!: string;
	public authUserId!: string;
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
		authUserId: {
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
		tableName: "auth_user_permission",
		sequelize
	}
);
