import styled from "styled-components";
import Hero from "./components/Hero";
import ShelterTicker from "./components/ShelterTicker";
import Content from "./components/Content";

const AdopterLanding = () => {
	return (
		<Container>
			<Hero />
			<ShelterTicker />
			<Content />
		</Container>
	);
};

export default AdopterLanding;

const Container = styled.div`
	background-color: var(--color-white);
`;
