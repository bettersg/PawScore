import Sequelize from "sequelize";
import { User } from "./user";
import { sequelize } from "../database";

// These are all the attributes for the model
interface UserProfileAttributes {
	id: string;
	userId: string;
	phoneNo: string | null;
	nric: string | null;
	firstName: string;
	lastName: string;
	dob: string;
	gender: string;
	occupation: string | null;
	address: string;
	postalCode: string;
}

// eslint-disable-next-line
interface UserProfileCreationAttributes
	extends Sequelize.Optional<UserProfileAttributes, "id"> { }

class UserProfile
	extends Sequelize.Model<UserProfileAttributes, UserProfileCreationAttributes>
	implements UserProfileAttributes {
	public id!: string;
	public userId!: string;
	public email!: string;
	public phoneNo!: string | null;
	public nric!: string | null;
	public firstName!: string;
	public lastName!: string;
	public dob!: string;
	public gender!: string;
	public occupation!: string | null;
	public address!: string;
	public postalCode!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public readonly user!: User;
	public static associations: {
		user: Sequelize.Association<User, UserProfile>;
	};
}

UserProfile.init(
	{
		id: {
			type: Sequelize.DataTypes.UUID,
			defaultValue: Sequelize.DataTypes.UUIDV4,
			primaryKey: true,
		},
		userId: {
			type: Sequelize.DataTypes.UUID,
			allowNull: false,
		},
		phoneNo: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
		nric: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
		firstName: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		dob: {
			type: Sequelize.DataTypes.DATE,
			allowNull: false,
		},
		gender: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		occupation: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
		postalCode: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "user_profile",
		sequelize, // passing the `sequelize` instance is required
	},
);

export { UserProfile, UserProfileCreationAttributes, UserProfileAttributes };
