import Sequelize from "sequelize";
import { sequelize } from "../database";

// These are all the attributes for the model
interface BookingAttributes {
	id: string;
	shelterId: string;
	userId: string;
	startDate: Date | null;
	endDate: Date | null;
}

// Some attributes are optional in model.build() or model.create()
type BookingCreationAttributes = Sequelize.Optional<BookingAttributes, "id">;

class Booking
	extends Sequelize.Model<BookingAttributes, BookingCreationAttributes>
	implements BookingAttributes {
	public id!: string;
	public shelterId!: string;
	public userId!: string;
	public startDate!: Date | null;
	public endDate!: Date | null;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	/*  The below are examples from https://sequelize.org/master/manual/typescript.html
   *  They will be used for associations
   *
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>;
  public hasProject!: HasManyHasAssociationMixin<Project, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Project>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
	projects: Association<User, Project>;
  };
  *
  *
  */
}

Booking.init(
	{
		id: {
			type: Sequelize.DataTypes.UUID,
			defaultValue: Sequelize.DataTypes.UUIDV4,
			primaryKey: true,
		},
		shelterId: {
			type: Sequelize.DataTypes.INTEGER,
			allowNull: false,
		},
		userId: {
			type: Sequelize.DataTypes.UUID,
			allowNull: false,
		},
		startDate: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true,
		},
		endDate: {
			type: Sequelize.DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "booking",
		sequelize, // passing the `sequelize` instance is required
	},
);

export { Booking, BookingCreationAttributes, BookingAttributes };
