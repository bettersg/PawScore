import { Menu } from "antd";
import logo from "assets/logo.png";
import Image from "next/image";
import styles from "./ShelterLayout.module.css";

const { headerLogo, menuLogo, headerMenu, headerSubMenu } = styles;

const HeaderContent = ({ handleEditProfileClick, handleSignOutClick }) => {
	const accountAvatar = (
		<Image
			src="https://via.placeholder.com/32"
			alt="avatar"
			width="32"
			height="32"
			className={menuLogo}
		/>
	);

	return (
		<>
			<div className={headerLogo}>
				<Image src={logo} width="139" height="25" alt="PawScore Logo" />
			</div>
			<Menu
				mode="horizontal"
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
						onClick={handleSignOutClick}>
						Sign Out
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		</>
	);
};

export default HeaderContent;
