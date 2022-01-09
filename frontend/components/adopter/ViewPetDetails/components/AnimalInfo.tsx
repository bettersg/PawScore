import {
	CheckCircleFilled,
	ClockCircleOutlined,
	CloseCircleFilled,
	InfoCircleFilled,
	WarningFilled,
} from "@ant-design/icons";
import { Animal } from "@contract";
import { Button, Popover, Space } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

dayjs.extend(relativeTime);

// =============================================================================
// Header
// =============================================================================

interface AnimalHeaderProps {
	animal: Animal.Attributes;
	shelter: any;
}

export function AnimalInfoHeader(props: AnimalHeaderProps) {
	const { animal, shelter } = props;
	return (
		<AnimalHeaderWrapper>
			<AnimalName>{animal.name}</AnimalName>
			<ShelterName>{shelter.name}</ShelterName>
			<Space size="large">
				<Time>
					<ClockCircleOutlined /> Posted{" "}
					{dayjs(animal.createdAt).fromNow()}
				</Time>
				<Time>Updated {dayjs(animal.updatedAt).fromNow()}</Time>
			</Space>
		</AnimalHeaderWrapper>
	);
}

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
	margin-bottom: 24px;
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

export function AboutSection(props: AnimalHeaderProps) {
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

export function DetailsSection(props: AnimalHeaderProps) {
	return (
		<Section>
			<Header>More details</Header>
		</Section>
	);
}

export function ShelterSection(props: AnimalHeaderProps) {
	return (
		<Section>
			<Header>About the shelter</Header>
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
