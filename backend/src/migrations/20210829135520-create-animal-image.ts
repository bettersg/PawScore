import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE animal_image
    (
        id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        animal_id     UUID NOT NULL REFERENCES animal (id) ON DELETE CASCADE,
        photo_url     VARCHAR NOT NULL,
        thumbnail_url VARCHAR NOT NULL,
        created_at    TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at    TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("animal_image");
	},
};
