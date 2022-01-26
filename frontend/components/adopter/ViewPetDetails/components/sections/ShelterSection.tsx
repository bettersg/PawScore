import React from "react";
import styled from "styled-components";
import { AnimalInfoProps } from "../../types/animalInfo";
import { Header, Section } from "./styles";

export function ShelterSection(props: AnimalInfoProps) {
	const { name, address } = props.shelter;
	const addressLines = address.split(/,|\n/).map((line) => line.trim());

	return (
		<Section>
			<Header>About the shelter</Header>
			{/* TODO: should be a logo here? */}
			<ShelterLabel>{name}</ShelterLabel>
			<Address>
				<AddressLabel>Address:</AddressLabel>
				{addressLines.map((line, i) => (
					<span key={i}>{line}</span>
				))}
			</Address>
		</Section>
	);
}

const Address = styled.address`
	& > span {
		display: block;
		font-weight: 600;
		font-size: 21px;
		line-height: 32px;
	}
`;

const ShelterLabel = styled.span`
	font-weight: 600;
	font-size: 24px;
	line-height: 28px;
`;

const AddressLabel = styled.span`
	font-weight: 600;
	font-size: 24px;
	line-height: 28px;
`;
