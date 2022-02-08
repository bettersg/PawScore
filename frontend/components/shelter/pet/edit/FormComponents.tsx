import { Breadcrumb, Input, Radio, RadioChangeEvent, Select } from "antd";
import { Container } from "../styledComponents";
import Title from "antd/lib/typography/Title";
import { Button } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Animal } from "@contract";
import { ImageGallery } from "../common/ImageGallery";
import { ChangeEvent, ReactNode } from "react";

const { TextArea } = Input;

// =============================================================================
// Primary Form Sections
// =============================================================================
interface IPetDataProp {
	petData: Animal.Attributes;
}
interface FormProps {
	handleChange: (
		e:
			| RadioChangeEvent
			| ChangeEvent<HTMLInputElement>
			| ChangeEvent<HTMLTextAreaElement>,
	) => void;
	handleSelectChange: (
		value: Animal.Species | Animal.AdoptionStatus,
		field: keyof Animal.Attributes,
	) => void;
}
type SectionProps = IPetDataProp & FormProps;

type FormHeaderProps = {
	petId: string;
	onClickCancel: () => void;
	isValidForm: boolean;
	isSubmitting: boolean;
	handleSubmit: () => Promise<void>;
};
const FormHeader = ({
	petId,
	onClickCancel,
	isValidForm,
	isSubmitting,
	handleSubmit,
}: FormHeaderProps) => (
	<Container>
		<Breadcrumb separator=">">
			<Breadcrumb.Item>Pets</Breadcrumb.Item>
			<Breadcrumb.Item>View Pet Details</Breadcrumb.Item>
			<Breadcrumb.Item>Edit Pet Details</Breadcrumb.Item>
		</Breadcrumb>
		<PetDetailHeader>
			<Title style={{ marginBottom: 0 }} level={5}>
				Edit Pet Details
			</Title>
			<IdContainer>ID: {petId}</IdContainer>
		</PetDetailHeader>
		<ButtonContainer>
			<Button
				type="default"
				icon={<CloseOutlined />}
				onClick={onClickCancel}
			>
				Cancel
			</Button>
			<Button
				type="primary"
				icon={<SaveOutlined />}
				disabled={!isValidForm || isSubmitting}
				onClick={handleSubmit}
			>
				Save
			</Button>
		</ButtonContainer>
	</Container>
);

type ImageSectionProps = {
	images: Animal.Image[];
	updateImages: (images: Animal.Image[]) => void;
};
const ImageSection = ({ images, updateImages }: ImageSectionProps) => {
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
		<FormSectionWithTitle title="Add Photos or Videos">
			<ImageGallery
				isEditMode
				images={images}
				addNewImage={addNewImage}
				removeImage={removeImage}
			/>
		</FormSectionWithTitle>
	);
};

