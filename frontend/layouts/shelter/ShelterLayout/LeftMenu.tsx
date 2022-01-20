import { Menu } from "antd";
import { useLoginContext } from "contexts/LoginContext";
import Router from "next/router";

export enum MenuKey {
	PETS = "pets",
	APPLICATION_MANAGEMENT = "application-management",
	DASHBOARD = "dashboard",
}

type TMenuItem = {
	key: MenuKey;
	label: string;
	onClick: (shelterId: string) => void;
};

const menuItems: TMenuItem[] = [
	{
		key: MenuKey.PETS,
		label: "Pets",
		onClick: (shelterId: string) => {
			Router.push(`/shelter/${shelterId}`);
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
		onClick: (shelterId: string) => {
			Router.push(`/shelter/${shelterId}`);
		},
	},
];

const LeftMenu = ({ selectedKey }: { selectedKey: MenuKey }) => {
	const { token } = useLoginContext();

	return (
		<Menu mode="inline" selectedKeys={[selectedKey]}>
			{menuItems.map((item) => (
				<Menu.Item
					key={item.key}
					onClick={() => item.onClick(token!.shelterId!)}
				>
					{item.label}
					{/* <Link href={`/shelter/home/${item.key}`}>{item.label}</Link> */}
				</Menu.Item>
			))}
		</Menu>
	);
};

export default LeftMenu;
