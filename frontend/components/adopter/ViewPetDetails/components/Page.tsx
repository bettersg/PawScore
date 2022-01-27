import styled from "styled-components";

export const Page = styled.div`
	background-color: #fff;
	padding: 58px;

	@media screen and (max-width: 576px) {
		padding: 58px 24px;
	}
`;

export const Grid = styled.div`
	max-width: 1200px;
	margin: auto;
	display: grid;
	grid-template-columns: repeat(2, calc(50% - 18px));
	grid-template-areas:
		"header header"
		"gallery card"
		"info info"
		"about ."
		"details shelter";
	align-items: flex-start;
	column-gap: 36px;

	@media screen and (max-width: 768px) {
		grid-template-columns: 100%;
		grid-template-areas:
			"header"
			"gallery"
			"card"
			"info"
			"about"
			"details"
			"shelter";
	}

	& > #gallery {
		justify-self: flex-start;
		display: flex;
		justify-content: flex-start;
		width: 100%;

		@media screen and (max-width: 768px) {
			justify-content: center;
			justify-self: center;
		}
	}

	& > #card {
		justify-self: flex-start;
		display: flex;
		justify-content: flex-end;
		width: 100%;

		@media screen and (max-width: 768px) {
			justify-content: center;
			margin-top: 24px;
		}
	}
`;

export const GridCell = styled.div`
	grid-area: ${(props) => props.id};
`;
