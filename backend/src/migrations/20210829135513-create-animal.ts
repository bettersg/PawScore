import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.query(`
    CREATE TABLE animal
    (
        id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        shelter_id      UUID REFERENCES shelter (id),
        adoption_status VARCHAR REFERENCES adoption_status (status),
        species         VARCHAR REFERENCES species (name),
        name            VARCHAR NOT NULL,
        description     VARCHAR NOT NULL DEFAULT '',
        health_issues   VARCHAR NOT NULL DEFAULT '',
        gender          CHAR(1) NOT NULL
            CONSTRAINT gender_vals CHECK (gender IN ('F', 'M')),
        age_months      INTEGER,
        size_cm         INTEGER,
        breed           VARCHAR,
        color           VARCHAR NOT NULL,
        weight_kg       NUMERIC,
        fur_length      VARCHAR,
        vaccinated      BOOLEAN,
        dewormed        BOOLEAN,
        sterilized      BOOLEAN,
        adoption_fee    NUMERIC,
        intake_date     DATE    NOT NULL,
    
        created_at      TIMESTAMP        DEFAULT current_timestamp,
        updated_at      TIMESTAMP        DEFAULT current_timestamp
    );
    `);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable('animal');
  }
};
