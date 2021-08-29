import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE animal_image
    (
        animal_id     UUID REFERENCES animal (id) ON DELETE CASCADE,
        photo_url     VARCHAR,
        thumbnail_url VARCHAR,
        created_at    TIMESTAMP DEFAULT current_timestamp,
        updated_at    TIMESTAMP DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('animal_image');
  }
};
