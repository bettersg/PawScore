import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE auth_permission
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name       VARCHAR NOT NULL, -- permissions name
        code_name  VARCHAR NOT NULL, -- permission code
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);

    await queryInterface.bulkInsert("auth_permission", [
      { name: "CREATE_USER", code_name: 200 },
      { name: "READ_USER", code_name: 200 },
      { name: "UPDATE_USER", code_name: 200 },
      { name: "DELETE_USER", code_name: 200 },
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('auth_permission');
  }
};
