import { Row } from "antd";
import styled from "styled-components";

const logo = "/logo.png";

const LogoHeader = () => (
	<>
		<Row justify={"center"}>
			<img
				src={logo}
				style={{ width: 139, height: 25, margin: "10px auto" }}
				alt="PawScore Logo"
			/>
		</Row>
		<Subtitle>Making pet adoptions fuss free</Subtitle>
	</>
);

export default LogoHeader;

const Subtitle = styled.p`
	text-align: center;
	font-size: small;
	color: #666;
`;
