import { Col, Row, Tabs } from "antd";
import LoginForm from "components/shelter/login/LoginForm";
import LogoHeader from "components/shelter/login/LogoHeader";
import SignUpForm from "components/shelter/login/SignUpForm";
import ShelterLoginLayout from "layouts/shelter/ShelterLoginLayout";
import styled from "styled-components";

const { TabPane } = Tabs;

const ShelterLogin = () => {
	const onFinish = (values: LoginFormValues) => {
		alert("login");
		console.log("Received values of form: ", values);
	};

	return (
		<ShelterLoginLayout>
			<Container>
				<Col span={6} offset={9}>
					<LoginContainer>
						<LogoHeader />
						<StyledTabs defaultActiveKey="1">
							<TabPane tab="Login" key="1">
								<LoginForm onFinish={onFinish} />
							</TabPane>
							<TabPane tab="Signup" key="2">
								<SignUpForm onFinish={onFinish} />
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
