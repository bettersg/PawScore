import { Button, Col, Layout, Menu, Row } from "antd";
import Link from "next/link";
import styles from "./ShelterLoginLayout.module.css";
const { Header, Content, Footer } = Layout;
const logo = "/logo.png";

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
			defaultSelectedKeys={["shelter"]}>
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

const FooterContent = () => (
	<Row>
		<Col span={20} offset={2}>
			<Row>
				<Col span={24}>
					<hr className={styles.hr} />
					<Row>
						<Col span={6} className={styles.footerCol}>
							<img
								src={logo}
								style={{ width: 139, height: 25 }}
								alt="PawScore Logo"
							/>
						</Col>
						<Col span={6} className={styles.footerCol}>
							PAWSCORE
						</Col>
						<Col span={6} className={styles.footerCol}>
							FOR ADOPTERS
						</Col>
						<Col span={6} className={styles.footerCol}>
							FOR SHELTERS & PET STORES
						</Col>
					</Row>
					<Row>
						<Col span={6} className={styles.footerCol}>
							Social Media Logos
						</Col>
						<Col span={6} className={styles.footerCol}>
							<Link href="#">About Us</Link>
							<br />
							<Link href="#">Contact Us</Link>
							<br />
							<Link href="#">Terms of service</Link>
							<br />
							<Link href="#">Privacy policy</Link>
							<br />
						</Col>
						<Col span={6} className={styles.footerCol}>
							<Link href="#">Adopt A Pet</Link>
							<br />
							<Link href="#">Make A Donation</Link>
							<br />
						</Col>
						<Col span={6} className={styles.footerCol}>
							<Link href="#">Partner with us</Link>
							<br />
							<Link href="#">Terms of service</Link>
							<br />
							<Link href="#">Privacy policy</Link>
							<br />
						</Col>
					</Row>
					<hr className={styles.hr} />
				</Col>
			</Row>
			<Row>
				<Col span={24} style={{ textAlign: "center" }}>
					&copy;2021 PawScore. All rights reserved.
				</Col>
			</Row>
		</Col>
	</Row>
);
