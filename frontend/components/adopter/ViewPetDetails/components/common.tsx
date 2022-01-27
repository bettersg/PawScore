import { ErrorBaseComponent } from "components/common/Error";
import { LoadingBaseComponent } from "components/common/Loading";
import styled from "styled-components";

export const ErrorComponent = () => (
	<Container>
		<ErrorBaseComponent />
	</Container>
);

export const LoadingComponent = () => (
	<Container>
		<LoadingBaseComponent />
	</Container>
);

const Container = styled.div`
	height: 50vh;
	display: flex;
	align-items: center;
`;
