import {
    DataTypes, Model, Optional, UUIDV4
} from "sequelize";
import { sequelize } from "../database";
import { numericStringtoFloat } from "../utils/modelType";

export enum ApplicationType {
    Adoption = "Adoption",
    Foster = "Foster"
}

export enum ApplicationStatus {
    Pending = "Pending",
    Rejected = "Rejected",
    Withdrew = "Withdrew",
    Shortlisted = "Shortlisted",
    Scheduled = "Scheduled",
    Completed = "Completed"
}

export interface UserAnimalApplicationAttributes {
    id: string;
    userProfileId: string;
    animalId: string;
    applicationType: ApplicationType;
    applicationStatus: ApplicationStatus;
    reasonForAdoption: string | null;
    rejectionReason: string | null;
    adoptionFee: number;
}

export type UserAnimalApplicationCreationAttributes = Optional<UserAnimalApplicationAttributes, "id">

export class UserAnimalApplicationModel extends Model<UserAnimalApplicationAttributes, UserAnimalApplicationCreationAttributes> implements UserAnimalApplicationAttributes {
    public id!: string;
    public userProfileId!: string;
    public animalId!: string;
    public applicationType!: ApplicationType;
    public applicationStatus!: ApplicationStatus;
    public reasonForAdoption!: string | null;
    public rejectionReason!: string | null;
    public adoptionFee!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;    
}

UserAnimalApplicationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userProfileId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        animalId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        applicationType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        applicationStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reasonForAdoption: {
            type: DataTypes.STRING,
        },
        rejectionReason: {
            type: DataTypes.STRING,
        },
        adoptionFee: {
            type: DataTypes.DECIMAL,
            get: numericStringtoFloat("adoptionFee"),
            allowNull: false,
        },
    },
    {
        tableName: "user_animal_application",
        sequelize, // passing the `sequelize` instance is required
    }
);
