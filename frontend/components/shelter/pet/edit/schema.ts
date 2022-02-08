import { Animal } from "@contract";
import {
	array,
	boolean,
	date,
	mixed,
	number,
	object,
	SchemaOf,
	string,
	StringSchema,
} from "yup";

const imageSchema: SchemaOf<Animal.Image> = object().shape({
	thumbnailUrl: string().url().required(),
	photoUrl: string().url().required(),
});

export const schema: SchemaOf<Animal.Attributes> = object().shape({
	id: string().required(),
	createdAt: date().required(),
	updatedAt: date().required(),
	shelterId: string().required(),
	adoptionStatus: mixed<Animal.AdoptionStatus>()
		.oneOf(Object.values(Animal.AdoptionStatus))
		.required(),
	species: mixed<Animal.Species>()
		.oneOf(Object.values(Animal.Species))
		.required(),
	name: string().required(),
	description: string() as StringSchema<string>, //TODO: revert to string().required() after testing and if added to form
	healthIssues: string().required(),
	gender: mixed<"M" | "F">().oneOf(["M", "F"]).required(),
	dateOfBirth: date().required(),
	sizeCm: number().nullable().defined(), //TODO: set validation if added to form
	breed: string().nullable().defined(),
	color: string().required(),
	weightKg: number().nullable().defined(), //TODO: set validation if added to form
	furLength: string().nullable().defined(),
	vaccinated: boolean().nullable().defined(), //TODO: set validation if added to form
	dewormed: boolean().nullable().defined(), //TODO: set validation if added to form
	sterilised: boolean().nullable().defined(),
	toiletTrained: boolean().required(),
	adoptionFee: number().nullable().defined(), //TODO: set validation if added to form
	intakeDate: date().required(),
	visible: boolean().required(),
	animalImages: array().of(imageSchema.required()).required().min(1),
});
