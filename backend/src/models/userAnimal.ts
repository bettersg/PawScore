import Sequelize from "sequelize";
import { sequelize } from "../database";

export interface UserAnimalAttributes {
	id: string;
	userProfileId: string;
	animalId: string;
	createdAt: Date;
	updatedAt: Date;
}

export class UserAnimalModel
	extends Sequelize.Model<UserAnimalAttributes>
	implements UserAnimalAttributes {
	public id!: string;
	public userProfileId!: string;
	public animalId!: string;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

UserAnimalModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true
		},
		userProfileId: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		animalId: {
			type: Sequelize.DataTypes.STRING,
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
		tableName: "user_animal",
		sequelize
	}
);
