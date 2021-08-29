import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE auth_group
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name       VARCHAR NOT NULL,
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);

    await queryInterface.bulkInsert("auth_group", [
      { name: "admin_user" },
      { name: "normal_user" },
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('auth_group');
  }
};
