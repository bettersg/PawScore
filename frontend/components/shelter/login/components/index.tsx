import { Button as _Button, Input as _Input } from "antd";
import styled from "styled-components";

// =============================================================================
// Styled Components
// =============================================================================
export const Input = styled(_Input)`
	:hover,
	:active {
		border-color: var(--color-golden-purple);
	}
`;
export const Button = styled(_Button)`
	width: 100%;
`;
export const QuickSignInButton = styled(_Button)`
	color: rgba(0, 0, 0, 0.45);
	border: transparent;
	:hover {
		color: var(--color-golden-purple);
	}
`;
