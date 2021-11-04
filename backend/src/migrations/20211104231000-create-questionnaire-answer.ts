import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`	
	CREATE TABLE IF NOT EXISTS questionnaire_answer
	(
		id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		user_profile_id  uuid REFERENCES user_profile (id),
		questionnaire_id uuid REFERENCES questionnaire (id),
		answer           jsonb,
		created_at       TIMESTAMP DEFAULT current_timestamp,
		updated_at       TIMESTAMP DEFAULT current_timestamp
	);
	`);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("questionnaire_answer");
	}
};
