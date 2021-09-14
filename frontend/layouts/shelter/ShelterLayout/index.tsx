import { Layout } from "antd";
import HeaderContent from "./HeaderContent";
import LeftMenu from "./LeftMenu";
import styles from "./ShelterLayout.module.css";

const { Header, Content } = Layout;
const logo = "/logo.png";
const { header, sideMenu } = styles;

const ShelterLayout = ({ children }) => {
	// const isLoggedIn = true;

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
				<Layout>
					<Content>
						<div>{children}</div>
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default ShelterLayout;
