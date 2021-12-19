import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";
import { AddPetForm } from "components/shelter/pet/add/Form";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import React from "react";
import styled from "styled-components";

export default function AddNewPet() {
	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">Add Pet</Breadcrumb.Item>
				</Breadcrumb>
				<InnerContent>
					<AddPetForm />
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
