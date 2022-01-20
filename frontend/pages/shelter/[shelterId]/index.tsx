import { Animal } from "@contract";
import { PetApi } from "api/petApi";
import { ErrorComponent, LoadingComponent } from "components/shelter/common";
import NoData from "components/shelter/dashboard/NoData";
import PetsTable from "components/shelter/dashboard/PetsTable";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import validateUuid from "uuid-validate";

const Home = () => {
	const router = useRouter();
	const shelterId = router.query.shelterId;
	const [petData, setPetData] = useState<Animal.Attributes[]>([]);
	const [loading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const isValidShelterId = (id: string) => {
		return validateUuid(id);
	};

	useEffect(() => {
		if (!shelterId) return;

		if (!isValidShelterId(shelterId as string)) {
			setIsError(true);
			setLoading(false);
			return;
		}

		const fetchPetData = async () => {
			try {
				const res = await new PetApi().fetchShelterPets(
					shelterId as string,
				);
				setPetData(res);
			} catch (e) {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};
		fetchPetData();
	}, [shelterId]);

	const renderData = () => {
		if (loading) {
			return <LoadingComponent />;
		}

		if (isError) {
			return <ErrorComponent />;
		}

		return petData.length ? (
			<PetsTable petData={petData} shelterId={shelterId as string} />
		) : (
			<NoData shelterId={shelterId as string} />
		);
	};

	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			{renderData()}
		</ShelterLayout>
	);
};

export default Home;
