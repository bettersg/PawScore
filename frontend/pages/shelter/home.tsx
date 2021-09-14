import ShelterLayout from "layouts/shelter/ShelterLayout";
import NoData from "components/shelter/home/NoData";

const Home = () => {
	const hasData = false;
	return (
		<ShelterLayout>
			{
				hasData ? <></> : <NoData />
			}
		</ShelterLayout>
	);
};

export default Home;
