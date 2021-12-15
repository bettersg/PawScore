import { QueryInterface } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete("upload", {});
    await queryInterface.bulkDelete("user_animal_application", {});
    await queryInterface.bulkDelete("animal_image", {});
    await queryInterface.bulkDelete("animal", {});
    await queryInterface.bulkDelete("user_profile", {});
    await queryInterface.bulkDelete("user", {});
    await queryInterface.bulkDelete("shelter", {});
  },
  down: async (): Promise<void> => {
    // do nothing
  }
};
