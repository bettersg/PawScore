import { EditOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Breadcrumb, Button } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import {
	FormSection,
	ImageSection,
} from "components/shelter/pet/add/FormComponents";
import {
	TOnDateChange,
	TOnRadioChange,
	TOnSelectChange,
	TOnValueChange,
} from "components/shelter/pet/add/handlerTypes";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import moment from "moment";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

const newAnimalObject = (shelterId = ""): Animal.Attributes => ({
	id: "",
	shelterId,
	adoptionStatus: Animal.AdoptionStatus.Healthy,
	species: Animal.Species.Others,
	name: "",
	description: "",
	healthIssues: "",
	gender: "F",
	dateOfBirth: null,
	sizeCm: null,
	breed: null,
	color: "",
	weightKg: null,
	furLength: null,
	vaccinated: false,
	dewormed: false,
	sterilised: false,
	toiletTrained: false,
	adoptionFee: null,
	intakeDate: new Date(),
	visible: false,
});

/* TODO: type shelterId and decide where it's coming from - should not be empty*/
export default function AddNewPet({ shelterId = "" }) {
	const [pet, setPet] = useState<Animal.Attributes>(
		newAnimalObject(shelterId),
	);

	const onValueChange: TOnValueChange = (e, key) => {
		setPet((prev) => ({ ...prev, [key]: e.target.value }));
	};

	const onRadioChange: TOnRadioChange = (e, key, isYesNo?: boolean) => {
		if (!e.target.value) return;
		const val = isYesNo
			? e.target.value === "yes"
				? true
				: false
			: e.target.value;
		setPet((prev) => ({ ...prev, [key]: val }));
	};

	const onSelectChange: TOnSelectChange = (value, key) => {
		if (!value) return;
		setPet((prev) => ({ ...prev, [key]: value }));
	};

	const onDateChange: TOnDateChange = (date, key) => {
		if (!date) return;
		setPet((prev) => ({ ...prev, [key]: date.toDate() }));
	};

	const updateGallery = (animalImages: Animal.Image[]) => {
		setPet((prev) => ({ ...prev, animalImages }));
	};

	const isFormValidated = useMemo(() => {
		const dateKeys: (keyof Pick<
			Animal.Attributes,
			"dateOfBirth" | "intakeDate"
		>)[] = ["dateOfBirth", "intakeDate"];

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
			"name" | "animalImages" | "breed" | "healthIssues" | "color"
		>)[] = ["name", "animalImages", "breed", "healthIssues", "color"];

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
					key: "gender",
					type: Sex,
				},
				{
					key: "species",
					type: Species,
				},
				{
					key: "adoptionStatus",
					type: Animal.AdoptionStatus,
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
					<PetDetailHeader>
						<Title level={5}>Pet Details</Title>
						<div>
							<Button style={{ marginRight: 8 }}>Cancel</Button>
							<Button
								type="primary"
								icon={<EditOutlined />}
								disabled={!isFormValidated}
							>
								Save
							</Button>
						</div>
					</PetDetailHeader>
					<ImageSection
						images={pet.animalImages}
						onChange={updateGallery}
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
