import NavBar from "../common/TestNavBar";

const WithNavBar = ({ children }) => {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
};

export default WithNavBar;
