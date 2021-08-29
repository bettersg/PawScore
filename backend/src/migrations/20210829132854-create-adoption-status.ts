import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE adoption_status
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        status     VARCHAR UNIQUE NOT NULL,
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);

    await queryInterface.bulkInsert("adoption_status", [
      { status: "Ongoing" },
      { status: "Adopted" },
      { status: "Archived" }
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('adoption_status');
  }
};
