import { LoginPayload } from "@contract";
import { AuthToken } from "common/utils";
import {
	useContext,
	createContext,
	ReactNode,
	useState,
	useEffect,
	useCallback,
} from "react";

type DefaultContext = {
	checkingLogin: boolean;
	isLoggedIn: boolean;
	handleLogin: (token: LoginPayload) => void;
	handleLogout: () => void;
	token: LoginPayload | undefined;
};
const defaultContext: DefaultContext = {
	checkingLogin: true,
	isLoggedIn: false,
	handleLogin: (token: LoginPayload) => {},
	handleLogout: () => {},
	token: undefined,
};
const LoginContext = createContext(defaultContext);

export function useLoginContext() {
	return useContext(LoginContext);
}

export function LoginContextProvider({ children }: { children: ReactNode }) {
	const [checkingLogin, setCheckingLogin] = useState(true);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState<LoginPayload | undefined>();

	useEffect(() => {
		if (isFirstLoad) {
			setToken(AuthToken.get());
			setIsFirstLoad(false);
		} else {
			setCheckingLogin(false);
		}
	}, [isFirstLoad]);

	const storeToken = (token: LoginPayload) => {
		AuthToken.store(token);
	};
	const removeToken = () => {
		AuthToken.remove();
	};

	const handleLogin = (token: LoginPayload) => {
		storeToken(token);
		setToken(token);
		setIsLoggedIn(true);
	};

	const handleLogout = useCallback(() => {
		removeToken();
		setToken(undefined);
		setIsLoggedIn(false);
	}, []);

	useEffect(() => {
		if (isFirstLoad) {
			return;
		}
		// TODO: implement proper validation
		if (token?.id) {
			setIsLoggedIn(true);
		} else {
			handleLogout();
		}
		setCheckingLogin(false);
	}, [token, isFirstLoad, handleLogout]);

	const value = {
		checkingLogin,
		isLoggedIn,
		handleLogin,
		handleLogout,
		token,
	};
	return (
		<LoginContext.Provider value={value}>{children}</LoginContext.Provider>
	);
}
