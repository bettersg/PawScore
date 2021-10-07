import styled from "styled-components";
import styles from "./Landing.module.css";

const { heroHeader } = styles;

const Hero = styled.div`
	height: 631px;
	background-color: var(--color-hero-background);
	display: flex;
	padding-left: 166px;
	padding-right: 181px;
`;

const HeroSection = styled.div`
	width: 50%;
`;

const AdopterLanding = () => {
	return (
		<Hero>
			<HeroSection>
				<div className={heroHeader}>
					Want to make a difference for our animal friends? You can
					help them by
				</div>
				<div>Adopt</div>
				<div>Or donate to our animals</div>
			</HeroSection>
			<HeroSection>Pictures</HeroSection>
		</Hero>
	);
};

export default AdopterLanding;
