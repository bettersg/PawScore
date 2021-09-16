'use strict';
import { Sequelize, Model, Optional, DataTypes, UUIDV4 } from "sequelize";

// Initializing sequelize
import allConfig from "../config/config";
// eslint-disable-next-line 
const config: any = allConfig.databaseConfig;
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// These are all the attributes for the model
interface UploadAttributes {
  id: string;
  userId: string;
  originalFilename: string;
  filename: string;
}

// Some attributes are optional in model.build() or model.create()
type UploadCreationAttributes = Optional<UploadAttributes, "id">

class Upload extends Model<UploadAttributes, UploadCreationAttributes>
  implements UploadAttributes {
  public id!: string;
  public userId!: string;
  public originalFilename!: string;
  public filename!: string;

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

Upload.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    originalFilename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "upload",
    sequelize, // passing the `sequelize` instance is required
  }
);

export { Upload, UploadCreationAttributes, UploadAttributes };

