import styled from "styled-components";
import Hero from "./components/Hero";
import ShelterTicker from "./components/ShelterTicker";
import Content from "./components/Content";
import Donate from "./components/Donate";

const AdopterLanding = () => {
	return (
		<Container>
			<Hero />
			<ShelterTicker />
			<Content />
			<Donate />
		</Container>
	);
};

export default AdopterLanding;

const Container = styled.div`
	background-color: var(--color-white);
`;
