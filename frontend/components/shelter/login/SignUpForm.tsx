import { Form, Row } from "antd";
import { Input, Button, QuickSignInButton } from "./components";
import {
	UserOutlined,
	LockOutlined,
	GoogleOutlined,
	FacebookFilled,
} from "@ant-design/icons";
import styles from "./IconStyle.module.css";
import { Auth } from "@contract";

type SignUpFormProps = {
	onFinish: (values: Auth.LoginApiDomain.requestBody) => void;
	disableButton: boolean;
};
const SignUpForm = ({ onFinish, disableButton }: SignUpFormProps) => (
	<Form name="signup" className="signup-form" onFinish={onFinish}>
		<Form.Item
			name="email"
			rules={[
				{
					required: true,
					message: "Please input a valid Email!",
				},
			]}
		>
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
					message: "Please input a Password!",
				},
			]}
		>
			<Input.Password
				prefix={<LockOutlined className={styles.inputFieldIcons} />}
				type="password"
				placeholder="Password"
			/>
		</Form.Item>
		<Form.Item>
			<Button type="primary" htmlType="submit" disabled={disableButton}>
				Sign Up
			</Button>
		</Form.Item>
		{/* <Form.Item>
			<Row style={{ alignItems: "center" }}>
				Sign up with:{" "}
				<QuickSignInButton size="large" icon={<GoogleOutlined />} />{" "}
				<QuickSignInButton size="large" icon={<FacebookFilled />} />
			</Row>
		</Form.Item> */}
	</Form>
);

export default SignUpForm;
