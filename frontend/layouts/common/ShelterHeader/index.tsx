import { Header } from "antd/lib/layout/layout";
import { Menu } from "antd";

const ShelterHeader = () => {
	return (
		<Header>
			<div className="logo" />
			<Menu mode="horizontal" defaultSelectedKeys={["2"]}>
				{new Array(15).fill(null).map((_, index) => {
					const key = index + 1;
					return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
				})}
			</Menu>
		</Header>
	);
};

export default ShelterHeader;
