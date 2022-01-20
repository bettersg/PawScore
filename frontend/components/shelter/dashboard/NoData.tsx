import { Button } from "antd";
import { useRouter } from "next/router";
import styled from "styled-components";
import { EmptyContainer } from "../../common/EmptyContainer";

const NoData = ({ shelterId }: { shelterId: string }) => {
	const router = useRouter();
	const redirectToAddPet = () => {
		router.push(`/shelter/${shelterId}/pet/add`);
	};
	return (
		<EmptyContainer>
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
					onClick={redirectToAddPet}
				>
					Add a pet
				</Button>
			</CenteredDiv>
		</EmptyContainer>
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
