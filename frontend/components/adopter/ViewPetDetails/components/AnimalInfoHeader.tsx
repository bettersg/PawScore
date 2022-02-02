import { ClockCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Space } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { AnimalInfoProps } from "../types/animalInfo";

dayjs.extend(relativeTime);

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
						{dayjs(animal.createdAt).fromNow()}
					</Time>
					<Time>Updated {dayjs(animal.updatedAt).fromNow()}</Time>
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
