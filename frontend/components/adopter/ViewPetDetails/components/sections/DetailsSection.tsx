import { Space } from "antd";
import React from "react";
import styled from "styled-components";
import { formatAge, formatValue } from "../../data/formatDisplayValues";
import { AnimalInfoProps } from "../../types/animalInfo";
import { Header, Section } from "./styles";

export function DetailsSection(props: AnimalInfoProps) {
	const { animal } = props;
	const size = formatValue(animal.sizeCm, (val) => val + " cm");
	const age = formatValue(animal.dateOfBirth, formatAge);
	const breed = formatValue(animal.breed);
	const gender = formatValue(animal.gender, (val) =>
		val === "F" ? "Female" : "Male",
	);
	const color = formatValue(animal.color);
	const weight = formatValue(animal.weightKg, (val) => val + " kg");
	const furLength = formatValue(animal.furLength);

	return (
		<Section>
			<Header>More details</Header>
			<Space wrap size="large">
				<DetailCard>
					<div>Species</div>
					<div>{animal.species}</div>
				</DetailCard>
				<DetailCard>
					<div>Size</div>
					<div>{size}</div>
				</DetailCard>
				<DetailCard>
					<div>Age</div>
					<div>{age}</div>
				</DetailCard>
				<DetailCard>
					<div>Breed</div>
					<div>{breed}</div>
				</DetailCard>
				<DetailCard>
					<div>Gender</div>
					<div>{gender}</div>
				</DetailCard>
				<DetailCard>
					<div>Color</div>
					<div>{color}</div>
				</DetailCard>
				<DetailCard>
					<div>Weight</div>
					<div>{weight}</div>
				</DetailCard>
				<DetailCard>
					<div>Fur length</div>
					<div>{furLength}</div>
				</DetailCard>
			</Space>
		</Section>
	);
}

const DetailCard = styled.button`
	background: #ffffff;
	box-shadow: 0px 0px 6px rgba(48, 27, 150, 0.2);
	border: none;
	border-radius: 10px;
	width: 125px;
	height: 125px;
	font-weight: 600;
	font-size: 20px;
	line-height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;

	& > div {
		position: absolute;
		padding: 8px;
	}

	& > div:first-child {
		text-transform: uppercase;
	}

	&:hover > div:first-child,
	&:active > div:first-child,
	&:focus > div:first-child {
		opacity: 0;
	}

	& > div:last-child {
		opacity: 0;
		word-break: break-word;
	}

	&:hover > div:last-child,
	&:active > div:last-child,
	&:focus > div:last-child {
		opacity: 1;
	}
`;
