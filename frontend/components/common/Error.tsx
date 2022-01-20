import { Result } from "antd";

export const ErrorBaseComponent = () => (
	<Result
		status="error"
		title="Oops!"
		subTitle="Something went wrong. Refresh the page to try again."
	/>
);
