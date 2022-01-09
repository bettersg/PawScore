import { EditOutlined } from "@ant-design/icons";
import { Animal, Shelter } from "@contract";
import { Button } from "antd";
import Title from "antd/lib/typography/Title";
import { PetApi } from "api/petApi";
import { NewAnimal } from "common/types";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import moment from "moment";
import React from "react";
import styled from "styled-components";
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
import { FormSection } from "./FormComponents";

// =============================================================================
// Schema
// =============================================================================
const initialPet: NewAnimal = {
	shelterId: "test", //TODO: revert to "" after testing
	adoptionStatus: Animal.AdoptionStatus.Healthy,
	species: Animal.Species.Cat,
	name: "",
	description: "",
	healthIssues: "",
	gender: "F",
	dateOfBirth: new Date(),
	sizeCm: null,
	breed: "",
	color: "",
	weightKg: null,
	furLength: "",
	vaccinated: null,
	dewormed: null,
	sterilised: null,
	toiletTrained: true,
	adoptionFee: null,
	intakeDate: new Date(),
	visible: true,
	animalImages: [],
};
const imageSchema: SchemaOf<Animal.Image> = object().shape({
	thumbnailUrl: string().url().required(),
	photoUrl: string().url().required(),
});

const schema: SchemaOf<NewAnimal> = object().shape({
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
	breed: string().required(),
	color: string().required(),
	weightKg: number().nullable().defined(), //TODO: set validation if added to form
	furLength: string().required(),
	vaccinated: boolean().nullable().defined(), //TODO: set validation if added to form
	dewormed: boolean().nullable().defined(), //TODO: set validation if added to form
	sterilised: boolean().nullable().defined(),
	toiletTrained: boolean().required(),
	adoptionFee: number().nullable().defined(), //TODO: set validation if added to form
	intakeDate: date().required(),
	visible: boolean().required(),
	animalImages: array().of(imageSchema.required()).required().min(1),
});

// =============================================================================
// Helpers
// =============================================================================
const dateToDateString = (date: Date | null) => {
	if (date) {
		return dayjs(date).format("YYYY-MM-DD");
	}
};

// =============================================================================
// Form
// =============================================================================
export const AddPetForm = () => {
	const handleSubmit = async (
		values: NewAnimal,
		actions: FormikHelpers<NewAnimal>,
	) => {
		const transformedValues: Shelter.addNewPetApiDomain.requestBody = {
			...values,
			dateOfBirth: dateToDateString(values.dateOfBirth),
			intakeDate: dateToDateString(values.intakeDate)!,
		};
		/*
			TODO:
			Append shelter ID from url/login context
			missing form inputs -
				adoption fee
				description
				dewormed
				sizeCm
				weightKg
		*/
		await new PetApi().addNewPet(transformedValues);
	};

	return (
		<Formik
			initialValues={initialPet}
			onSubmit={handleSubmit}
			validationSchema={schema}
			validateOnMount={true}
		>
			{(formikProps) => {
				const pet = formikProps.values;
				const updateImages = (images: Animal.Image[]) => {
					formikProps.setFieldValue(
						"animalImages" as keyof Pick<
							Animal.Attributes,
							"animalImages"
						>,
						images,
					);
				};
				const onSelectChange = (value: Animal.Species) => {
					const fieldName = "species" as keyof Pick<
						Animal.Attributes,
						"species"
					>;
					formikProps.setFieldValue(fieldName, value);
				};
				const handleDateChange = (
					fieldName: keyof Pick<
						Animal.Attributes,
						"intakeDate" | "dateOfBirth"
					>,
					value: moment.Moment | null,
				) => {
					formikProps.setFieldValue(
						fieldName,
						value ? value.toDate() : value,
					);
				};
				return (
					<>
						<PetDetailHeader>
							<Title level={5}>Pet Details</Title>
							<div>
								<Button style={{ marginRight: 8 }}>
									Cancel
								</Button>
								<Button
									type="primary"
									icon={<EditOutlined />}
									disabled={!formikProps.isValid}
									onClick={formikProps.submitForm}
								>
									Save
								</Button>
							</div>
						</PetDetailHeader>
						<FormSection.ImageSection
							images={pet.animalImages || []}
							updateImages={updateImages}
							isEditMode
						/>
						<Flex>
							<FormSection.SectionOne
								pet={pet}
								handleChange={formikProps.handleChange}
								handleSelectChange={onSelectChange}
								handleDateChange={handleDateChange}
							/>
							<FormSection.SectionTwo
								pet={pet}
								handleChange={formikProps.handleChange}
								handleDateChange={handleDateChange}
							/>
						</Flex>
					</>
				);
			}}
		</Formik>
	);
};

// =============================================================================
// Styled Components
// =============================================================================

const PetDetailHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const Flex = styled.div`
	display: flex;

	> div {
		flex: 1;
	}

	> div:last-child .label {
		width: 120px;
	}
`;
