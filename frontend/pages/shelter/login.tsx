import ShelterHomeLayout from "layouts/ShelterHomeLayout";
import { Button, Checkbox, Col, Form, Input, Row, Tabs } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./shelter.module.css";
import logo from "assets/logo.png";

const { TabPane } = Tabs;

type FormValues = {
	username: string;
	password: string;
	remember: boolean;
};

type LoginFormProps = {
	onFinish: (values: FormValues) => void;
};

const ShelterLogin = () => {
	const onFinish = (values: FormValues) => {
		alert("login");
		console.log("Received values of form: ", values);
	};

	return (
		<ShelterHomeLayout>
			<Row>
				<Col span={6} offset={9}>
					<div className={styles.loginContainer}>
						<LogoHeader />
						<Tabs defaultActiveKey="1">
							<TabPane tab="Login" key="1">
								<LoginForm onFinish={onFinish} />
							</TabPane>
							<TabPane tab="Signup" key="2">
								Content of Tab Pane 2
							</TabPane>
						</Tabs>
					</div>
				</Col>
			</Row>
		</ShelterHomeLayout>
	);
};

export default ShelterLogin;

const LogoHeader = () => (
	<>
		<div className={styles.logo}>
			<Image src={logo} alt="PawScore Logo" />
		</div>
		<p className={styles.subtitle}>Making pet adoptions fuss free</p>
	</>
);

const LoginForm = ({ onFinish }: LoginFormProps) => (
	<Form
		name="normal_login"
		className="login-form"
		initialValues={{ remember: true }}
		onFinish={onFinish}>
		<Form.Item
			name="username"
			rules={[
				{
					required: true,
					message: "Please input your Username!"
				}
			]}>
			<Input
				prefix={<UserOutlined className="site-form-item-icon" />}
				placeholder="Username"
			/>
		</Form.Item>
		<Form.Item
			name="password"
			rules={[
				{
					required: true,
					message: "Please input your Password!"
				}
			]}>
			<Input
				prefix={<LockOutlined className="site-form-item-icon" />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
		<Form.Item>
			<Form.Item name="remember" valuePropName="checked" noStyle>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<a className={styles.loginFormForgot} href="">
				Forgot password
			</a>
		</Form.Item>
		<Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				className={styles.loginFormButton}>
				Login
			</Button>
		</Form.Item>
	</Form>
);
