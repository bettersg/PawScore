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
			<Title>Adoption Fee</Title>
			<Fee>{adoptionFee === null ? "-" : "$" + adoptionFee}</Fee>
			<AdoptButton type="primary" block size="large">
				Adopt
			</AdoptButton>
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

const Title = styled.h2`
	font-style: normal;
	font-weight: 600;
	font-size: 29px;
	line-height: 32px;
`;

const Fee = styled.h2`
	font-style: normal;
	font-weight: 600;
	font-size: 69px;
	line-height: 76px;
`;

const AdoptButton = styled(Button)`
	background-color: #ffa570;
	border: none;
	border-radius: 8px;
	font-weight: 600;
	font-size: 24px;
	padding: 14px;
	height: fit-content;
`;
