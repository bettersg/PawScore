import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE adoption_status
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        status     VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);

		await queryInterface.bulkInsert("adoption_status", [
			{ status: "Fostered" },
			{ status: "Adopted" },
			{ status: "Sick" },
			{ status: "Healthy" },
		]);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("adoption_status");
	},
};
