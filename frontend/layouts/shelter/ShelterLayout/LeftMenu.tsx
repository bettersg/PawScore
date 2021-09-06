import { Menu } from "antd";
// import Link from "next/link";
import styled from "styled-components";

const LeftMenuContainer = styled(Menu)`
	&& .ant-menu-item-selected,
	.ant-menu-light .ant-menu-item:hover {
		color: var(--color-golden-purple) !important;
		background-color: var(--color-light-purple) !important;
	}

	&& .ant-menu-item-selected:after {
		border-right: 3px solid var(--color-golden-purple) !important;
	}

	&& .ant-menu-item-active,
	.ant-menu-item:active {
		color: var(--color-golden-purple) !important;
	}

	&& .ant-menu-item:active {
		background: var(--color-light-purple) !important;
	}

	&& .ant-menu-item a:hover,
	.ant-menu-item a:active {
		color: var(--color-golden-purple) !important;
	}
`;

type TMenuItem = {
	key: string;
	label: string;
	onClick: () => void;
};

const menuItems: TMenuItem[] = [
	{
		key: "pets",
		label: "Pets",
		onClick: () => {
			alert("going to pets");
		}
	},
	{
		key: "application-management",
		label: "Application Management",
		onClick: () => {
			alert("going to Application Management");
		}
	},
	{
		key: "dashboard",
		label: "Dashboard",
		onClick: () => {
			alert("going to Dashboard");
		}
	}
];

const LeftMenu = () => {
	return (
		<LeftMenuContainer mode="inline">
			{menuItems.map((item) => (
				<Menu.Item key={item.key} onClick={item.onClick}>
					{item.label}
					{/* <Link href={`/shelter/home/${item.key}`}>{item.label}</Link> */}
				</Menu.Item>
			))}
		</LeftMenuContainer>
	);
};

export default LeftMenu;