const PetInfoSection = ({
	petData,
	handleChange,
	handleSelectChange,
}: SectionProps) => (
	<FormSectionWithTitle title="Pet Information">
		<Grid columns={3}>
			<DataField
				required
				label="Name"
				data={
					<Input
						name={"name" as keyof Pick<Animal.Attributes, "name">}
						defaultValue={petData.name}
						onChange={handleChange}
					/>
				}
			/>
			<DataField
				label="Breed"
				data={
					<Input
						name={"breed" as keyof Pick<Animal.Attributes, "breed">}
						defaultValue={petData.breed || undefined}
						placeholder="Siamese"
						onChange={handleChange}
					/>
				}
			/>
			<DataField
				label="Weight"
				data={
					<Input
						name={
							"weightKg" as keyof Pick<
								Animal.Attributes,
								"weightKg"
							>
						}
						defaultValue={petData.weightKg || undefined}
						placeholder="in kg"
						onChange={handleChange}
					/>
				}
			/>
			<DataField
				required
				label="Species"
				data={
					<Select
						defaultValue={petData.species}
						style={{ width: "100%" }}
						onChange={(value) => {
							handleSelectChange(value, "species");
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
				label="Gender"
				data={
					<Radio.Group
						name={
							"gender" as keyof Pick<Animal.Attributes, "gender">
						}
						defaultValue={petData.gender}
						onChange={handleChange}
					>
						<Radio value="M">Male</Radio>
						<Radio value="F">Female</Radio>
					</Radio.Group>
				}
			/>
			<DataField
				label="Fur Colour"
				data={
					<Input
						name={"color" as keyof Pick<Animal.Attributes, "color">}
						defaultValue={petData.color}
						placeholder="brown"
						onChange={handleChange}
					/>
				}
			/>
		</Grid>
	</FormSectionWithTitle>
);

const ImportantInfoSection = ({
	petData,
	handleChange,
	handleSelectChange,
}: SectionProps) => (
	<FormSectionWithTitle title="Important Information ">
		<Grid columns={2}>
			<DataField
				label="Medical Information"
				data={
					<TextArea
						name={
							"healthIssues" as keyof Pick<
								Animal.Attributes,
								"healthIssues"
							>
						}
						defaultValue={petData.healthIssues}
						placeholder="Any medical or health issues"
						onChange={handleChange}
					/>
				}
			/>
			{/* TODO: unsure of what this field corresponds to */}
			<DataField
				label="Preferences and Needs"
				data={
					<TextArea
						name={
							"healthIssues" as keyof Pick<
								Animal.Attributes,
								"healthIssues"
							>
						}
						defaultValue=""
					/>
				}
			/>
			<DataField
				required
				label="Sterilization Status"
				data={
					<Radio.Group
						name={
							"sterilised" as keyof Pick<
								Animal.Attributes,
								"sterilised"
							>
						}
						defaultValue={petData.sterilised}
						onChange={handleChange}
					>
						<Radio value={true}>Yes</Radio>
						<Radio value={false}>No</Radio>
						<Radio value={null}>Others</Radio>
					</Radio.Group>
				}
			/>
			<DataField
				required
				label="Listed as:"
				data={
					<Select
						defaultValue={petData.adoptionStatus}
						style={{ width: "100%" }}
						onChange={(value) => {
							handleSelectChange(value, "adoptionStatus");
						}}
					>
						{Object.values(Animal.AdoptionStatus).map((val) => (
							<Select.Option value={val} key={val}>
								{val}
							</Select.Option>
						))}
					</Select>
				}
			/>
		</Grid>
	</FormSectionWithTitle>
);

export const FormComponents = {
	FormHeader,
	ImageSection,
	PetInfoSection,
	ImportantInfoSection,
};

// =============================================================================
// Secondary Form Sections
// =============================================================================
type FormSectionWithTitleProps = {
	title: string;
	children: ReactNode;
};
const FormSectionWithTitle = ({
	title,
	children,
}: FormSectionWithTitleProps) => (
	<Container $padBottom>
		<TitleContainer>
			<Title style={{ marginBottom: 0 }} level={5}>
				{title}
			</Title>
		</TitleContainer>
		{children}
	</Container>
);

type DataFieldProps = {
	label: string;
	data: string | ReactNode;
	// marginBottom?: number;
	required?: boolean;
	// flex?: boolean;
};

const DataField = ({ label, data, required = false }: DataFieldProps) => {
	return (
		<DataFieldContainer>
			<div className="label">
				{required && <span>*</span>}
				{label}
			</div>
			<div>{data}</div>
		</DataFieldContainer>
	);
};

// =============================================================================
// Styled Components
// =============================================================================
const PetDetailHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 14px;
	margin-bottom: 26px;
`;

const IdContainer = styled.div`
	color: var(--color-golden-purple);
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;

	button {
		margin-left: 8px;
	}
`;

const TitleContainer = styled.div`
	margin: 0 -24px 24px;
	padding: 0 24px 16px;
	border-bottom: 1px solid #f0f0f0;
`;

const DataFieldContainer = styled.div`
	.label {
		margin: 8px 0;

		span {
			color: red;
			padding-right: 3px;
		}
	}
`;

const Grid = styled.div<{ columns: number }>`
	display: grid;
	grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
	grid-gap: 32px 16px;
`;
