import { Col, Row } from "antd";
import Link from "next/link";
import styles from "./FooterContent.module.css";
import { logo } from "../adopter/AdopterLayout";

export const FooterContent = () => (
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
