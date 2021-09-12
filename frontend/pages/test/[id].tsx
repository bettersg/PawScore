import { useRouter } from "next/router";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { getPokemon } from "api/testPokemon";

const TestWithId = ({ data, error }) => {
	const router = useRouter();
	const { id } = router.query;

	// const { name } = data || { name: undefined };
	console.log(data);
	return (
		<ShelterLayout>
			<div>id is {id}</div>
			<div>using id to fetch pokemon!</div>
			<div>this pokemon is {data.name}</div>
		</ShelterLayout>
	);
};

export default TestWithId;

export const getServerSideProps = async ({ params: { id } }) => {
	const response = await getPokemon(id);
	return {
		props: response
	};
};
