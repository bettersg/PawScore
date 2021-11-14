import { Layout } from "antd";
import { ReactNode } from "react";
import styles from "./AdopterLayout.module.css";

type Props = {
	children: ReactNode;
};

const { Header, Footer, Content } = Layout;
const { header } = styles;

const AdopterLayout = ({ children }: Props) => {
	return (
		<Layout>
			<Header className={header}>Header</Header>
			<Content>{children}</Content>
			<Footer>Footer</Footer>
		</Layout>
	);
};

export default AdopterLayout;
