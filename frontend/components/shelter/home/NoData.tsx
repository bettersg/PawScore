import { Button } from "antd";
import Router from "next/router";
import styled from "styled-components";
import { Container } from "./PetsTable/EmptyContainer";

const NoData = () => {
	const handleAdd = () => {
		Router.push("/shelter/pet/add");
	};

	return (
		<Container>
			<CenteredDiv>
				<img
					src="https://via.placeholder.com/97"
					alt="Logo"
					width="97"
					height="97"
				/>
			</CenteredDiv>
			<CenteredDiv>No data</CenteredDiv>
			<CenteredDiv>
				<Button type="primary" style={{ margin: 4 }}>
					Integrate with current software
				</Button>
				<Button
					type="default"
					style={{ margin: 4 }}
					onClick={handleAdd}
				>
					Add a pet
				</Button>
			</CenteredDiv>
		</Container>
	);
};

export default NoData;

// =============================================================================
// Styled Components
// =============================================================================
const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`;
