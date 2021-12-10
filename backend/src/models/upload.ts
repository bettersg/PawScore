import Sequelize from "sequelize";
import { sequelize } from "../database";

// These are all the attributes for the model
interface UploadAttributes {
  id: string;
  userId: string;
  originalFilename: string;
  filename: string;
}

// Some attributes are optional in model.build() or model.create()
type UploadCreationAttributes = Sequelize.Optional<UploadAttributes, "id">

class Upload extends Sequelize.Model<UploadAttributes, UploadCreationAttributes>
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
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.DataTypes.UUID,
      allowNull: false,
    },
    originalFilename: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    filename: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "upload",
    sequelize, // passing the `sequelize` instance is required
  }
);

export { Upload, UploadCreationAttributes, UploadAttributes };

