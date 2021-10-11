import { Button as _Button } from "antd";
import styles from "./Button.module.css";

type ButtonProps = {
	type: "hero" | "content" | "donate";
	onClick: () => void;
	children: string;
};
export const Button = ({ type, onClick, children }: ButtonProps) => {
	return (
		<_Button
			style={{
				borderRadius: 7,
				height: 50
			}}
			className={styles[type]}
			onClick={onClick}>
			{children}
		</_Button>
	);
};
