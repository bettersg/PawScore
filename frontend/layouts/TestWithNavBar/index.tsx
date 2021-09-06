import ShelterHeader from "../common/ShelterHeader";

const WithNavBar = ({ children }) => {
	return (
		<>
			<ShelterHeader />
			{children}
		</>
	);
};

export default WithNavBar;
