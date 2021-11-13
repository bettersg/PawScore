import { Layout } from "antd";
import createAxiosInstance from "api/createAxiosInstance";
import { ReactNode } from "react";
import HeaderContent from "./HeaderContent";
import LeftMenu from "./LeftMenu";
import styles from "./ShelterLayout.module.css";

const { Header, Content } = Layout;
const { header, sideMenu } = styles;

type Props = {
	children: ReactNode;
};

const ShelterLayout = ({ children }: Props) => {
	// const isLoggedIn = true;

	const handleEditProfileClick = () => {
		alert("Edit Profile");
	};

	const onClickSignOut = async () => {
		try {
			const axios = createAxiosInstance();
			const {
				data: { payload }
			} = await axios.post("/api/logout");
			window.location.assign("/shelter/login");
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
