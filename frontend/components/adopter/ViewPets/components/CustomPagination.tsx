import {
	DoubleLeftOutlined,
	DoubleRightOutlined,
	EllipsisOutlined,
	LeftOutlined,
	RightOutlined,
} from "@ant-design/icons";
import { Pagination as AntPagination, PaginationProps } from "antd";
import { ComponentClass, FunctionComponent } from "react";
import styled from "styled-components";

function CustomIcon({ icon }: { icon: ComponentClass | FunctionComponent }) {
	return (
		<IconWrapper>
			<Icon as={icon} />
		</IconWrapper>
	);
}

function CustomIconWithHover({
	icon,
	hoverIcon,
}: {
	icon: ComponentClass | FunctionComponent;
	hoverIcon: ComponentClass | FunctionComponent;
}) {
	return (
		<IconWrapper>
			<UnhoveredIcon as={icon} />
			<HoverIcon as={hoverIcon} />
		</IconWrapper>
	);
}

export function CustomPagination(props: PaginationProps) {
	return (
		<Pagination
			showSizeChanger={false}
			itemRender={(current, type, originalElement) => {
				if (type === "prev") {
					return <CustomIcon icon={LeftOutlined} />;
				}
				if (type === "next") {
					return <CustomIcon icon={RightOutlined} />;
				}
				if (type === "jump-prev") {
					return (
						<CustomIconWithHover
							icon={EllipsisOutlined}
							hoverIcon={DoubleLeftOutlined}
						/>
					);
				}
				if (type === "jump-next") {
					return (
						<CustomIconWithHover
							icon={EllipsisOutlined}
							hoverIcon={DoubleRightOutlined}
						/>
					);
				}
				return originalElement;
			}}
			{...props}
		/>
	);
}

const Icon = styled.div`
	font-size: 16px;
	color: #858c94;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	&:hover {
		color: #fdac0f;
	}
`;

const UnhoveredIcon = styled.div`
	font-size: 16px;
	color: #858c94;
	&:hover {
		opacity: 0;
	}
`;

const HoverIcon = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 16px;
	opacity: 0;
	color: #fdac0f;
	&:hover {
		opacity: 1;
	}
`;

const IconWrapper = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	&:hover {
		${UnhoveredIcon} {
			opacity: 0;
		}
		${HoverIcon} {
			opacity: 1;
		}
	}
`;

const Pagination = styled(AntPagination)`
	font-weight: 600;

	.ant-pagination-item-link,
	.ant-pagination-item {
		border: none;
		& a {
			font-size: 23px;
			color: #858c94;
		}

		&:hover a,
		&:active a,
		&:focus-visible a {
			color: #fdac0f;
		}

		&.ant-pagination-item-disabled a {
			color: #858c94;
		}
	}

	.ant-pagination-item-active a {
		color: #fdac0f;
	}

	.ant-pagination-disabled ${Icon} {
		color: #858c94;
	}
`;
