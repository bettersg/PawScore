import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE auth_user_group_permission
    (
        id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        auth_user_id  UUID REFERENCES auth_user (id),
        auth_group_id UUID REFERENCES auth_group (id),
        created_at    TIMESTAMP        DEFAULT current_timestamp,
        updated_at    TIMESTAMP        DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('auth_user_group_permission');
  }
};
