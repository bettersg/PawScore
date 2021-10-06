import {
	Association, DataTypes, Model,
	Optional, UUIDV4
} from "sequelize";
import { sequelize } from "../database";
import { User } from "./user";
import { UserAnimalApplicationModel } from "./userAnimalApplication";

// These are all the attributes for the model
interface UserProfileAttributes {
	id: string;
	userId: string;
	email: string;
	phoneNo: string;
	nric: string;
	firstName: string;
	lastName: string;
	dob: string;
	gender: string;
	occupation: string;
	address: string;
	postalCode: string;

	userAnimalApplications?: UserAnimalApplicationModel[];
}

// eslint-disable-next-line
interface UserProfileCreationAttributes
	extends Optional<UserProfileAttributes, "id"> {}

class UserProfile
	extends Model<UserProfileAttributes, UserProfileCreationAttributes>
	implements UserProfileAttributes
{
	public id!: string;
	public userId!: string;
	public email!: string;
	public phoneNo!: string;
	public nric!: string;
	public firstName!: string;
	public lastName!: string;
	public dob!: string;
	public gender!: string;
	public occupation!: string;
	public address!: string;
	public postalCode!: string;

	// timestamps!
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public readonly userAnimalApplications?: UserAnimalApplicationModel[];

	public readonly user!: User;
	public static associations: {
		user: Association<User, UserProfile>;
		userAnimalApplications: Association<User, UserAnimalApplicationModel>;
	};
}

UserProfile.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phoneNo: {
			type: DataTypes.UUID,
			allowNull: false
		},
		nric: {
			type: DataTypes.UUID,
			allowNull: false
		},
		firstName: {
			type: DataTypes.UUID,
			allowNull: false
		},
		lastName: {
			type: DataTypes.UUID,
			allowNull: false
		},
		dob: {
			type: DataTypes.STRING,
			allowNull: false
		},
		gender: {
			type: DataTypes.UUID,
			allowNull: false
		},
		occupation: {
			type: DataTypes.UUID,
			allowNull: false
		},
		address: {
			type: DataTypes.UUID,
			allowNull: false
		},
		postalCode: {
			type: DataTypes.UUID,
			allowNull: false
		}
	},
	{
		tableName: "user_profile",
		sequelize // passing the `sequelize` instance is required
	}
);

UserProfile.hasMany(UserAnimalApplicationModel, {
	sourceKey: "id",
	foreignKey: "userProfileId",
	as: "userAnimalApplications"
});

export { UserProfile, UserProfileCreationAttributes, UserProfileAttributes };
