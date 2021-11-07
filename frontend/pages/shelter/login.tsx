import { Col, Row, Tabs } from "antd";
import LoginForm from "components/shelter/login/LoginForm";
import LogoHeader from "components/shelter/login/LogoHeader";
import SignUpForm from "components/shelter/login/SignUpForm";
import ShelterLoginLayout from "layouts/shelter/ShelterLoginLayout";
import styled from "styled-components";
import createAxiosInstance from "api/createAxiosInstance";
import { LoginFormValues } from "types";

const { TabPane } = Tabs;

const ShelterLogin = () => {
	const onSubmitLogin = async (values: LoginFormValues) => {
		try {
			const axios = createAxiosInstance();
			const {
				data: { payload }
			} = await axios.post("/api/login", values);
			window.location.assign("/shelter/home");
		} catch (err) {
			// TODO: handle error in UI
			console.log(err);
		}
	};
	const onSubmitSignup = async (values: LoginFormValues) => {
		try {
			const axios = createAxiosInstance();
			const {
				data: { payload }
			} = await axios.post("/api/register", values);
			window.location.assign("/shelter/home");
		} catch (err) {
			// TODO: handle error in UI
			console.log(err);
		}
	};

	return (
		<ShelterLoginLayout>
			<Container>
				<Col span={6} offset={9}>
					<LoginContainer>
						<LogoHeader />
						<StyledTabs defaultActiveKey="1">
							<TabPane tab="Login" key="1">
								<LoginForm onFinish={onSubmitLogin} />
							</TabPane>
							<TabPane tab="Signup" key="2">
								<SignUpForm onFinish={onSubmitSignup} />
							</TabPane>
						</StyledTabs>
					</LoginContainer>
				</Col>
			</Container>
		</ShelterLoginLayout>
	);
};

export default ShelterLogin;

// =============================================================================
// Styled Components
// =============================================================================

const Container = styled(Row)`
	background-color: var(--color-background);
`;

const LoginContainer = styled.div`
	margin: 200px auto;
	padding: 60px 40px;
	background-color: var(--color-white);
`;

const StyledTabs = styled(Tabs)`
	color: var(--color-golden-purple);
`;
