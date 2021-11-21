import { QueryInterface } from "sequelize";

export default {
	// Current roles: 'SHELTER_ADMIN', 'SHELTER_SUPER_ADMIN', 'ADOPTER');
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE "user"
    (
        id         UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),
        username   VARCHAR NOT NULL,
        email      VARCHAR UNIQUE NOT NULL,
        password   VARCHAR NOT NULL,
        roles      JSONB NOT NULL,
        shelter_id UUID,
        created_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("user");
	},
};
