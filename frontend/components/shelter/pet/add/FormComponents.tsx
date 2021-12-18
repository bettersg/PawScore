import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { DatePicker, Input, Radio, RadioChangeEvent, Select } from "antd";
import moment from "moment";
import React, {
	ChangeEvent,
	CSSProperties,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import styled from "styled-components";

interface ImageSectionProps extends ImageGalleryProps {}

export const ImageSection = ({
	images,
	addNewImage,
	removeImage,
	isEditMode = false,
}: ImageSectionProps) => (
	<div>
		<DataField
			required
			label="Image"
			data={
				<ImageGallery
					images={images}
					addNewImage={addNewImage}
					removeImage={removeImage}
					isEditMode={isEditMode}
				/>
			}
			marginBottom={36}
		/>
	</div>
);

interface FormSectionProps {
	pet: Animal.Attributes;
	onValueChange: (
		e: ChangeEvent<HTMLInputElement>,
		key: keyof Pick<Animal.Attributes, "name">,
	) => void;
	onRadioChange: (
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
	) => void;
	onDateChange: (
		date: moment.Moment,
		key: keyof Pick<Animal.Attributes, "intakeDate" | "dateOfBirth">,
	) => void;
	onSelectChange: (
		value: string | string[],
		key: keyof Pick<
			Animal.Attributes,
			"species" | "furLength" | "breed" | "healthIssues" | "color"
		>,
	) => void;
}

const FormSectionOne = ({
	pet,
	onRadioChange,
	onDateChange,
	onSelectChange,
}: FormSectionProps) => (
	<div>
		<DataField
			required
			label="Visibility"
			data={
				<Radio.Group
					value={pet.visible ? "yes" : "no"}
					onChange={(e) => onRadioChange(e, "visible", true)}
				>
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
					value={pet.gender === "M" ? "Male" : "Female"}
					onChange={(e) => onRadioChange(e, "gender")}
				>
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
						onDateChange(val as moment.Moment, "intakeDate")
					}
					defaultValue={moment(pet.intakeDate)}
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
					}
				>
					{Object.values(Animal.Species).map((val, index) => (
						<Select.Option value={val} key={index}>
							{val}
						</Select.Option>
					))}
				</Select>
			}
		/>
		{/* TODO: Update field type - furLength expects string */}
		{/* <DataField
			required
			label="Fur Length"
			data={
				<Select
					value={pet.furLength}
					style={{ width: "100%" }}
					onChange={(value: string) =>
						onSelectChange(value, "furLength")
					}
				>
					{Object.values(FurLength).map((val, index) => (
						<Select.Option value={val} key={index}>
							{val}
						</Select.Option>
					))}
				</Select>
			}
		/> */}
		{/* TODO: Update field type - healthIssues expects string */}
		{/* <DataField
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
					}
				>
					<Select.Option value="flu">Flu</Select.Option>
					<Select.Option value="cough">Cough</Select.Option>
					<Select.Option value="headache">Headache</Select.Option>
					<Select.Option value="sorethroat">
						Sore Throat
					</Select.Option>
					<Select.Option value="others">Others</Select.Option>
				</Select>
			}
		/> */}
		<DataField
			required
			label="Sterilised"
			data={
				<Radio.Group
					value={pet.sterilised}
					onChange={(e) => onRadioChange(e, "sterilised")}
				>
					<Radio value="Yes">Yes</Radio>
					<Radio value="No">No</Radio>
					<Radio value="Others">Others</Radio>
				</Radio.Group>
			}
			marginBottom={0}
		/>
	</div>
);

