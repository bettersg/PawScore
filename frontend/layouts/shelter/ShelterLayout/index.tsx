import { Layout, Menu } from "antd";
import Image from "next/image";
import { useRef } from "react";

import logo from "assets/logo.png";
import ShelterLeftMenu from "layouts/common/ShelterLeftMenu";
import styles from "./ShelterLayout.module.css";

const { Header, Content } = Layout;

const ShelterLayout = ({ children }) => {
	// const isLoggedIn = true;
	const { header, headerLogo, menuLogo, headerMenu, headerSubMenu } = styles;

	const selectedMenuItems = useRef([]);

	const accountAvatar = (
		<Image
			src="https://via.placeholder.com/32"
			alt="avatar"
			width="32"
			height="32"
			className={menuLogo}
		/>
	);

	const handleEditProfileClick = () => {
		alert("Edit Profile");
	};
	const handleSingOutClick = () => {
		alert("Sign Out");
	};

	return (
		<Layout>
			<Header className={header}>
				<div className={headerLogo}>
					<Image
						src={logo}
						width="139"
						height="25"
						alt="PawScore Logo"
					/>
				</div>
				<Menu
					mode="horizontal"
					selectedKeys={selectedMenuItems.current}
					triggerSubMenuAction="click"
					className={headerMenu}>
					<Menu.SubMenu
						key="SubMenu"
						icon={accountAvatar}
						title="Your Account"
						className={headerSubMenu}>
						<Menu.Item
							key="edit-profile"
							onClick={handleEditProfileClick}>
							Edit Profile
						</Menu.Item>
						<Menu.Item
							key="sign-out"
							danger
							onClick={handleSingOutClick}>
							Sign Out
						</Menu.Item>
					</Menu.SubMenu>
				</Menu>
			</Header>
			<Content>
				<ShelterLeftMenu />
				<div>{children}</div>
			</Content>
		</Layout>
	);
};

export default ShelterLayout;
