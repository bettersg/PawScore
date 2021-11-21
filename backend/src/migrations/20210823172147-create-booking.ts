import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE "booking"
    (
        id         UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        shelter_id UUID,
        user_id    UUID,
        start_date TIMESTAMP,
        end_date   TIMESTAMP,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("booking");
	},
};
