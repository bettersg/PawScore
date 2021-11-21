import { Menu } from "antd";
// import Link from "next/link";

export enum MenuKey {
	PETS = "pets",
	APPLICATION_MANAGEMENT = "application-management",
	DASHBOARD = "dashboard",
}

type TMenuItem = {
	key: MenuKey;
	label: string;
	onClick: () => void;
};

const menuItems: TMenuItem[] = [
	{
		key: MenuKey.PETS,
		label: "Pets",
		onClick: () => {
			alert("going to pets");
		},
	},
	{
		key: MenuKey.APPLICATION_MANAGEMENT,
		label: "Application Management",
		onClick: () => {
			alert("going to Application Management");
		},
	},
	{
		key: MenuKey.DASHBOARD,
		label: "Dashboard",
		onClick: () => {
			alert("going to Dashboard");
		},
	},
];

const LeftMenu = ({ selectedKey }: { selectedKey: MenuKey }) => {
	return (
		<Menu mode="inline" selectedKeys={[selectedKey]}>
			{menuItems.map((item) => (
				<Menu.Item key={item.key} onClick={item.onClick}>
					{item.label}
					{/* <Link href={`/shelter/home/${item.key}`}>{item.label}</Link> */}
				</Menu.Item>
			))}
		</Menu>
	);
};

export default LeftMenu;
