import { Animal } from "@contract";
import { PetApi } from "api/petApi";
import NoData from "components/shelter/home/NoData";
import PetsTable from "components/shelter/home/PetsTable";
import { Container } from "components/shelter/home/PetsTable/EmptyContainer";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const [petData, setPetData] = useState<Animal.Attributes[]>([]);
	const [loading, setLoading] = useState(true);

	const isValidShelterId = (id: string) => {
		//TODO: refactor to check if valid
		return !!id;
	};

	useEffect(() => {
		if (!isValidShelterId(id)) return;

		const fetchPetData = async () => {
			const res = await new PetApi().fetchShelterPets(id as string);
			setPetData(res);
			setLoading(false);
		};
		fetchPetData();
	}, [id]);

	if (id && !isValidShelterId(id)) {
		// needs if (id) to prevent error page showing on initial load as id starts off undefined
		return <ErrorPage statusCode={404} />;
	}

	const renderData = () => {
		if (loading) return <Container>LOADINGGGG</Container>;
		return petData.length ? <PetsTable petData={petData} /> : <NoData />;
	};
	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			{renderData()}
		</ShelterLayout>
	);
};

export default Home;
