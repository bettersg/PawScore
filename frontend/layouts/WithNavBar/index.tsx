import NavBar from "../common/NavBar";

const WithNavBar = ({children}) => {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
};

export default WithNavBar;
