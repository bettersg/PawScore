import { QueryInterface } from "sequelize";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.query(`
    CREATE TABLE user_animal_application
    (
        id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_profile_id     UUID REFERENCES user_profile (id),
        animal_id           UUID REFERENCES animal (id),
        application_type    VARCHAR REFERENCES application_type (type),      -- adoption or fostering
        application_status  varchar REFERENCES application_status (status), -- pending, etc
        reason_for_adoption VARCHAR,
        rejection_reason    VARCHAR,
        adoption_fee        NUMERIC NOT NULL,
        created_at          TIMESTAMP NOT NULL DEFAULT current_timestamp,
        updated_at          TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
    `);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.dropTable("user_animal_application");
	},
};
