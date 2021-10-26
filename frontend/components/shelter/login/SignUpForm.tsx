import { Form, Row } from "antd";
import { Input, Button, QuickSignInButton } from "./components";
import {
	UserOutlined,
	LockOutlined,
	GoogleOutlined,
	FacebookFilled
} from "@ant-design/icons";
import styles from "./IconStyle.module.css";

type SignUpFormProps = {
	onFinish: (values: LoginFormValues) => void;
};
const SignUpForm = ({ onFinish }: SignUpFormProps) => (
	<Form name="signup" className="signup-form" onFinish={onFinish}>
		<Form.Item
			name="username"
			rules={[
				{
					required: true,
					message: "Please input your Username!"
				}
			]}>
			<Input
				prefix={<UserOutlined className={styles.inputFieldIcons} />}
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
				prefix={<LockOutlined className={styles.inputFieldIcons} />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
		<Form.Item>
			<Button type="primary" htmlType="submit">
				Login
			</Button>
		</Form.Item>
		<Form.Item>
			<Row style={{ alignItems: "center" }}>
				Sign up with:{" "}
				<QuickSignInButton size="large" icon={<GoogleOutlined />} />{" "}
				<QuickSignInButton size="large" icon={<FacebookFilled />} />
			</Row>
		</Form.Item>
	</Form>
);

export default SignUpForm;
