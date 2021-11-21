import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE adopted_animal_update
    (
        id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_animal_id UUID REFERENCES user_animal (id),
        title          VARCHAR NOT NULL,
        due_date       DATE    NOT NULL,
        user_update    VARCHAR,
        published_date DATE,
        created_at     TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at     TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("adopted_animal_update");
	},
};
