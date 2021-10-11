import { ReactNode } from "react";
import styled from "styled-components";
import {
	PICTURE_ONE,
	PICTURE_THREE,
	PICTURE_TWO,
	VerticalDivider
} from "../common";

const image1 = <img src={PICTURE_ONE} alt="step-1" width="452" height="491" />;
const image2 = (
	<img src={PICTURE_THREE} alt="step-2" width="489" height="452" />
);
const image3 = <img src={PICTURE_TWO} alt="step-3" width="447" height="432" />;

const Content = () => (
	<Container>
		<Header>How it works</Header>
		<ContentStep step={1} image={image1}>
			<StepTitle>Choose your pet</StepTitle>
			<p>
				You give us your preference of your dream pets, there are many
				pets, we believe there is one just for you
			</p>
		</ContentStep>
		<ContentStep reverse step={2} image={image2}>
			<StepTitle>Take quiz</StepTitle>
			<p>
				This 10 mins quiz is the first step to help us understand if you
				are ready for adopting/fostering pet. Don’t worry, our intention
				is to give you a guideline on how to be a good pet owner{" "}
				{`:)` /* so that it doesn't mess with bracket linter */}
			</p>
		</ContentStep>
		<ContentStep step={3} image={image3}>
			<StepTitle>Get result</StepTitle>
			<p>
				Your result will come out immediately. Don’t worry if you are
				not qualified, check out our online tutorials and retake our
				quiz or you can consider donating to our animals
			</p>
		</ContentStep>
	</Container>
);
export default Content;

type ContentBlockProps = {
	reverse?: boolean;
	step: number;
	image: JSX.Element;
	children: ReactNode;
};
const ContentStep = ({ reverse, step, image, children }: ContentBlockProps) => {
	return (
		<Block>
			{reverse ? (
				<div className="content">
					<Step>Step {step}</Step>
					{children}
				</div>
			) : (
				<div className="content">{image}</div>
			)}
			<VerticalDivider />
			{reverse ? (
				<div className="content">{image}</div>
			) : (
				<div className="content">
					<Step>Step {step}</Step>
					{children}
				</div>
			)}
		</Block>
	);
};

// =============================================================================
// Styled Components
// =============================================================================

const Container = styled.div`
	font-family: Poppins;
	font-size: 35px;
	line-height: 52px;

	padding: 0 15% 221px;
`;

const Header = styled.div`
	text-align: center;
	color: rgba(17, 2, 90, 0.77);
	margin-top: 119px;
	margin-bottom: 110px;
`;

const Block = styled.div`
	display: flex;
	margin-bottom: 146px;
	> div.content {
		width: 50%;

		p {
			font-family: Roboto;
			font-size: 24px;
			line-height: 35px;
			letter-spacing: 0.04em;
			color: #797777;
		}

		img {
			border-radius: 7px;
			object-fit: cover;
		}
	}
`;

const Step = styled.div`
	color: #9b9898;
	font-weight: 500;
	margin-bottom: 20px;
`;

const StepTitle = styled.div`
	color: var(--color-orange);
	padding-bottom: 20px;
`;
