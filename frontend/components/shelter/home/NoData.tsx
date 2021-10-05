import { Button } from "antd";
import styled from "styled-components";

const CenteredDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const Container = styled.div`
	height: calc(100vh - var(--menu-header-menu-height));
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const NoData = () => {
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
				<Button type="default" style={{ margin: 4 }}>
					Add a pet
				</Button>
			</CenteredDiv>
		</Container>
	);
};

export default NoData;
