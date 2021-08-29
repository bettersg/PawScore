import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE auth_user
    (
        id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username   VARCHAR NOT NULL UNIQUE,
        email      VARCHAR NOT NULL UNIQUE,
        password   VARCHAR NOT NULL,
        is_staff   BOOLEAN NOT NULL,
        is_active  BOOLEAN NOT NULL,
        is_admin   BOOLEAN NOT NULL,
        created_at TIMESTAMP        DEFAULT current_timestamp,
        updated_at TIMESTAMP        DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('auth_user');
  }
};
