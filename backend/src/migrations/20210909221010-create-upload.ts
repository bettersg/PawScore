import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE upload
    (
        id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id                 UUID,
        original_filename       VARCHAR,
        filename                VARCHAR,
        created_at              TIMESTAMP DEFAULT current_timestamp,
        updated_at              TIMESTAMP DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('upload');
  }
};
