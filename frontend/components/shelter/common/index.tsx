import { EmptyContainer } from "components/common/EmptyContainer";
import { ErrorBaseComponent } from "components/common/Error";
import { LoadingBaseComponent } from "components/common/Loading";

export const ErrorComponent = () => (
	<EmptyContainer>
		<ErrorBaseComponent />
	</EmptyContainer>
);

export const LoadingComponent = () => (
	<EmptyContainer>
		<LoadingBaseComponent />
	</EmptyContainer>
);
