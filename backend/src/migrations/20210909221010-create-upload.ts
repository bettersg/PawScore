import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE upload
    (
        id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id                 UUID NOT NULL, -- User that uploaded file
        original_filename       VARCHAR NOT NULL,
        filename                VARCHAR NOT NULL,
        created_at              TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at              TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("upload");
	},
};
