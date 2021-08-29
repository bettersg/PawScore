import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE species
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name       VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);

    await queryInterface.bulkInsert("species", [
      { name: "Cat" },
      { name: "Dog" },
      { name: "Others" }
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('species');
  }
};
