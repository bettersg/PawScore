import styled from "styled-components";
import { Content } from "antd/lib/layout/layout";

export const Container = styled(Content)<{ padBottom?: boolean }>`
	margin: 24px;
	background-color: white;
	padding: ${({ padBottom }) => (padBottom ? "24px 24px 48px" : "24px")};
`;
