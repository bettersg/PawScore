import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
	Breadcrumb,
	Button,
	DatePicker,
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
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { defaultPet } from "../[id]";

export default function EditPetDetails() {
	const router = useRouter();
	const { id } = router.query;
	const [pet, setPet] = useState<PetData>(defaultPet);

	useEffect(() => {
		setPet(defaultPet);
	}, [id]);

	const onRadioChange = (e: RadioChangeEvent, key: keyof Pick<PetData, "visible" | "toiletTrained" | "sex" | "sterilised" | "status">, isYesNo?: boolean) => {
		if (!e.target.value) return;
		const val = isYesNo ? e.target.value === "yes" ? true : false : e.target.value;
		setPet((prev) => ({ ...prev, [key]: val }));
	};

	const onSelectChange = (value: string | string[], key: keyof Pick<PetData, "species" | "furLength" | "breed" | "medicalIssues">) => {
		if (!value) return;
		setPet((prev) => ({ ...prev, [key]: value }));
	};

	const onDateChange = (date: moment.Moment, key: keyof Pick<PetData, "acquired" | "dateOfBirth">) => {
		if (!date) return;
		setPet((prev) => ({ ...prev, [key]: date.toDate() }));
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
							<Button type="primary" icon={<EditOutlined />}>Save</Button>
						</div>
					</PetDetailHeader>
					<div>
						<DataField label="Image" data={<ImageGallery images={pet.images} />} marginBottom={36} />
					</div>
					<Flex>
						<div>
							<DataField
								required
								label="Visibility"
								data={
									<Radio.Group
										value={pet.visible ? "yes" : "no"}
										onChange={(e) => onRadioChange(e, "visible", true)}>
										<Radio value="yes">Yes</Radio>
										<Radio value="no">No</Radio>
									</Radio.Group>
								} />
							<DataField
								required
								label="Sex"
								data={
									<Radio.Group
										value={pet.sex === Sex.MALE ? "Male" : "Female"}
										onChange={(e) => onRadioChange(e, "sex")}>
										<Radio value="Male">Male</Radio>
										<Radio value="Female">Female</Radio>
									</Radio.Group>
								} />
							<DataField
								required
								label="Date Acquired"
								data={
									<DatePicker
										style={{ width: "100%" }}
										onChange={(val) => onDateChange(val as moment.Moment, "acquired")}
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
										style={{ width: "100%" }}
										onChange={(value: string) => onSelectChange(value, "species")}>
										{Object.values(Species).map((val, index) => (<Select.Option value={val} key={index}>{val}</Select.Option>))}
									</Select>
								}
							/>
							<DataField
								required
								label="Fur Length"
								data={
									<Select
										value={pet.furLength}
										style={{ width: "100%" }}
										onChange={(value: string) => onSelectChange(value, "furLength")}>
										{Object.values(FurLength).map((val, index) => (<Select.Option value={val} key={index}>{val}</Select.Option>))}
									</Select>
								}
							/>

							<DataField
								required
								label="Medical Issues"
								data={
									<Select
										allowClear
										style={{ width: "100%" }}
										mode="multiple"
										defaultValue={pet.medicalIssues ?? []}
										onChange={(value: string[]) => onSelectChange(value, "medicalIssues")}>
										<Select.Option value="flu">Flu</Select.Option>
										<Select.Option value="cough">Cough</Select.Option>
										<Select.Option value="headache">Headache</Select.Option>
										<Select.Option value="sorethroat">Sore Throat</Select.Option>
										<Select.Option value="others">Others</Select.Option>
									</Select>
								}
							/>
							<DataField
								required
								label="Sterilised"
								data={
									<Radio.Group
										value={pet.sterilised}
										onChange={(e) => onRadioChange(e, "sterilised")}>
										<Radio value="yes">Yes</Radio>
										<Radio value="no">No</Radio>
										<Radio value="others">Others</Radio>
									</Radio.Group>
								}
								marginBottom={0}
							/>
						</div>
						<div>
							<div style={{ height: 46 }} />
							<DataField
								required
								label="Name"
								data={<Input value={pet.name} />}
							/>
							<DataField
								required
								label="Status"
								data={
									<Radio.Group
										value={pet.status}
										onChange={(e) => onRadioChange(e, "status")}>
										<Radio value="Healthy">Healthy</Radio>
										<Radio value="Sick">Sick</Radio>
										<Radio value="Fostered">Fostered</Radio>
										<Radio value="Adopted">Adopted</Radio>
									</Radio.Group>
								}
							/>
							<DataField
								required
								label="Date of Birth"
								data={
									<DatePicker
										onChange={(val) => onDateChange(val as moment.Moment, "dateOfBirth")}
										defaultValue={moment(pet.dateOfBirth)}
										format="YYYY/MM/DD"
										style={{ width: "100%" }}
									/>
								}
							/>
							<DataField
								required
								label="Breed"
								data={
									<Select
										style={{ width: "100%" }}
										value={pet.breed}
										onChange={(value: string) => onSelectChange(value, "breed")}>
										<Select.Option value="persian">Persian</Select.Option>
										<Select.Option value="mainecoon">Maine Coon</Select.Option>
										<Select.Option value="bengal">Bengal</Select.Option>
										<Select.Option value="britishshorthair">British Shorthair</Select.Option>
										<Select.Option value="siamese">Siamese</Select.Option>
									</Select>
								}
							/>
							<DataField
								required
								label="Fur Color"
								data={
									<Select
										style={{ width: "100%" }}
										mode="multiple"
										value={pet.furColor}>
										<Select.Option value="brown">Brown</Select.Option>
										<Select.Option value="white">White</Select.Option>
										<Select.Option value="cgrayat">Gray</Select.Option>
									</Select>
								}
							/>

							<DataField
								required
								label="Toilet Trained"
								data={
									<Radio.Group
										value={pet.toiletTrained ? "yes" : "no"}
										onChange={(e) => onRadioChange(e, "toiletTrained", true)}>
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

const ImageGallery = ({ images = [] }: ImageGalleryProps) => {
	const imageUploadRef = useRef<HTMLInputElement>(null);
	const [pickedImage, setPickedImage] = useState<File | null>(null);
	const [preview, setPreview] = useState<string>();

	useEffect(() => {
		if (!pickedImage) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			setPreview(reader.result as string);
		};

		reader.readAsDataURL(pickedImage);
	}, [pickedImage]);

	return (
		<GridContainer>
			{images.length > 0 && images.map((image, index) => (
				<GalleryItem key={index}>
					<GalleryOverlayAction>
						<EyeOutlined style={{ cursor: "pointer", fontSize: 16, color: "#FFFFFF" }} />
						<DeleteOutlined style={{ cursor: "pointer", fontSize: 16, color: "#FFFFFF" }} />
					</GalleryOverlayAction>
					<GalleryImage src={image} alt="Pet Image" style={{ width: 86, height: 86, margin: 9 }} />
				</GalleryItem>
			))}
			<div style={{ cursor: "pointer", borderStyle: "dotted", borderWidth: 2, borderColor: "#D9D9D9", borderRadius: 2, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#FAFAFA", flexDirection: "column" }}
				onClick={() => {
					if (!imageUploadRef.current) return;
					imageUploadRef?.current?.click();
				}}>
				{!!preview ?
					<img src={preview} alt={"preview"} style={{ objectFit: "cover", width: 86, height: 86, margin: 9 }} /> :
					<>
						<span style={{ color: "#000000D9", fontSize: "20px" }}>+</span>
						<span style={{ color: "#00000073" }}>Upload</span>
						<input ref={imageUploadRef} type="file" style={{ display: "none" }}
							accept="image/*"
							onChange={(event) => {
								const file = event?.target?.files?.[0];
								if (!file) return;
								if (file && file.type.substr(0, 5) === "image") {
									setPickedImage(file);
								}
							}} />
					</>
				}
			</div>
		</GridContainer>
	);
};

type DataFieldProps = {
	label: string;
	data: string | ReactNode;
	marginBottom?: number;
	required?: boolean;
};

const DataField = ({ label, data, marginBottom, required = false }: DataFieldProps) => {
	return (
		<DataFieldContainer style={{ marginBottom: marginBottom ?? 24 }}>
			<div className="label">{required && <span style={{ color: "red" }}>* </span>}{label} :</div>
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

const GalleryOverlayAction = styled.div`
	background-color: #00000080;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	opacity: 0;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	transition: .2s ease;
`;

const GalleryItem = styled.div`
	position: relative;
	border-style: "solid";
	border-width: 1px;
	border-color: "#D9D9D9";
	border-radius: 2;
	&:hover ${GalleryOverlayAction} {
		opacity: 0.8;
	}
`;

const GalleryImage = styled.img`
	width: 86;
	height: 86;
	margin: 9;
`;