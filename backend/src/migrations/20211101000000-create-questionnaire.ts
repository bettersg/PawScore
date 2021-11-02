import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
	CREATE TABLE IF NOT EXISTS questionnaire
	(
		id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		description VARCHAR NOT NULL,
		questions   JSONB   NOT NULL,
		created_at  TIMESTAMP        DEFAULT current_timestamp,
		updated_at  TIMESTAMP        DEFAULT current_timestamp
	);
	`);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("questionnaire");
	}
};
