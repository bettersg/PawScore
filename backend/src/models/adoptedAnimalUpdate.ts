import { Model, DataTypes } from "sequelize";
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
	extends Model<AdoptedAnimalUpdateAttributes>
	implements AdoptedAnimalUpdateAttributes
{
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
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		userAnimalId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dueDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		userUpdate: {
			type: DataTypes.STRING
		},
		publishedDate: {
			type: DataTypes.DATE
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
		tableName: "adopted_animal_update",
		sequelize
	}
);
