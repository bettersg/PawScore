import {
	CheckCircleFilled,
	ClockCircleOutlined,
	CloseCircleFilled,
	InfoCircleFilled,
	WarningFilled,
} from "@ant-design/icons";
import { Animal, Shelter } from "@contract";
import { Breadcrumb, Button, Popover, Space } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { formatAge, formatValue } from "../data/formatDisplayValues";

dayjs.extend(relativeTime);

interface AnimalInfoProps {
	animal: Animal.Attributes;
	shelter: Shelter.Attributes;
}

// =============================================================================
// Header
// =============================================================================

export function AnimalInfoHeader(props: AnimalInfoProps) {
	const { animal, shelter } = props;
	return (
		<>
			<StyledBreadcrumb separator=">">
				<Breadcrumb.Item>
					<Link href="/adopter">Pets</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>{animal.name}</Breadcrumb.Item>
			</StyledBreadcrumb>
			<AnimalHeaderWrapper>
				<AnimalInfo>
					<Thumbnail src={animal.animalImages?.[0]?.photoUrl} />
					<AnimalName>{animal.name}</AnimalName>
					<ShelterName>
						{shelter.name} <Separator /> Singapore
					</ShelterName>
				</AnimalInfo>
				<Space size="large">
					<Time>
						<ClockCircleOutlined /> Posted{" "}
						{dayjs((animal as any).createdAt).fromNow()}
					</Time>
					<Time>
						Updated {dayjs((animal as any).updatedAt).fromNow()}
					</Time>
				</Space>
			</AnimalHeaderWrapper>
		</>
	);
}

const StyledBreadcrumb = styled(Breadcrumb)`
	font-size: 23px;
	line-height: 24px;
`;

const AnimalName = styled.h2`
	font-weight: 600;
	font-size: 29px;
	line-height: 32px;
`;

const ShelterName = styled.h2`
	color: #301b96;
	font-weight: 600;
	font-size: 23px;
	line-height: 24px;
`;

const Time = styled.div`
	color: #878585;
	font-weight: 600;
	font-size: 18px;
	line-height: 20px;
`;

const AnimalHeaderWrapper = styled.div`
	margin: 24px 0px;
`;

const Thumbnail = styled.img`
	border-radius: 8px;
	height: 76px;
	object-fit: cover;
	aspect-ratio: 1 / 1;
`;

const AnimalInfo = styled.div`
	display: grid;
	margin-bottom: 24px;
	grid-template-areas:
		"thumbnail animal"
		"thumbnail shelter";
	grid-auto-columns: auto 1fr;
	grid-template-rows: 0fr auto;
	column-gap: 29px;

	${Thumbnail} {
		grid-area: thumbnail;
	}
	${AnimalName} {
		grid-area: animal;
	}
	${ShelterName} {
		grid-area: shelter;
	}
`;

const Separator = styled.span`
	&::after {
		color: #d2d2d2;
		content: "\\1F784";
	}
`;

// =============================================================================
// Info highlights
// =============================================================================

export interface HighlightProps {
	type: "yes" | "warning" | "no";
	label: string;
	popoverContent?: string;
}

export function Highlight(props: HighlightProps) {
	const { type, label, popoverContent } = props;

	return (
		<Item>
			{popoverContent ? (
				<Popover
					content={
						<PopoverWrapper>
							<PopoverWarnIcon />
							{popoverContent}
						</PopoverWrapper>
					}
					placement="bottomLeft"
				>
					{getIcon(type)}
					{label}
				</Popover>
			) : (
				<>
					{getIcon(type)}
					{label}
				</>
			)}
		</Item>
	);
}

interface HighlightListProps {
	list: HighlightProps[];
}

export function HighlightList(props: HighlightListProps) {
	return (
		<HighlightListWrapper wrap size={[49, 18]}>
			{props.list.map((item) => (
				<Highlight key={item.label} {...item} />
			))}
		</HighlightListWrapper>
	);
}

function getIcon(type: HighlightProps["type"]) {
	switch (type) {
		case "yes":
			return <CheckIcon />;
		case "no":
			return <CrossIcon />;
		case "warning":
			return <WarnIcon />;
	}
}

const HighlightListWrapper = styled(Space)`
	margin: 28px 0;
`;

const Item = styled.div`
	font-size: 23px;
	font-weight: 600;
`;

const CheckIcon = styled(CheckCircleFilled)`
	color: #15a54b;
	margin-right: 7px;
`;

const CrossIcon = styled(CloseCircleFilled)`
	color: #cf2a2a;
	margin-right: 7px;
`;

const WarnIcon = styled(InfoCircleFilled)`
	color: #ff7441;
	margin-right: 7px;
`;

const PopoverWrapper = styled.div`
	font-size: 16px;
	max-width: 260px;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
`;

const PopoverWarnIcon = styled(WarningFilled)`
	margin-right: 16px;
	font-size: 24px;
	color: #858c94;
`;

// =============================================================================
// Sections
// =============================================================================

export function AboutSection(props: AnimalInfoProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showReadMore, setShowReadMore] = useState(false);

	useEffect(() => {
		// hide the button if css property is not supported
		setShowReadMore("-webkit-line-clamp" in document.body.style);
	}, []);

	return (
		<Section>
			<Header>About {props.animal.name}</Header>
			<ExpandableTextbox $isExpanded={isExpanded}>
				{props.animal.description}
			</ExpandableTextbox>
			{showReadMore && (
				<Button type="link" onClick={() => setIsExpanded(!isExpanded)}>
					Read {isExpanded ? "less" : "more"}
				</Button>
			)}
		</Section>
	);
}

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

const Section = styled.div`
	margin-bottom: 24px;
`;

const Header = styled.h2`
	text-transform: uppercase;
	color: #11025a;
	font-size: 24px;
	line-height: 28px;
	font-weight: 600;
`;

const ExpandableTextbox = styled.p<{ $isExpanded: boolean }>`
	-webkit-line-clamp: ${(props) => (props.$isExpanded ? "none" : "4")};
	-webkit-box-orient: vertical;
	display: -webkit-box;
	overflow: hidden;
	white-space: pre-line;
`;

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
