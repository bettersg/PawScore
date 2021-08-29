import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE auth_group_permission
    (
        PRIMARY KEY (auth_group_id, auth_permission_id),
        auth_group_id      UUID REFERENCES auth_group (id),
        auth_permission_id UUID REFERENCES auth_permission (id),
        created_at         TIMESTAMP DEFAULT current_timestamp,
        updated_at         TIMESTAMP DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('auth_group_permission');
  }
};
