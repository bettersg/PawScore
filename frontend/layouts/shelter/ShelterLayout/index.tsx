import { Layout } from "antd";
import createAxiosInstance from "api/createAxiosInstance";
import { ReactNode } from "react";
import HeaderContent from "./HeaderContent";
import LeftMenu from "./LeftMenu";
import styles from "./ShelterLayout.module.css";
import { MenuKey } from "./LeftMenu";
import { AuthApi } from "api/authApi";
import { AuthToken } from "common/utils";

const { Header, Content } = Layout;
const { header, sideMenu } = styles;

type Props = {
	children: ReactNode;
	selectedMenu: MenuKey;
};

const ShelterLayout = ({ children, selectedMenu }: Props) => {
	// const isLoggedIn = true;

	const handleEditProfileClick = () => {
		alert("Edit Profile");
	};

	const onClickSignOut = async () => {
		try {
			AuthToken.remove();
			await new AuthApi().logout();
			// LOGOUT TODO: redirect currently handled on BE. should redirect be handled on FE?
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Layout>
			<Header className={header}>
				<HeaderContent
					handleEditProfileClick={handleEditProfileClick}
					handleSignOutClick={onClickSignOut}
				/>
			</Header>
			<Layout>
				<Layout.Sider width={256} className={sideMenu}>
					<LeftMenu selectedKey={selectedMenu} />
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
