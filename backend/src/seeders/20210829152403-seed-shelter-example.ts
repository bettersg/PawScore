import { QueryInterface } from "sequelize";

const SHELTER_ID = "e9c4fb2c-e5bb-4d14-be23-6c264130be88";
const ANIMAL_ID_CAT_1 = "377fee7f-37cb-4aaf-a805-b41eaa6bf590";
const ANIMAL_ID_DOG_1 = "de810095-533e-4be9-80eb-a85baeac835d";
const SHELTER_ADMIN_ID = "f3b4b2e7-fcf0-4317-9dc3-c5647d4ddca4";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkInsert("shelter", [
      {
        id: SHELTER_ID,
        name: "SPCA",
        address: "50 Sungei Tengah Rd, Singapore 699012",
        country: "Singapore",
        contact: "6287 5355"
      }
    ]);

    await queryInterface.bulkInsert("user", [
      {
        id: SHELTER_ADMIN_ID,
        username: "spca_admin",
        email: "spca_admin@example.com",
        password: "$2b$08$kSj3WRXt8nJxoblS.syg.eWTej/DKHqEtyKMYPwnnutVlMDKn7BeW", // password
        roles: JSON.stringify(["SHELTER_ADMIN"]),
        shelter_id: SHELTER_ID
      }
    ]);

    await queryInterface.bulkInsert("animal", [
      {
        id: ANIMAL_ID_CAT_1,
        shelter_id: SHELTER_ID,
        adoption_status: "Healthy",
        adoption_fee: 50,
        species: "Cat",
        name: "Tom",
        description: "Tom is a friendly cat with a little fiesty temper",
        health_issues: "A little fat",
        gender: "M",
        date_of_birth: "2021-01-01",
        size_cm: 35,
        breed: "Local",
        color: "Black",
        weight_kg: 2.5,
        fur_length: "long hair",
        vaccinated: false,
        dewormed: false,
        sterilised: false,
        toilet_trained: true,
        intake_date: "2021-08-27",
        visible: true
      },
      {
        id: ANIMAL_ID_DOG_1,
        shelter_id: SHELTER_ID,
        adoption_status: "Healthy",
        adoption_fee: 50,
        species: "Dog",
        name: "Toto",
        description: "",
        health_issues: "",
        gender: "F",
        date_of_birth: "2020-02-01",
        size_cm: 38,
        breed: "Local",
        color: "Brown",
        weight_kg: 5.2,
        fur_length: "long hair",
        vaccinated: false,
        dewormed: false,
        sterilised: false,
        toilet_trained: false,
        intake_date: "2021-08-29",
        visible: true
      }
    ]);

    await queryInterface.bulkInsert("animal_image", [
      {
        animal_id: ANIMAL_ID_CAT_1,
        photo_url: "https://picsum.photos/800",
        thumbnail_url: "https://picsum.photos/200"
      },
      {
        animal_id: ANIMAL_ID_DOG_1,
        photo_url: "https://images.unsplash.com/photo-1599446220101-d3e0c4b74a53?w=634",
        thumbnail_url: "https://images.unsplash.com/photo-1599446220101-d3e0c4b74a53?w=300"
      }
    ]);
  },
  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete("animal_image", { animal_id: [ANIMAL_ID_CAT_1, ANIMAL_ID_DOG_1] });
    await queryInterface.bulkDelete("animal", { id: [ANIMAL_ID_CAT_1, ANIMAL_ID_DOG_1] });
    await queryInterface.bulkDelete("user", { shelter_id: SHELTER_ID });
    await queryInterface.bulkDelete("shelter", { id: SHELTER_ID });
  }
};
