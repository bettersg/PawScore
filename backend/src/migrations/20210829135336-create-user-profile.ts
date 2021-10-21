import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE user_profile
    (
        id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id      UUID REFERENCES "user" (id),
        email        VARCHAR NOT NULL UNIQUE,
        phone_no     VARCHAR NOT NULL,
        nric         VARCHAR UNIQUE, -- Putting it as optional first
        first_name   VARCHAR NOT NULL,
        last_name    VARCHAR NOT NULL,
        dob          DATE    NOT NULL,
        gender       CHAR(1) NOT NULL
            CONSTRAINT gender_vals CHECK (gender IN ('F', 'M')),
        occupation   VARCHAR,
        address      VARCHAR NOT NULL,
        postal_code  VARCHAR NOT NULL,
        created_at   TIMESTAMP        DEFAULT current_timestamp,
        updated_at   TIMESTAMP        DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('user_profile');
  }
};
