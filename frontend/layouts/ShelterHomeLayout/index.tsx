import "antd/dist/antd.css";
import { Button, Col, Layout, Menu, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/logo.png";
import styles from "./ShelterHomeLayout.module.css";

const { Header, Content, Footer } = Layout;

const ShelterHomeLayout = ({ children }) => {
	return (
		<>
			<Layout>
				<Header className={styles.header}>
					<div
						className="logo"
						style={{ float: "left", width: "100px" }}>
						<Image src={logo} alt="PawScore Logo" />
					</div>
					<Menu
						style={{ float: "right" }}
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={["shelter"]}>
						<Menu.Item key="shelter">
							About PawScore for Shelters
						</Menu.Item>
						<Menu.Item key="adopt">I&apos;m looking to adopt pets instead</Menu.Item>
						<Menu.Item key="login">
							<Button type="primary">Login</Button>
						</Menu.Item>
						<Menu.Item key="register">
							<Button type="default">Register</Button>
						</Menu.Item>
					</Menu>
				</Header>
				<Content>
					<div>{children}</div>
				</Content>
				<Footer className={styles.footer}>
					<Row>
						<Col span={20} offset={2}>
							<Row>
								<Col span={24}>
									<hr className={styles.hr} />
									<Row>
										<Col
											span={6}
											className={styles.footerCol}>
											<div className={styles.footerLogo}>
												<Image
													src={logo}
													alt="PawScore Logo"
												/>
											</div>
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											PAWSCORE
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											FOR ADOPTERS
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											FOR SHELTERS & PET STORES
										</Col>
									</Row>
									<Row>
										<Col
											span={6}
											className={styles.footerCol}>
											Social Media Logos
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											<Link href="#">About Us</Link>
											<br />
											<Link href="#">Contact Us</Link>
											<br />
											<Link href="#">
												Terms of service
											</Link>
											<br />
											<Link href="#">Privacy policy</Link>
											<br />
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											<Link href="#">Adopt A Pet</Link>
											<br />
											<Link href="#">
												Make A Donation
											</Link>
											<br />
										</Col>
										<Col
											span={6}
											className={styles.footerCol}>
											<Link href="#">
												Partner with us
											</Link>
											<br />
											<Link href="#">
												Terms of service
											</Link>
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
				</Footer>
			</Layout>
		</>
	);
};

export default ShelterHomeLayout;
