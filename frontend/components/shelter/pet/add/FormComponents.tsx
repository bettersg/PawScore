import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { DatePicker, Input, Radio, RadioChangeEvent, Select } from "antd";
import moment from "moment";
import React, {
	ChangeEvent,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from "react";
import styled from "styled-components";

interface ImageSectionProps extends ImageGalleryProps {}

export const ImageSection = ({
	images = [],
	onChange = () => {},
	isEditMode = false,
}: ImageSectionProps) => (
	<div>
		<DataField
			required
			label="Image"
			data={
				<ImageGallery
					images={images}
					onChange={onChange}
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
	images: { photoUrl: string; thumbnailUrl: string }[];
	onChange: (images: string[]) => void;
	isEditMode: boolean;
}

const ImageGallery = ({
	images = [],
	onChange = () => {},
	isEditMode = false,
}: ImageGalleryProps) => {
	const imageUploadRef = useRef<HTMLInputElement>(null);
	const [pickedImage, setPickedImage] = useState<File | null>(null);
	const [cloned, setCloned] = useState([...images]);

	useEffect(() => {
		if (!pickedImage) return;
		const waitForLoadedImage = (_pickedImage: File): Promise<string> => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => {
					resolve(reader.result as string);
				};
				reader.readAsDataURL(_pickedImage);
			});
		};
		const runAsync = async () => {
			const base64ImageString = await waitForLoadedImage(pickedImage);
			setCloned((prev) => {
				return [...prev, base64ImageString];
			});
			setPickedImage(null);
		};
		runAsync();
	}, [pickedImage]);

	useEffect(() => {
		if (!isEditMode) return;
		onChange(cloned);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cloned, isEditMode]);

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
										color: "#FFFFFF",
									}}
								/>
								<DeleteOutlined
									style={{
										cursor: "pointer",
										fontSize: 16,
										color: "#FFFFFF",
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
					}}
				>
					<span style={{ color: "#000000D9", fontSize: "20px" }}>
						+
					</span>
					<span style={{ color: "#00000073" }}>Upload</span>
					<input
						ref={imageUploadRef}
						type="file"
						style={{ display: "none" }}
						accept="image/*"
						onChange={(event) => {
							const file = event?.target?.files?.[0];
							if (file && file.type.substr(0, 5) === "image") {
								setPickedImage(file);
							}
							// Reset value so that onChange will trigger again alter
							event.target.value = "";
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
