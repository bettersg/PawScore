import { Col, Row, Tabs } from "antd";
import { AuthApi } from "api/authApi";
import { AxiosError } from "axios";
import { AuthToken } from "common/utils";
import LoginForm from "components/shelter/login/LoginForm";
import LogoHeader from "components/shelter/login/LogoHeader";
import SignUpForm from "components/shelter/login/SignUpForm";
import ShelterLoginLayout from "layouts/shelter/ShelterLoginLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { LoginFormValues } from "types";

const { TabPane } = Tabs;

const ShelterLogin = () => {
	const router = useRouter();
	const [disableButton, setDisableButton] = useState(false);
	const [invalid, setInvalid] = useState(false);

	const handleSubmit = (type: keyof AuthApi) => {
		return async (values: LoginFormValues) => {
			setInvalid(false);
			setDisableButton(true);
			try {
				const token = await new AuthApi()[type](values);

				if (token.shelterId) {
					AuthToken.store(token);
					router.push(`/shelter/${token.shelterId}`);
				}
			} catch (_err) {
				const err = (_err as AxiosError)?.response?.data;
				if (err.status === "failure") {
					setInvalid(true);
				} else {
					alert(
						`error ${
							type === "login" ? "logging in" : "signing up"
						}`,
					);
				}
				setDisableButton(false);
			}
		};
	};

	return (
		<ShelterLoginLayout>
			<Container>
				<Col span={6} offset={9}>
					<LoginContainer>
						<LogoHeader />
						<StyledTabs defaultActiveKey="1">
							<TabPane tab="Login" key="1">
								<LoginForm
									onFinish={handleSubmit("login")}
									disableButton={disableButton}
									invalid={invalid}
								/>
							</TabPane>
							<TabPane tab="Signup" key="2">
								<SignUpForm
									onFinish={handleSubmit("register")}
									disableButton={disableButton}
								/>
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
