import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE shelter
    (
        id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name            VARCHAR NOT NULL,
        address         VARCHAR NOT NULL,
        country         VARCHAR NOT NULL,
        contact         VARCHAR NOT NULL,
        registration_no VARCHAR,
        created_at      TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at      TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("shelter");
	},
};
