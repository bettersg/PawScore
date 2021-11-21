import { QueryInterface, DataTypes } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.createTable("user_sessions", {
			sid: {
				allowNull: false,
				primaryKey: true,
				type: DataTypes.STRING,
			},
			sess: {
				type: DataTypes.JSON,
			},
			expire: {
				type: DataTypes.DATE,
			},
		});
		await queryInterface.addIndex("user_sessions", ["expire"]);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("user_sessions");
	},
};
