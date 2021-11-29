import { QueryInterface } from "sequelize";

const SHELTER_ID = "e9c4fb2c-e5bb-4d14-be23-6c264130be88";
const ANIMAL_ID_CAT_1 = "377fee7f-37cb-4aaf-a805-b41eaa6bf590";
const ANIMAL_ID_DOG_1 = "de810095-533e-4be9-80eb-a85baeac835d";

const USER_ALICE_ID = "75e54e5b-9868-4b32-a3a9-777062073fca";
const USER_BOB_ID = "4aaca2ef-3e7d-41da-a957-ab9a16f1c2e6";

const PROFILE_ALICE_ID = "a5727491-2561-4380-8bf3-663571a28316";
const PROFILE_BOB_ID = "78217d6a-b0e4-4487-abb2-6a26b5568a5f";

const APPLICATION_ALICE_ID = "7bad2c8e-7ba8-480e-a862-a8b4bab2d657";
const APPLICATION_ALICE_ID_2 = "765e7444-122c-45bf-a45b-0f544fda6a72";
const APPLICATION_BOB_ID = "8c725e2d-387e-489e-b88b-0c64c2e993f6";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.bulkInsert("user", [
			{
				id: USER_ALICE_ID,
				username: "alice",
				email: "alice@gmail.com",
				password: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
				roles: JSON.stringify(["ADOPTER"]),
				shelter_id: SHELTER_ID
			},
			{
				id: USER_BOB_ID,
				username: "bob",
				email: "bob@gmail.com",
				password: "5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8",
				roles: JSON.stringify(["ADOPTER"]),
				shelter_id: SHELTER_ID
			}
		]);

		await queryInterface.bulkInsert("user_profile", [
			{
				id: PROFILE_ALICE_ID,
				user_id: USER_ALICE_ID,
				phone_no: "11111111",
				nric: "S1111111Z",
				first_name: "Alice",
				last_name: "InBorderland",
				dob: new Date(),
				gender: "F",
				occupation: "Student",
				address: "Singapore",
				postal_code: "111111"
			},
			{
				id: PROFILE_BOB_ID,
				user_id: USER_BOB_ID,
				phone_no: "22222222",
				nric: "S2222222Z",
				first_name: "Bob",
				last_name: "TheBuilder",
				dob: new Date(),
				gender: "M",
				occupation: "Chef",
				address: "Singapore",
				postal_code: "222222"
			}
		]);

		await queryInterface.bulkInsert(
			"user_animal_application",
			[
				{
					id: APPLICATION_ALICE_ID,
					user_profile_id: PROFILE_ALICE_ID,
					animal_id: ANIMAL_ID_CAT_1,
					application_type: "Adoption",
					application_status: "Pending",
					reason_for_adoption: "i want a cat",
					rejection_reason: null,
					adoption_fee: 50
				},
				{
					id: APPLICATION_ALICE_ID_2,
					user_profile_id: PROFILE_ALICE_ID,
					animal_id: ANIMAL_ID_DOG_1,
					application_type: "Adoption",
					application_status: "Shortlisted",
					reason_for_adoption: "i want a dog also!",
					rejection_reason: null,
					adoption_fee: 35
				},
				{
					id: APPLICATION_BOB_ID,
					user_profile_id: PROFILE_BOB_ID,
					animal_id: ANIMAL_ID_DOG_1,
					application_type: "Adoption",
					application_status: "Shortlisted",
					reason_for_adoption: "a dog companion for my pug",
					rejection_reason: null,
					adoption_fee: 42
				}
			],
			{}
		);
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.bulkDelete("user_animal_application", {
			animal_id: [
				APPLICATION_BOB_ID,
				APPLICATION_ALICE_ID_2,
				APPLICATION_ALICE_ID
			]
		});
		await queryInterface.bulkDelete("user", {
			id: [USER_BOB_ID, USER_ALICE_ID]
		});
	}
};
