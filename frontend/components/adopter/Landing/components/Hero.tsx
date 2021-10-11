import { Button } from "antd";
import styled from "styled-components";
import {
	PICTURE_ONE,
	PICTURE_THREE,
	PICTURE_TWO,
	VerticalDivider
} from "../common";

const Hero = () => (
	<Container>
		<HeroSection>
			<HeroHeader>
				Want to make a difference for our animal friends? You can help
				them by
			</HeroHeader>
			<AdoptButton size="large">Adopt</AdoptButton>
			<div className="donate">Or donate to our animals</div>
		</HeroSection>
		<VerticalDivider />
		<HeroSection>
			<div>
				<img src={PICTURE_ONE} alt="pic_1" width="220" />
			</div>
			<div>
				<div>
					<img src={PICTURE_TWO} alt="pic_2" width="263" />
				</div>
				<ImgDivider />
				<div>
					<img src={PICTURE_THREE} alt="pic_3" width="263" />
				</div>
			</div>
		</HeroSection>
	</Container>
);
export default Hero;

// =============================================================================
// Styled Components
// =============================================================================
const Container = styled.div`
	height: 631px;
	background-color: var(--color-hero-background);
	display: flex;
	padding: 0 15%;
	align-items: center;
`;

const HeroSection = styled.div`
	width: 50%;
	color: #11025a;

	:first-child .donate {
		font-family: Poppins;
		font-size: 15px;
		text-decoration: underline;
		margin-top: 20px;
	}

	:last-child {
		display: flex;
		align-items: center;
		img {
			border-radius: 7px;
		}

		> div:first-child img {
			margin-right: 13px;
		}
	}
`;

const HeroHeader = styled.div`
	font-family: Ubuntu;

	font-size: 40px;
	line-height: 50px;
	margin-bottom: 70px;
`;

const AdoptButton = styled(Button)`
	background: var(--color-orange);
	border-color: var(--color-orange);
	border-radius: 7px;

	font-family: Poppins;
	font-size: 18px;
	color: #11025a;
`;

const ImgDivider = styled.div`
	height: 14px;
`;