import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { DatePicker, Input, Radio, RadioChangeEvent, Select } from "antd";
import { FurLength, PetData, Sex, Species } from "common/enums";
import moment from "moment";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface ImageSectionProps extends ImageGalleryProps { }

export const ImageSection = ({
	images = [],
	onChange = () => { },
	isEditMode = false
}: ImageSectionProps) => (
	<div>
		<DataField
			required
			label="Image"
			data={<ImageGallery images={images} onChange={onChange} isEditMode={isEditMode} />}
			marginBottom={36}
		/>
	</div>
);

interface FormSectionProps {
	pet: PetData;
	onRadioChange: (
		e: RadioChangeEvent,
		key: keyof Pick<
			PetData,
			"visible" | "toiletTrained" | "sex" | "sterilised" | "status"
		>,
		isYesNo?: boolean
	) => void;
	onDateChange: (
		date: moment.Moment,
		key: keyof Pick<PetData, "acquired" | "dateOfBirth">
	) => void;
	onSelectChange: (
		value: string | string[],
		key: keyof Pick<
			PetData,
			"species" | "furLength" | "breed" | "medicalIssues"
		>
	) => void;
};

const FormSectionOne = ({
	pet,
	onRadioChange,
	onDateChange,
	onSelectChange
}: FormSectionProps) => (
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
			}
		/>
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
			}
		/>
		<DataField
			required
			label="Date Acquired"
			data={
				<DatePicker
					style={{ width: "100%" }}
					onChange={(val) =>
						onDateChange(val as moment.Moment, "acquired")
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
					style={{ width: "100%" }}
					onChange={(value: string) =>
						onSelectChange(value, "species")
					}>
					{Object.values(Species).map((val, index) => (
						<Select.Option value={val} key={index}>
							{val}
						</Select.Option>
					))}
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
					onChange={(value: string) =>
						onSelectChange(value, "furLength")
					}>
					{Object.values(FurLength).map((val, index) => (
						<Select.Option value={val} key={index}>
							{val}
						</Select.Option>
					))}
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
					onChange={(value: string[]) =>
						onSelectChange(value, "medicalIssues")
					}>
					<Select.Option value="flu">Flu</Select.Option>
					<Select.Option value="cough">Cough</Select.Option>
					<Select.Option value="headache">Headache</Select.Option>
					<Select.Option value="sorethroat">
						Sore Throat
					</Select.Option>
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
);

const FormSectionTwo = ({
	pet,
	onRadioChange,
	onDateChange,
	onSelectChange
}: FormSectionProps) => (
	<div>
		<div style={{ height: 46 }} />
		<DataField required label="Name" data={<Input value={pet.name} />} />
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
					onChange={(val) =>
						onDateChange(val as moment.Moment, "dateOfBirth")
					}
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
					onChange={(value: string) =>
						onSelectChange(value, "breed")
					}>
					<Select.Option value="persian">Persian</Select.Option>
					<Select.Option value="mainecoon">Maine Coon</Select.Option>
					<Select.Option value="bengal">Bengal</Select.Option>
					<Select.Option value="britishshorthair">
						British Shorthair
					</Select.Option>
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
);

export const FormSection = {
	SectionOne: FormSectionOne,
	SectionTwo: FormSectionTwo
};

// =============================================================================
// Secondary Components
// =============================================================================

interface DataFieldProps {
	label: string;
	data: string | ReactNode;
	marginBottom?: number;
	required?: boolean;
};

const DataField = ({
	label,
	data,
	marginBottom,
	required = false
}: DataFieldProps) => {
	return (
		<DataFieldContainer style={{ marginBottom: marginBottom ?? 24 }}>
			<div className="label">
				{required && <span style={{ color: "red" }}>* </span>}
				{label} :
			</div>
			<div style={{ width: "80%" }}>{data}</div>
		</DataFieldContainer>
	);
};

interface ImageGalleryProps {
	images?: string[];
	onChange?: (images: string[]) => void;
	isEditMode?: boolean;
};

const ImageGallery = ({
	images = [],
	onChange = () => { },
	isEditMode = false
}: ImageGalleryProps) => {
	const imageUploadRef = useRef<HTMLInputElement>(null);
	const [pickedImage, setPickedImage] = useState<File | null>(null);
	const [cloned, setCloned] = useState([...images]);

	useEffect(() => {
		if (!pickedImage) return;
		const reader = new FileReader();
		reader.onloadend = () => {
			setCloned((prev) => {
				return [...prev, reader.result as string];
			});
		};

		reader.readAsDataURL(pickedImage);
	}, [pickedImage]);

	useEffect(() => {
		if (!onChange || !isEditMode) return;
		onChange(cloned);
	}, [cloned, isEditMode, onChange]);

	const onDeleteImage = (index: number) => {
		if (!!cloned[index]) {
			const arr = [...cloned];
			arr.splice(index, 1);
			setCloned(arr);
		}
	};

	return (
		<GridContainer>
			{cloned.length > 0 &&
				cloned.map((image, index) => (
					<GalleryItem key={index}>
						{isEditMode && (
						<GalleryOverlayAction>
							<EyeOutlined
								style={{
									cursor: "pointer",
									fontSize: 16,
									color: "#FFFFFF"
								}}
							/>
							<DeleteOutlined
								style={{
									cursor: "pointer",
									fontSize: 16,
									color: "#FFFFFF"
								}}
								onClick={() => onDeleteImage(index)}
							/>
						</GalleryOverlayAction>
						)}
						<GalleryImage src={image} alt="Pet Image" />
					</GalleryItem>
				))}
			{isEditMode && (
			<UploaderContainer
				onClick={() => {
					if (!imageUploadRef.current) return;
					imageUploadRef?.current?.click();
				}}>
				<span style={{ color: "#000000D9", fontSize: "20px" }}>+</span>
				<span style={{ color: "#00000073" }}>Upload</span>
				<input
					ref={imageUploadRef}
					type="file"
					style={{ display: "none" }}
					accept="image/*"
					onChange={(event) => {
						const file = event?.target?.files?.[0];
						if (!file) return;
						if (file && file.type.substr(0, 5) === "image") {
							setPickedImage(file);
						}
					}}
				/>
			</UploaderContainer>
			)}
		</GridContainer>
	);
};

// =============================================================================
// Styled Components
// =============================================================================

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 104px);
	grid-gap: 8px;
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
	transition: 0.2s ease;
`;

const GalleryItem = styled.div`
	position: relative;
	border-style: solid;
	border-width: 1px;
	border-color: #d9d9d9;
	border-radius: 2px;
	&:hover ${GalleryOverlayAction} {
		opacity: 0.8;
	}
`;

const GalleryImage = styled.img`
	width: 86px;
	height: 86px;
	margin: 9px;
	object-fit: contain;
`;

const UploaderContainer = styled.div`
	height: 104px;
	width: 104px;
	cursor: pointer;
	border-style: dotted;
	border-width: 2px;
	border-color: #d9d9d9;
	border-radius: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #fafafa;
	flex-direction: column;
`;
