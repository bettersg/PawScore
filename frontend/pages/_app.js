import "antd/dist/antd.css";
import "./main.css";
import { LoginContextProvider } from "../contexts/LoginContext";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
	return (
		<LoginContextProvider>
			<Component {...pageProps} />;
		</LoginContextProvider>
	);
}
