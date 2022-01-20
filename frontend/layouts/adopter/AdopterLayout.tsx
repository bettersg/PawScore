import { Button, Layout, Menu } from "antd";
import styles from "../shelter/ShelterLoginLayout/ShelterLoginLayout.module.css";
import { FooterContent } from "../common/FooterContent";
import styled from "styled-components";
const { Header, Content, Footer } = Layout;
export const logo = "/logo.png";

type AdopterHomeProps = {
	children: JSX.Element;
};

const AdopterHome = ({ children }: AdopterHomeProps) => {
	return (
		<Layout>
			<Header className={styles.header}>
				<HeaderContent />
			</Header>
			<Content>
				<div>{children}</div>
			</Content>
			<Footer className={styles.footer}>
				<FooterContent />
			</Footer>
		</Layout>
	);
};

export default AdopterHome;

const HeaderContent = () => (
	<>
		<Logo>
			<img
				src={logo}
				style={{ width: 139, height: 25 }}
				alt="PawScore Logo"
			/>
		</Logo>
		{/* <Menu
			style={{ float: "right" }}
			theme="light"
			mode="horizontal"
			defaultSelectedKeys={["shelter"]}
		>
			<Menu.Item key="login">
				<Button type="primary">Login</Button>
			</Menu.Item>
			<Menu.Item key="register">
				<Button type="default">Register</Button>
			</Menu.Item>
		</Menu> */}
	</>
);

const Logo = styled.div`
	background: pink;
	width: 139px;
	cursor: pointer;
`;
