import { Button } from "antd";
import React from "react";
import styled from "styled-components";

interface ActionCardProps {
	adoptionFee: number | null;
}

export function ActionCard(props: ActionCardProps) {
	const { adoptionFee } = props;

	return (
		<Card>
			<AdoptionFee>
				<Title>Adoption Fee</Title>
				<Fee>{adoptionFee === null ? "-" : "$" + adoptionFee}</Fee>
			</AdoptionFee>
			{/* <AdoptButton type="primary" block size="large">
				Adopt
			</AdoptButton> */}
		</Card>
	);
}

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 40px;

	width: 100%;
	max-width: 514px;

	background: #ffffff;
	box-shadow: 0px 4px 6px rgba(48, 27, 150, 0.1);
	border-radius: 30px;
`;

const AdoptionFee = styled.h2`
	text-align: center;
`;

const Title = styled.span`
	font-weight: 600;
	font-size: 29px;
	line-height: 32px;
	display: block;
`;

const Fee = styled.span`
	font-weight: 700;
	font-size: 69px;
	line-height: 76px;
	display: block;
`;

const AdoptButton = styled(Button)`
	background-color: #ffa570;
	border: none;
	border-radius: 8px;
	font-weight: 600;
	font-size: 24px;
	padding: 14px;
	height: fit-content;
	margin-top: 20px;
`;
