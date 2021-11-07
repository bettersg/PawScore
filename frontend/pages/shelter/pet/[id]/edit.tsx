import { EditOutlined } from "@ant-design/icons";
import {
	Breadcrumb,
	Button,
	DatePicker,
	Form,
	Input,
	Radio,
	RadioChangeEvent,
	Select
} from "antd";
import { Content } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";
import { FurLength, PetData, Sex, Species } from "common/enums";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import moment from "moment";
import { useRouter } from "next/dist/client/router";
import React, { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { defaultPet } from "../[id]";

export default function EditPetDetails() {
	const router = useRouter();
	const { id } = router.query;
	const [pet, setPet] = useState<PetData>(defaultPet);

	useEffect(() => {
		console.log(`Fetching pet info ${id}`);
		setPet(defaultPet);
	}, [id]);

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
		setPet((prev) => {
			return {
				...prev,
				[key]: val
			};
		});
	};

	const onMultipleChange = (
		value: string[],
		key: keyof Pick<PetData, "medicalIssues">
	) => {
		if (!value) return;
		setPet((prev) => {
			return {
				...prev,
				[key]: value
			};
		});
	};

	const onSelectChange = (
		value: string,
		key: keyof Pick<PetData, "species" | "furLength" | "breed">
	) => {
		if (!value) return;
		setPet((prev) => {
			return {
				...prev,
				[key]: value
			};
		});
	};

	const onDateChange = (
		date: moment.Moment,
		key: keyof Pick<PetData, "acquired" | "dateOfBirth">
	) => {
		if (!date) return;
		setPet((prev) => {
			return {
				...prev,
				[key]: date.toDate()
			};
		});
	};

	return (
		<ShelterLayout>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">Edit Pet Details</Breadcrumb.Item>
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
					<div>
						<DataField
							label="Photos"
							data={<ImageGallery images={pet.images} />}
							marginBottom={36}
						/>
					</div>
					<Flex>
						<div>
							<DataField
								label="Visibility"
								data={
									<Radio.Group
										value={pet.visible ? "yes" : "no"}
										onChange={(e) =>
											onRadioChange(e, "visible", true)
										}>
										<Radio value="yes">Yes</Radio>
										<Radio value="no">No</Radio>
									</Radio.Group>
								}
							/>
							<DataField
								label="Sex"
								data={
									<Radio.Group
										value={
											pet.sex === Sex.MALE
												? "Male"
												: "Female"
										}
										onChange={(e) =>
											onRadioChange(e, "sex")
										}>
										<Radio value="Male">Male</Radio>
										<Radio value="Female">Female</Radio>
									</Radio.Group>
								}
							/>
							<DataField
								label="Date Acquired"
								data={
									<DatePicker
										onChange={(val) =>
											onDateChange(
												val as moment.Moment,
												"acquired"
											)
										}
										defaultValue={moment(pet.acquired)}
										format="YYYY/MM/DD"
									/>
								}
							/>
							<DataField
								label="Species"
								data={
									<Select
										defaultValue={pet.species}
										style={{ width: 120 }}
										onChange={(value: string) =>
											onSelectChange(value, "species")
										}>
										{Object.values(Species).map(
											(val, index) => (
												<Select.Option
													value={val}
													key={index}>
													{val}
												</Select.Option>
											)
										)}
									</Select>
								}
							/>
							<DataField
								label="Fur Length"
								data={
									<Select
										value={pet.furLength}
										style={{ width: 120 }}
										onChange={(value: string) =>
											onSelectChange(value, "furLength")
										}>
										{Object.values(FurLength).map(
											(val, index) => (
												<Select.Option
													value={val}
													key={index}>
													{val}
												</Select.Option>
											)
										)}
									</Select>
								}
							/>

							<DataField
								label="Medical Issues"
								data={
									<Select
										allowClear
										style={{ width: "100%" }}
										mode="multiple"
										defaultValue={pet.medicalIssues ?? []}
										onChange={(value: string[]) =>
											onMultipleChange(
												value,
												"medicalIssues"
											)
										}>
										<Select.Option value="flu">
											Flu
										</Select.Option>
										<Select.Option value="cough">
											Cough
										</Select.Option>
										<Select.Option value="headache">
											Headache
										</Select.Option>
										<Select.Option value="sorethroat">
											Sore Throat
										</Select.Option>
										<Select.Option value="others">
											Others
										</Select.Option>
									</Select>
								}
							/>
							<DataField
								label="Sterilised"
								data={
									<Radio.Group
										value={pet.sterilised}
										onChange={(e) =>
											onRadioChange(e, "sterilised")
										}>
										<Radio value="yes">Yes</Radio>
										<Radio value="no">No</Radio>
										<Radio value="others">Others</Radio>
									</Radio.Group>
								}
								marginBottom={0}
							/>
						</div>
						<div>
							<DataField
								label="Name"
								data={<Input value={pet.name} />}
							/>
							<DataField
								label="Status"
								data={
									<Radio.Group
										value={pet.status}
										onChange={(e) =>
											onRadioChange(e, "status")
										}>
										<Radio value="Healthy">Healthy</Radio>
										<Radio value="Sick">Sick</Radio>
										<Radio value="Fostered">Fostered</Radio>
										<Radio value="Adopted">Adopted</Radio>
									</Radio.Group>
								}
							/>
							<DataField
								label="Date of Birth"
								data={
									<DatePicker
										onChange={(val) =>
											onDateChange(
												val as moment.Moment,
												"dateOfBirth"
											)
										}
										defaultValue={moment(pet.dateOfBirth)}
										format="YYYY/MM/DD"
									/>
								}
							/>
							<DataField
								label="Breed"
								data={
									<Select
										value={pet.breed}
										onChange={(value: string) =>
											onSelectChange(value, "breed")
										}>
										<Select.Option value="persian">
											Persian
										</Select.Option>
										<Select.Option value="mainecoon">
											Maine Coon
										</Select.Option>
										<Select.Option value="bengal">
											Bengal
										</Select.Option>
										<Select.Option value="britishshorthair">
											British Shorthair
										</Select.Option>
										<Select.Option value="siamese">
											Siamese
										</Select.Option>
									</Select>
								}
							/>
							<DataField
								label="Fur Color"
								data={
									<Select
										mode="multiple"
										value={pet.furColor}>
										<Select.Option value="brown">
											Brown
										</Select.Option>
										<Select.Option value="white">
											White
										</Select.Option>
										<Select.Option value="cgrayat">
											Gray
										</Select.Option>
									</Select>
								}
							/>

							<DataField
								label="Toilet Trained"
								data={
									<Radio.Group
										value={pet.toiletTrained ? "yes" : "no"}
										onChange={(e) =>
											onRadioChange(
												e,
												"toiletTrained",
												true
											)
										}>
										<Radio value="yes">Yes</Radio>
										<Radio value="no">No</Radio>
									</Radio.Group>
								}
								marginBottom={0}
							/>
						</div>
					</Flex>
				</InnerContent>
			</Container>
		</ShelterLayout>
	);
}

// =============================================================================
// Secondary Components
// =============================================================================

type ImageGalleryProps = {
	images?: string[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
	return (
		<GridContainer>
			{images &&
				images.map((image, index) => (
					<div
						key={index}
						style={{
							borderStyle: "solid",
							borderWidth: 1,
							borderColor: "#D9D9D9",
							borderRadius: 2
						}}>
						<img
							src={image}
							alt="Pet Image"
							style={{ width: 86, height: 86, margin: 9 }}
						/>
					</div>
				))}
		</GridContainer>
	);
};

type DataFieldProps = {
	label: string;
	data: string | ReactNode;
	marginBottom?: number;
};
const DataField = ({ label, data, marginBottom }: DataFieldProps) => {
	return (
		<DataFieldContainer
			style={{
				marginBottom: marginBottom ?? 24
			}}>
			<div className="label">{label} :</div>
			<div style={{ width: "80%" }}>{data}</div>
		</DataFieldContainer>
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

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 104px);
	grid-gap: 8px;
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

const DataFieldContainer = styled.div`
	display: flex;
	flex-direction: row;

	> div:first-child {
		text-align: right;
		width: 120px;
	}
	> div:last-child {
		padding-left: 8px;
	}
`;
