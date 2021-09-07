import { Menu } from "antd";
// import Link from "next/link";

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
		<Menu mode="inline">
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
