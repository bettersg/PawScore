import { EditOutlined } from "@ant-design/icons";
import { Animal, Shelter } from "@contract";
import { Alert, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { PetApi } from "api/petApi";
import { NewAnimal } from "common/types";
import dayjs from "dayjs";
import { Formik, FormikHelpers } from "formik";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { FormError } from "../styledComponents";
import { FormSection } from "./FormComponents";
import { schema } from "./schema";

// =============================================================================
// Schema
// =============================================================================
const initialPet: NewAnimal = {
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
	const router = useRouter();
	const shelterId = router.query.shelterId as string;

	const handleSubmit = async (
		values: NewAnimal,
		{ setSubmitting, setStatus }: FormikHelpers<NewAnimal>,
	) => {
		setSubmitting(true);
		setStatus({ apiError: false });
		const transformedValues: Shelter.addNewPetApiDomain.requestBody = {
			...values,
			dateOfBirth: dateToDateString(values.dateOfBirth),
			intakeDate: dateToDateString(values.intakeDate)!,
			shelterId,
		};

		try {
			await new PetApi().addNewPet(transformedValues);
			router.push(`/shelter/${shelterId}`);
		} catch (err) {
			setSubmitting(false);
			setStatus({ apiError: true });
		}
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
						{formikProps.status?.apiError && (
							<FormError
								type="error"
								message="Something went wrong."
								showIcon
								closable
							/>
						)}
						<PetDetailHeader>
							<Title level={5}>Pet Details</Title>
							<div>
								<Button style={{ marginRight: 8 }}>
									Cancel
								</Button>
								<Button
									type="primary"
									icon={<EditOutlined />}
									disabled={
										!formikProps.isValid ||
										formikProps.isSubmitting
									}
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
