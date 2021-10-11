import styled from "styled-components";
import { Button } from "./Button";

const IMAGE =
	"https://s3-alpha-sig.figma.com/img/7117/8b1e/93da07b932e65c51a3fac51b1de02016?Expires=1635120000&Signature=dw2amb8nWvzPfSvnqyGQilxgUobiehKyMCT23pdXTOkeHnam9sOYIh1GuXwfwZ21u0pYNiifsqb5AXQp3ZN5MhD~x0Yz3qr0WmTfUZ8PzaIXrmhoiKc5TtXOYACY7o0WuOplTKINfpYKxmd1jly1IO1eUhqa315MzCojo84xzr2xhxhn63v6Rp~PlY-JLl2SOIcxNcplW24rfDQsWq66yFh-Wo88N0mK5sN1f2oQN1k8WYZ0JEjkY8RqYG26FyQ7rvjfOqfGpANj9NcBvGXqBoNibFzNHle18aBwa3zlWxk~VnvE7uczcUYcTrxZFqsaUK7~ZQCGa0IUsijrf6-kHw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

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
	background-color: var(--color-hero-background);
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
