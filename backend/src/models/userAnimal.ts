import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database";

export interface UserAnimalAttributes {
	id: string;
	userProfileId: string;
	animalId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class UserAnimalModel
	extends Model<UserAnimalAttributes>
	implements UserAnimalAttributes
{
	public id!: string;
	public userProfileId!: string;
	public animalId!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserAnimalModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		userProfileId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		animalId: {
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
		tableName: "user_animal",
		sequelize
	}
);
