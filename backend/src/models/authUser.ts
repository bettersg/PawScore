import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";

export interface AuthUserAttributes {
	id: string;
	username: string;
	email: string;
	password: string;
	isStaff: boolean;
	isActive: boolean;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export class AuthUserModel
	extends Model<AuthUserAttributes>
	implements AuthUserAttributes
{
	public id!: string;
	public username!: string;
	public email!: string;
	public password!: string;
	public isStaff!: boolean;
	public isActive!: boolean;
	public isAdmin!: boolean;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AuthUserModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		isStaff: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		isAdmin: {
			type: DataTypes.BOOLEAN,
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
