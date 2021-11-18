import styled from "styled-components";

const shelters = ["Shelter 1", "Shelter 2", "Shelter 3", "Shelter 4"];

/* TODO: Update each ticker to a link with updated name and url */
const ShelterTicker = () => (
	<ShelterNav>
		{shelters.map((shelter, index) => (
			<div key={index}>{shelter}</div>
		))}
	</ShelterNav>
);
export default ShelterTicker;

// =============================================================================
// Styled Components
// =============================================================================

const ShelterNav = styled.div`
	display: flex;
	justify-content: space-between;
	font-family: Poppins;
	font-weight: 500;
	font-size: 20px;
	padding: 31px 10%;

	> div {
		padding: 0 31px;
	}
`;
