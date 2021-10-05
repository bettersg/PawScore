import ShelterLoginLayout from "layouts/shelter/ShelterLoginLayout";
import { Button, Checkbox, Col, Form, Input, Row, Tabs } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import styles from "./shelter.module.css";

const { TabPane } = Tabs;
const logo = "/logo.png";

type FormValues = {
	username: string;
	password: string;
	remember?: boolean;
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
		<ShelterLoginLayout>
			<Row className={styles.rowItem}>
				<Col span={6} offset={9}>
					<div className={styles.loginContainer}>
						<LogoHeader />
						<Tabs defaultActiveKey="1">
							<TabPane tab="Login" key="1">
								<LoginForm onFinish={onFinish} />
							</TabPane>
							<TabPane tab="Signup" key="2">
								<SignUpForm onFinish={onFinish} />
							</TabPane>
						</Tabs>
					</div>
				</Col>
			</Row>
		</ShelterLoginLayout>
	);
};

export default ShelterLogin;

const LogoHeader = () => (
	<>
		<Row justify={"center"}>
			<img
				src={logo}
				style={{ width: 139, height: 25, margin: "10px auto" }}
				alt="PawScore Logo"
			/>
		</Row>
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
			<Input.Password
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
		<Form.Item>
			<Row className={styles.signInRow}>Quick Sign-in: <Button size="large" className={styles.quickSignInButton} icon={<GoogleOutlined />} /> <Button size="large" className={styles.quickSignInButton} icon={<FacebookFilled />} /></Row>
		</Form.Item>
	</Form>
);

const SignUpForm  = ({ onFinish }: LoginFormProps) => (
	<Form
		name="signup"
		className="signup-form"
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
			<Input.Password
				prefix={<LockOutlined className="site-form-item-icon" />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
		<Form.Item>
			<Button
				type="primary"
				htmlType="submit"
				className={styles.loginFormButton}>
				Sign Up
			</Button>
		</Form.Item>
		<Form.Item>
			<Row className={styles.signInRow}>Sign up with: <Button size="large" className={styles.quickSignInButton} icon={<GoogleOutlined />} /> <Button size="large" className={styles.quickSignInButton} icon={<FacebookFilled />} /></Row>
		</Form.Item>
	</Form>
);