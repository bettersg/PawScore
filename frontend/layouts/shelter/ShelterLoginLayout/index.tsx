import { Button, Layout, Menu } from "antd";
import styles from "./ShelterLoginLayout.module.css";
const { Header, Content, Footer } = Layout;
const logo = "/logo.png";
import { FooterContent } from "../../common/FooterContent";

type ShelterHomeLayoutProps = {
	children: JSX.Element;
};

const ShelterHomeLayout = ({ children }: ShelterHomeLayoutProps) => {
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

export default ShelterHomeLayout;

const HeaderContent = () => (
	<>
		<img
			src={logo}
			style={{ width: 139, height: 25 }}
			alt="PawScore Logo"
		/>
		<Menu
			style={{ float: "right" }}
			theme="light"
			mode="horizontal"
			defaultSelectedKeys={["shelter"]}
		>
			<Menu.Item key="shelter">About PawScore for Shelters</Menu.Item>
			<Menu.Item key="adopt">
				I&apos;m looking to adopt pets instead
			</Menu.Item>
			<Menu.Item key="login">
				<Button type="primary">Login</Button>
			</Menu.Item>
			<Menu.Item key="register">
				<Button type="default">Register</Button>
			</Menu.Item>
		</Menu>
	</>
);
