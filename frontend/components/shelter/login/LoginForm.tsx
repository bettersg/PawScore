import { Checkbox, Form, Row } from "antd";
import {
	UserOutlined,
	LockOutlined,
	GoogleOutlined,
	FacebookFilled
} from "@ant-design/icons";
import { Input, Button, QuickSignInButton } from "./components";
import styles from "./IconStyle.module.css";
import { LoginFormValues } from "types";

type LoginFormProps = {
	onFinish: (values: LoginFormValues) => void;
};

const LoginForm = ({ onFinish }: LoginFormProps) => (
	<Form
		name="normal_login"
		className="login-form"
		initialValues={{ remember: true }}
		onFinish={onFinish}>
		<Form.Item
			name="email"
			rules={[
				{
					type: "email",
					required: true,
					message: "Please input a valid Email!"
				}
			]}>
			<Input
				prefix={<UserOutlined className={styles.inputFieldIcons} />}
				placeholder="Email"
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
				prefix={<LockOutlined className={styles.inputFieldIcons} />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
		{/* <Form.Item>
			<Form.Item name="remember" valuePropName="checked" noStyle>
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<a style={{ float: "right" }} href="">
				Forgot password
			</a>
		</Form.Item> */}
		<Form.Item>
			<Button type="primary" htmlType="submit">
				Login
			</Button>
		</Form.Item>
		{/* <Form.Item>
			<Row style={{ alignItems: "center" }}>
				Quick Sign-in:{" "}
				<QuickSignInButton size="large" icon={<GoogleOutlined />} />{" "}
				<QuickSignInButton size="large" icon={<FacebookFilled />} />
			</Row>
		</Form.Item> */}
	</Form>
);

export default LoginForm;
