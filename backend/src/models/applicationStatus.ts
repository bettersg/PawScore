import Sequelize from "sequelize";
import { sequelize } from "../database";
import { toEnumValues } from "../utils/enumUtil";

export enum ApplicationStatus {
	Pending = "Pending",
	Rejected = "Rejected",
	Withdrew = "Withdrew",
	Shortlisted = "Shortlisted",
	Scheduled = "Scheduled",
	Completed = "Completed"
}

export interface ApplicationStatusAttributes {
	id: string;
	status: ApplicationStatus;
	createdAt: Date;
	updatedAt: Date;
}

export class ApplicationStatusModel
	extends Sequelize.Model<ApplicationStatusAttributes>
	implements ApplicationStatusAttributes {
	public id!: string;
	public status!: ApplicationStatus;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

ApplicationStatusModel.init(
	{
		id: {
			type: Sequelize.DataTypes.UUIDV4,
			primaryKey: true
		},
		status: {
			type: Sequelize.DataTypes.ENUM(...toEnumValues(ApplicationStatus)),
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
		tableName: "application_status",
		sequelize
	}
);
