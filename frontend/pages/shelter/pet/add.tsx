import { EditOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Breadcrumb, Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { FormSection } from "components/shelter/pet/add/FormComponents";
import { Formik, FormikHelpers } from "formik";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import moment from "moment";
import React from "react";
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
	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">Add Pet</Breadcrumb.Item>
				</Breadcrumb>
				<InnerContent>
					<AddPetForm />
				</InnerContent>
			</Container>
		</ShelterLayout>
	);
}

const AddPetForm = () => {
	const handleSubmit = (
		values: Animal.Attributes,
		actions: FormikHelpers<Animal.Attributes>,
	) => {
		/*
			TODO: Add submit pet here 
			Append shelter ID from url? to pet data
			missing form inputs -
				adoption fee
				description
				dewormed
				sizeCm
				weightKg
		*/
	};

	return (
		<Formik initialValues={initialPet} onSubmit={handleSubmit}>
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
									// disabled={!isFormValidated}
									// onClick={() =>
									// 	console.log(formikProps.dirty, pet)
									// }
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
