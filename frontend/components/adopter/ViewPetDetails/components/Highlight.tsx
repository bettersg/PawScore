import {
	CheckCircleFilled,
	CloseCircleFilled,
	InfoCircleFilled,
	WarningFilled,
} from "@ant-design/icons";
import { Popover, Space } from "antd";
import React from "react";
import styled from "styled-components";

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
