import { LoginPayload } from "@contract";
import { AuthToken } from "common/utils";
import {
	useContext,
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";

type THandleToken = (token: LoginPayload) => void;

const LoginContext = createContext({
	isFirstLoad: true,
	isLoggedIn: false,
	handleLogin: (token: LoginPayload) => {},
	handleLogout: () => {},
});

export function useLoginContext() {
	return useContext(LoginContext);
}

export function LoginContextProvider({ children }: { children: ReactNode }) {
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState<LoginPayload | undefined>();

	useEffect(() => {
		if (isFirstLoad) {
			setToken(AuthToken.get());
			setIsFirstLoad(false);
		}
	}, [isFirstLoad]);

	useEffect(() => {
		// TODO: implement proper validation
		if (token?.id) {
			setIsLoggedIn(true);
		}
	}, [token]);

	const storeToken: THandleToken = (token) => {
		AuthToken.store(token);
	};
	const removeToken = () => {
		AuthToken.remove();
	};

	const handleLogin: THandleToken = (token) => {
		storeToken(token);
		setToken(token);
	};

	const handleLogout = () => {
		removeToken();
		setToken(undefined);
	};

	const value = {
		isFirstLoad,
		isLoggedIn,
		handleLogin,
		handleLogout,
	};
	return (
		<LoginContext.Provider value={value}>{children}</LoginContext.Provider>
	);
}
