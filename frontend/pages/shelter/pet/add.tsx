import { EditOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Breadcrumb, Button, RadioChangeEvent } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import {
	FormSection,
	ImageSection,
} from "components/shelter/pet/add/FormComponents";
import { Formik, FormikHelpers } from "formik";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import moment from "moment";
import React, { ChangeEvent, useMemo, useState } from "react";
import styled from "styled-components";

const initialPet: Animal.Attributes = {
	id: "",
	shelterId: "",
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

export default function AddNewPet() {
	const [pet, setPet] = useState<Animal.Attributes>();

	const handleSubmit = (
		values: Animal.Attributes,
		actions: FormikHelpers<Animal.Attributes>,
	) => {};

	const onValueChange = (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Pick<Animal.Attributes, "name">,
	) => {
		setPet((prev) => ({ ...prev, [key]: e.target.value }));
	};

	const onRadioChange = (
		e: RadioChangeEvent,
		key: keyof Pick<
			Animal.Attributes,
			| "visible"
			| "toiletTrained"
			| "gender"
			| "sterilised"
			| "adoptionStatus"
		>,
		isYesNo?: boolean,
	) => {
		if (!e.target.value) return;
		const val = isYesNo
			? e.target.value === "yes"
				? true
				: false
			: e.target.value;
		setPet((prev) => ({ ...prev, [key]: val }));
	};

	const onSelectChange = (
		value: string | string[],
		key: keyof Pick<
			Animal.Attributes,
			"species" | "furLength" | "breed" | "healthIssues" | "color"
		>,
	) => {
		if (!value) return;
		setPet((prev) => ({ ...prev, [key]: value }));
	};

	const onDateChange = (
		date: moment.Moment,
		key: keyof Pick<Animal.Attributes, "intakeDate" | "dateOfBirth">,
	) => {
		if (!date) return;
		setPet((prev) => ({ ...prev, [key]: date.toDate() }));
	};

	const updateGallery = (images: string[]) => {
		setPet((prev) => ({ ...prev, images }));
	};

	const isFormValidated = useMemo(() => {
		const dateKeys: (keyof Pick<
			Animal.Attributes,
			"dateOfBirth" | "acquired"
		>)[] = ["dateOfBirth", "acquired"];

		for (const key of dateKeys) {
			if (!moment(pet[key]).isValid() || pet[key].toString) {
				return false;
			}
		}

		const yesnoKeys: (keyof Pick<
			Animal.Attributes,
			"toiletTrained" | "visible"
		>)[] = ["toiletTrained", "visible"];

		for (const key of yesnoKeys) {
			if (
				typeof pet[key] !== "boolean" ||
				typeof pet[key] === "undefined"
			) {
				return false;
			}
		}

		const stringKeys: (keyof Pick<
			Animal.Attributes,
			"name" | "images" | "breed" | "medicalIssues" | "furColor"
		>)[] = ["name", "images", "breed", "medicalIssues", "furColor"];

		for (const key of stringKeys) {
			const val = (
				Array.isArray(pet[key]) ? pet[key] : [pet[key]]
			) as string[];
			if (
				val.length < 1 ||
				!val.every((p) => typeof p === "string") ||
				!val.every((p) => p.length > 0)
			) {
				return false;
			}
		}

		const enumKeys: { key: keyof Partial<Animal.Attributes>; type: any }[] =
			[
				{
					key: "sex",
					type: Sex,
				},
				{
					key: "species",
					type: Species,
				},
				{
					key: "status",
					type: Status,
				},
				{
					key: "furLength",
					type: FurLength,
				},
				{
					key: "sterilised",
					type: Sterilised,
				},
			];

		for (const enums of enumKeys) {
			if (!Object.values(enums.type).includes(pet[enums.key])) {
				return false;
			}
		}

		return true;
	}, [pet]);

	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">Add Pet</Breadcrumb.Item>
				</Breadcrumb>
				<InnerContent>
					<Formik initialValues={initialPet} onSubmit={handleSubmit}>
						{(formikProps) => {
							const pet = formikProps.values;
							const addNewImage = (newImg: Animal.Image) => {
								const currImages = pet.animalImages || [];

								formikProps.setFieldValue(
									"animalImages" as keyof Pick<
										Animal.Attributes,
										"animalImages"
									>,
									[...currImages, newImg],
								);
							};
							const removeImage = (imageIndex: number) => {
								const currImages = [...pet.animalImages!];
								currImages.splice(imageIndex, 1);

								formikProps.setFieldValue(
									"animalImages" as keyof Pick<
										Animal.Attributes,
										"animalImages"
									>,
									currImages,
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
												// disabled={!isFormValidated}
												onClick={() =>
													console.log(
														formikProps.dirty,
														pet,
													)
												}
							>
								Save
							</Button>
						</div>
					</PetDetailHeader>
					<ImageSection
										images={pet.animalImages || []}
										addNewImage={addNewImage}
										removeImage={removeImage}
						isEditMode
					/>
					<Flex>
						<FormSection.SectionOne
							pet={pet}
							onRadioChange={onRadioChange}
							onDateChange={onDateChange}
							onSelectChange={onSelectChange}
							onValueChange={onValueChange}
						/>
						<FormSection.SectionTwo
							pet={pet}
							onRadioChange={onRadioChange}
							onDateChange={onDateChange}
							onSelectChange={onSelectChange}
							onValueChange={onValueChange}
						/>
					</Flex>
								</>
							);
						}}
					</Formik>
				</InnerContent>
			</Container>
		</ShelterLayout>
	);
}

// =============================================================================
// Styled Components
// =============================================================================

const Container = styled(Content)`
	margin: 24px;
	padding: 24px;
	background-color: white;
`;

const InnerContent = styled.div`
	margin-top: 24px;
`;

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