const FormSectionTwo = ({
	pet,
	onValueChange,
	onRadioChange,
	onDateChange,
	onSelectChange,
}: FormSectionProps) => (
	<div>
		<div style={{ height: 46 }} />
		<DataField
			required
			label="Name"
			data={
				<Input
					value={pet.name}
					onChange={(e) => onValueChange(e, "name")}
				/>
			}
		/>
		<DataField
			required
			label="Status"
			data={
				<Radio.Group
					value={pet.adoptionStatus}
					onChange={(e) => onRadioChange(e, "adoptionStatus")}
				>
					{/* TODO: check if ENUMS fit */}
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
		{/* TODO: breed expects string */}
		{/* <DataField
			required
			label="Breed"
			data={
				<Select
					style={{ width: "100%" }}
					value={pet.breed}
					onChange={(value: string) => onSelectChange(value, "breed")}
				>
					<Select.Option value="persian">Persian</Select.Option>
					<Select.Option value="mainecoon">Maine Coon</Select.Option>
					<Select.Option value="bengal">Bengal</Select.Option>
					<Select.Option value="britishshorthair">
						British Shorthair
					</Select.Option>
					<Select.Option value="siamese">Siamese</Select.Option>
				</Select>
			}
		/> */}
		{/* TODO: color expects string */}
		{/* <DataField
			required
			label="Fur Color"
			data={
				<Select
					allowClear
					defaultValue={pet.color}
					onChange={(value: string[]) =>
						onSelectChange(value, "color")
					}
					style={{ width: "100%" }}
					mode="multiple"
					value={pet.color}
				>
					<Select.Option value="brown">Brown</Select.Option>
					<Select.Option value="white">White</Select.Option>
					<Select.Option value="gray">Gray</Select.Option>
				</Select>
			}
		/> */}

		<DataField
			required
			label="Toilet Trained"
			data={
				<Radio.Group
					value={pet.toiletTrained ? "yes" : "no"}
					onChange={(e) => onRadioChange(e, "toiletTrained", true)}
				>
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
	SectionTwo: FormSectionTwo,
};

// =============================================================================
// Secondary Components
// =============================================================================

interface DataFieldProps {
	label: string;
	data: string | ReactNode;
	marginBottom?: number;
	required?: boolean;
}

const DataField = ({
	label,
	data,
	marginBottom,
	required = false,
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
	images: Animal.Image[];
	addNewImage: (img: Animal.Image) => void;
	removeImage: (imageIndex: number) => void;
	isEditMode: boolean;
}

const ImageGallery = ({
	images,
	addNewImage,
	removeImage,
	isEditMode = false,
}: ImageGalleryProps) => {
	const imageUploadRef = useRef<HTMLInputElement>(null);

	const waitForLoadedImage = (_pickedImage: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				resolve(reader.result as string);
			};
			reader.readAsDataURL(_pickedImage);
		});
	};

	const storeImageToGcp = async (imageFile: File): Promise<Animal.Image> => {
		const base64ImageString = await waitForLoadedImage(imageFile);
		/* TODO::
				send base64ImageString to backend for storage and receive image URL
			*/
		const imgUrl =
			"https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg";

		return {
			thumbnailUrl: imgUrl,
			photoUrl: imgUrl,
		};
	};

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		if (file && file.type.substring(0, 5)) {
			const image = await storeImageToGcp(file);
			addNewImage(image);
		}
		// Reset value so that onChange will trigger again alter
		event.target.value = "";
	};

	return (
		<GridContainer>
			{images.length > 0 &&
				images.map((image, index) => (
					<GalleryItem key={index}>
						{isEditMode && (
							<GalleryOverlayAction>
								<EyeOutlined style={overlayStyle} />
								<DeleteOutlined
									style={overlayStyle}
									onClick={() => removeImage(index)}
								/>
							</GalleryOverlayAction>
						)}
						<GalleryImage src={image.photoUrl} alt="Pet Image" />
					</GalleryItem>
				))}
			{isEditMode && (
				<UploaderContainer
					onClick={() => {
						if (!imageUploadRef.current) return;
						imageUploadRef?.current?.click();
					}}
				>
					<span className="symbol">+</span>
					<span className="upload">Upload</span>
					<input
						ref={imageUploadRef}
						type="file"
						style={{ display: "none" }}
						accept="image/*"
						onChange={uploadImage}
					/>
				</UploaderContainer>
			)}
		</GridContainer>
	);
};

// =============================================================================
// Styled Components
// =============================================================================

const overlayStyle: CSSProperties = {
	cursor: "pointer",
	fontSize: 16,
	color: "#FFFFFF",
};

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

	span.symbol {
		color: #000000d9;
		font-size: 20px;
	}
	span.upload {
		color: #00000073;
	}
`;
