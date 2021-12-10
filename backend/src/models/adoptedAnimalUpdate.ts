import Sequelize from "sequelize";
import { sequelize } from "../database";

export interface AdoptedAnimalUpdateAttributes {
	id: string;
	userAnimalId: string;
	title: string;
	dueDate: Date;
	userUpdate: string;
	publishedDate: Date;
	createdAt: Date;
	updatedAt: Date;
}

export class AdoptedAnimalUpdateModel
	extends Sequelize.Model<AdoptedAnimalUpdateAttributes>
	implements AdoptedAnimalUpdateAttributes {
	public id!: string;
	public userAnimalId!: string;
	public title!: string;
	public dueDate!: Date;
	public userUpdate!: string;
	public publishedDate!: Date;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

AdoptedAnimalUpdateModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true
		},
		userAnimalId: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false
		},
		dueDate: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false
		},
		userUpdate: {
			type: Sequelize.DataTypes.STRING
		},
		publishedDate: {
			type: Sequelize.DataTypes.DATE
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
		tableName: "adopted_animal_update",
		sequelize
	}
);
