import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE application_status
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        status     VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);

		await queryInterface.bulkInsert("application_status", [
			{ status: "Pending" },
			{ status: "Rejected" },
			{ status: "Withdrew" },
			{ status: "Shortlisted" },
			{ status: "Scheduled" },
			{ status: "Completed" },
		]);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("application_status");
	},
};
