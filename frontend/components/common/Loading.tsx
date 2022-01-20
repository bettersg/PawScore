import { Space, Spin } from "antd";

export const LoadingBaseComponent = () => (
	<Space direction="vertical" align="center" style={{ width: "100%" }}>
		<Spin size="large" />
	</Space>
);
