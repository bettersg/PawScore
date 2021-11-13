import ShelterLayout from "layouts/shelter/ShelterLayout";
import NoData from "components/shelter/home/NoData";
import PetsTable from "components/shelter/home/PetsTable";
import createAxiosInstance from "api/createAxiosInstance";
import { useEffect, useState } from "react";
import { PetData, Species, Status } from "common/enums";

const mockData: Omit<PetData, "acquired" | "breed">[] = [];
for (let i = 0; i < 80; i++) {
	mockData.push({
		key: "" + i,
		name: `Fluttershy ${i}`,
		// image: "",
		visible: Math.random() > 0.5 ? true : false,
		species: Species.RABBIT,
		status: Status.ADOPTED
	});
}

const Home = () => {
	const [pets, setPets] = useState<
		Omit<PetData, "acquired" | "breed">[] | null
	>(null);
	const [userRoles, setUserRoles] = useState<string[] | null>(null);

	// EFFECTS

	useEffect(() => {
		const runAsync = async () => {
			try {
				const axios = createAxiosInstance();
				// const {
				// 	data: { payload }
				// } = await axios.get("/api/shelter/animal");
				setPets(mockData);
			} catch (err) {
				// TODO: handle error in UI
				console.log(err);
			}
		};
		runAsync();
	}, []);

	return (
		<ShelterLayout>
			{pets ? <PetsTable pets={pets} /> : <NoData />}
		</ShelterLayout>
	);
};

export default Home;
