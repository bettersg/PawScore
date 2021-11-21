import { EditOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, RadioChangeEvent } from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { FurLength, PetData, Sex, Species, Status, Sterilised } from "common/enums";
import {
	FormSection,
	ImageSection
} from "components/shelter/pet/add/FormComponents";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import moment from "moment";
import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

export default function AddNewPet() {
	const [pet, setPet] = useState<PetData>({
		key: "",
		name: "",
		images: [],
		visible: true,
		sex: Sex.MALE,
		species: Species.CAT,
		status: Status.HEALTHY,
		acquired: new Date(),
		breed: "",
		furLength: FurLength.SHORT,
		medicalIssues: [],
		sterilised: Sterilised.YES,
		dateOfBirth: new Date(),
		furColor: [],
		toiletTrained: true
	});

	const onValueChange = (e: ChangeEvent<HTMLInputElement>, key: keyof Pick<
		PetData,
		"name"
	>) => {
		setPet((prev) => ({ ...prev, [key]: e.target.value }));
	}

	const onRadioChange = (
		e: RadioChangeEvent,
		key: keyof Pick<
			PetData,
			"visible" | "toiletTrained" | "sex" | "sterilised" | "status"
		>,
		isYesNo?: boolean
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
			PetData,
			"species" | "furLength" | "breed" | "medicalIssues" | "furColor"
		>
	) => {
		if (!value) return;
		setPet((prev) => ({ ...prev, [key]: value }));
	};

	const onDateChange = (
		date: moment.Moment,
		key: keyof Pick<PetData, "acquired" | "dateOfBirth">
	) => {
		if (!date) return;
		setPet((prev) => ({ ...prev, [key]: date.toDate() }));
	};

	const updateGallery = useCallback((images: string[]) => {
		setPet((prev) => ({ ...prev, images }));
	}, []);

	return (
		<ShelterLayout>
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
							<Button type="primary" icon={<EditOutlined />}>
								Save
							</Button>
						</div>
					</PetDetailHeader>
					<ImageSection
						images={pet.images}
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
