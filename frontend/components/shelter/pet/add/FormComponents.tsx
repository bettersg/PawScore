import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Animal, Upload } from "@contract";
import { DatePicker, Input, Radio, RadioChangeEvent, Select } from "antd";
import { PetApi } from "api/petApi";
import { NewAnimal } from "common/types";
import moment from "moment";
import React, { ChangeEvent, CSSProperties, ReactNode, useRef } from "react";
import styled, { css } from "styled-components";

interface ImageSectionProps extends ImageProps {
	updateImages: (images: Animal.Image[]) => void;
}

interface FormBaseProps {
	pet: NewAnimal;
	handleChange: (e: RadioChangeEvent | ChangeEvent<HTMLInputElement>) => void;
	handleDateChange: (
		fieldName: keyof Pick<Animal.Attributes, "intakeDate" | "dateOfBirth">,
		value: moment.Moment | null,
	) => void;
}
interface FormSectionOneProps extends FormBaseProps {
	handleSelectChange: (value: Animal.Species) => void;
}
interface FormSectionTwoProps extends FormBaseProps {}

// =============================================================================
// Primary Form Sections
// =============================================================================
const ImageSection = ({
	images,
	updateImages,
	isEditMode = false,
}: ImageSectionProps) => {
	const addNewImage = (newImg: Animal.Image) => {
		const currImages = images || [];

		updateImages([...currImages, newImg]);
	};
	const removeImage = (imageIndex: number) => {
		const currImages = [...images!];
		currImages.splice(imageIndex, 1);

		updateImages(currImages);
	};
	return (
		<div>
			<DataField
				flex={false}
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
};

const FormSectionOne = ({
	pet,
	handleChange,
	handleSelectChange,
	handleDateChange,
}: FormSectionOneProps) => (
	<div>
		<DataField
			required
			label="Visibility"
			data={
				<Radio.Group
					name={"visible" as keyof Pick<Animal.Attributes, "visible">}
					defaultValue={pet.visible}
					onChange={handleChange}
				>
					<Radio value={true}>Yes</Radio>
					<Radio value={false}>No</Radio>
				</Radio.Group>
			}
		/>
		<DataField
			required
			label="Sex"
			data={
				<Radio.Group
					name={"gender" as keyof Pick<Animal.Attributes, "gender">}
					defaultValue={pet.gender}
					onChange={handleChange}
				>
					<Radio value="M">Male</Radio>
					<Radio value="F">Female</Radio>
				</Radio.Group>
			}
		/>
		<DataField
			required
			label="Date Acquired"
			data={
				<DatePicker
					name={
						"intakeDate" as keyof Pick<
							Animal.Attributes,
							"intakeDate"
						>
					}
					style={{ width: "100%" }}
					onChange={(value) => {
						handleDateChange("intakeDate", value);
					}}
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
					onChange={(value) => {
						handleSelectChange(value);
					}}
				>
					{Object.values(Animal.Species).map((val) => (
						<Select.Option value={val} key={val}>
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
				<Input
					name={
						"furLength" as keyof Pick<
							Animal.Attributes,
							"furLength"
						>
					}
					defaultValue={pet.name}
					onChange={handleChange}
				/>
			}
		/>
		<DataField
			required
			label="Medical Issues"
			data={
				<Input
					name={
						"healthIssues" as keyof Pick<
							Animal.Attributes,
							"healthIssues"
						>
					}
					defaultValue={pet.healthIssues}
					onChange={handleChange}
				/>
			}
		/>
		<DataField
			required
			label="Sterilised"
			data={
				<Radio.Group
					name={
						"sterilised" as keyof Pick<
							Animal.Attributes,
							"sterilised"
						>
					}
					defaultValue={pet.sterilised}
					onChange={handleChange}
				>
					<Radio value={true}>Yes</Radio>
					<Radio value={false}>No</Radio>
					<Radio value={null}>Others</Radio>
				</Radio.Group>
			}
			marginBottom={0}
		/>
	</div>
);

const FormSectionTwo = ({
	pet,
	handleChange,
	handleDateChange,
}: FormSectionTwoProps) => (
	<div>
		<div style={{ height: 46 }} />
		<DataField
			required
			label="Name"
			data={
				<Input
					name={"name" as keyof Pick<Animal.Attributes, "name">}
					defaultValue={pet.healthIssues}
					onChange={handleChange}
				/>
			}
		/>
		<DataField
			required
			label="Status"
			data={
				<Radio.Group
					name={
						"adoptionStatus" as keyof Pick<
							Animal.Attributes,
							"adoptionStatus"
						>
					}
					defaultValue={pet.adoptionStatus}
					onChange={handleChange}
				>
					{/* TODO: check if ENUMS fit */}
					{Object.values(Animal.AdoptionStatus).map((value) => (
						<Radio value={value} key={value}>
							{value}
						</Radio>
					))}
				</Radio.Group>
			}
		/>
		<DataField
			required
			label="Date of Birth"
			data={
				<DatePicker
					name={
						"dateOfBirth" as keyof Pick<
							Animal.Attributes,
							"dateOfBirth"
						>
					}
					style={{ width: "100%" }}
					onChange={(value) => {
						handleDateChange("dateOfBirth", value);
					}}
					defaultValue={moment(pet.dateOfBirth)}
					format="YYYY/MM/DD"
				/>
			}
		/>
		<DataField
			required
			label="Breed"
			data={
				<Input
					name={"breed" as keyof Pick<Animal.Attributes, "breed">}
					defaultValue={pet.breed || ""}
					onChange={handleChange}
				/>
			}
		/>
		<DataField
			required
			label="Fur Color"
			data={
				<Input
					name={"color" as keyof Pick<Animal.Attributes, "color">}
					defaultValue={pet.color}
					onChange={handleChange}
				/>
			}
		/>
		<DataField
			required
			label="Toilet Trained"
			data={
				<Radio.Group
					name={
						"toiletTrained" as keyof Pick<
							Animal.Attributes,
							"toiletTrained"
						>
					}
					defaultValue={pet.toiletTrained}
					onChange={handleChange}
				>
					<Radio value={true}>Yes</Radio>
					<Radio value={false}>No</Radio>
				</Radio.Group>
			}
			marginBottom={0}
		/>
	</div>
);

export const FormSection = {
	ImageSection: ImageSection,
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
	flex?: boolean;
}

const DataField = ({
	label,
	data,
	marginBottom,
	required = false,
	flex = true,
}: DataFieldProps) => {
	return (
		<DataFieldContainer
			style={{ marginBottom: marginBottom ?? 24 }}
			flex={flex}
		>
			<div className="label">
				{required && <span>*</span>}
				{label} :
			</div>
			<div className="data">{data}</div>
		</DataFieldContainer>
	);
};

interface ImageProps {
	images: Animal.Image[];
	isEditMode: boolean;
}
interface ImageGalleryProps extends ImageProps {
	addNewImage: (img: Animal.Image) => void;
	removeImage: (imageIndex: number) => void;
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
		const imageData: Upload.uploadImageApiDomain.requestBody = {
			originalFileName: imageFile.name,
			base64File: await waitForLoadedImage(imageFile),
		};
		const res = await new PetApi().uploadImage(imageData);

		return {
			thumbnailUrl: res.payload.thumbnailUrl,
			photoUrl: res.payload.url,
		};
	};

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event?.target?.files?.[0];
		try {
			if (file && file.type.substring(0, 5)) {
				const image = await storeImageToGcp(file);
				addNewImage(image);
			}
		} catch (error) {
			alert("error uploading image");
		} finally {
			// Reset value so that onChange will trigger again alter
			event.target.value = "";
		}
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

const DataFieldContainer = styled.div<{ flex: boolean }>`
	display: flex;
	flex-direction: row;

	div.label {
		text-align: right;
		width: 120px;
		${({ flex }) =>
			flex &&
			css`
				display: flex;
				justify-content: flex-end;
				align-items: center;
			`}
		span {
			color: red;
			padding-right: 3px;
		}
	}
	div.data {
		padding-left: 8px;
		width: 80%;
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
