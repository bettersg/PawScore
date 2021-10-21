import ShelterLayout from "layouts/shelter/ShelterLayout";
import NoData from "components/shelter/home/NoData";
import PetsTable from "components/shelter/home/PetsTable";

const Home = () => {
	const hasData = true;
	return (
		<ShelterLayout>{hasData ? <PetsTable /> : <NoData />}</ShelterLayout>
	);
};

export default Home;
