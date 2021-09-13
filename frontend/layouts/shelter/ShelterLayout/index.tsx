import { Layout, Menu } from "antd";
import LeftMenu from "./LeftMenu";
import styles from "./ShelterLayout.module.css";

const { Header, Content } = Layout;
const logo = "/logo.png";

const ShelterLayout = ({ children }) => {
	// const isLoggedIn = true;
	const { header, sideMenu } = styles;

	const handleEditProfileClick = () => {
		alert("Edit Profile");
	};
	const handleSignOutClick = () => {
		alert("Sign Out");
	};

	return (
		<Layout>
			<Header className={header}>
				<HeaderContent
					handleEditProfileClick={handleEditProfileClick}
					handleSignOutClick={handleSignOutClick}
				/>
			</Header>
			<Layout>
				<Layout.Sider width={256} className={sideMenu}>
					<LeftMenu />
				</Layout.Sider>
			</Layout>
			<Content>
				<div>{children}</div>
			</Content>
		</Layout>
	);
};

export default ShelterLayout;

const HeaderContent = ({ handleEditProfileClick, handleSignOutClick }) => {
	const { headerLogo, menuLogo, headerMenu, headerSubMenu } = styles;

	const accountAvatar = (
		<img
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
				<img
					src={logo}
					style={{ width: 139, height: 25 }}
					alt="PawScore Logo"
				/>
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
