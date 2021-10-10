import { EditOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import Title from "antd/lib/typography/Title";
import { PetData } from "common/enums";
import React, { ReactNode } from "react";
import styled from "styled-components";

type PetDetailsSectionProps = {
	petData: PetData;
};
const PetDetailsSection = ({ petData }: PetDetailsSectionProps) => {
	const { key, images, visible, breed, name, species, acquired, status } =
		petData;
	return (
		<InnerContent>
			<PetDetailHeader>
				<Title level={5}>Pet Details</Title>
				<Button
					type="primary"
					icon={<EditOutlined />}
					href={`${key}/edit`}>
					Edit
				</Button>
			</PetDetailHeader>
			<div>
				<DataField
					label="Photos"
					data={<ImageGallery images={images} />}
					marginBottom={36}
				/>
			</div>
			<Flex>
				<div>
					<DataField label="ID" data={key} />
					<DataField
						label="Visibility"
						data={visible ? "Yes" : "No"}
					/>
					<DataField label="Status" data={status} />
					<DataField label="Date of Birth" data="data" />
					{/* TODO: update to age if needed */}
					<DataField label="Breed" data={breed} marginBottom={0} />
				</div>
				<div>
					<DataField label="Name" data={name} />
					<DataField label="Species" data={species} />
					<DataField
						label="Date Acquired"
						data={acquired.toLocaleDateString()}
					/>
					<DataField
						label="Medical Problems"
						data={
							<>
								<Tag>Problem 1</Tag>
								<Tag>Problem 2</Tag>
								<Tag>Problem 3</Tag>
							</>
						}
					/>
					{/* TODO: update add to petData */}
				</div>
			</Flex>
		</InnerContent>
	);
};

export default PetDetailsSection;

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
			<div>{data}</div>
		</DataFieldContainer>
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
		width: 85px;
	}
	> div:last-child {
		padding-left: 8px;
	}
`;

const PetDetailHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const InnerContent = styled.div`
	margin-top: 24px;
`;
