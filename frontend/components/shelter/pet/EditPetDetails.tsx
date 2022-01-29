import { Animal } from "@contract";
import { Breadcrumb } from "antd";
import PetDetailsSection from "components/shelter/pet/PetDetailsSection";
import { Container } from "./styledComponents";
import Title from "antd/lib/typography/Title";
import { Button } from "antd";
import { CloseOutlined, SaveOutlined } from "@ant-design/icons";
import styled from "styled-components";

type EditPetDetailsProps = {
	petData: Animal.Attributes;
	onClickCancel: () => void;
};

export const EditPetDetails = ({
	petData,
	onClickCancel,
}: EditPetDetailsProps) => (
	<>
		<Container>
			<Breadcrumb separator=">">
				<Breadcrumb.Item>Pets</Breadcrumb.Item>
				<Breadcrumb.Item>View Pet Details</Breadcrumb.Item>
				<Breadcrumb.Item>Edit Pet Details</Breadcrumb.Item>
			</Breadcrumb>
			{/* {petData && <PetDetailsSection petData={petData} />} */}
			<PetDetailHeader>
				<Title style={{ marginBottom: 0 }} level={5}>
					Edit Pet Details
				</Title>
				<IdContainer>ID: 1234</IdContainer>
			</PetDetailHeader>
			<ButtonContainer>
				<Button
					type="default"
					icon={<CloseOutlined />}
					onClick={onClickCancel}
				>
					Cancel
				</Button>
				<Button type="primary" icon={<SaveOutlined />}>
					Save
				</Button>
			</ButtonContainer>
		</Container>
		{/* <Container>
			{petAdopters && <ProspectiveAdopters petAdopters={petAdopters} />}
		</Container> */}
	</>
);

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
