import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE user_animal
    (
        id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_profile_id UUID NOT NULL REFERENCES user_profile (id),
        animal_id       UUID NOT NULL REFERENCES animal (id),
        created_at      TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at      TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("user_animal");
	},
};
