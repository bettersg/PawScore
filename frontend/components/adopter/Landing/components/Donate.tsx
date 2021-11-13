import styled from "styled-components";
import { Button } from "./Button";

const IMAGE = "/homepage_footer.png";

const Donate = () => {
	const handleDonateClick = () => {
		alert("make a difference");
	};
	return (
		<Container>
			<img src={IMAGE} alt="donate" width="224" height="291" />
			<Section>
				<div>Donate to our animals</div>
				<Button type="donate" onClick={handleDonateClick}>
					Make a difference
				</Button>
			</Section>
		</Container>
	);
};
export default Donate;

// =============================================================================
// Styled Components
// =============================================================================
const Container = styled.div`
	background-color: var(--color-background);
	height: 320px;
	padding: 0 13%;
	display: flex;
	font-family: Poppins;

	img {
		object-fit: cover;
		object-position: bottom;
	}
`;

const Section = styled.div`
	margin-top: 83px;
	margin-left: 30px;

	> div:first-child {
		font-size: 40px;
		line-height: 60px;
		color: #797777;
		margin-bottom: 20px;
	}
`;
