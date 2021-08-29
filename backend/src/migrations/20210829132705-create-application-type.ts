import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE application_type
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        type       VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);

    await queryInterface.bulkInsert("application_type", [
      { type: "Adoption" },
      { type: "Foster" }
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('application_type');
  }
};
