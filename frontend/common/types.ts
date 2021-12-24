import { Animal } from "@contract";

export type NewAnimal = Omit<Animal.Attributes, "id">;
