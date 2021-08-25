import { useRouter } from "next/router";
import WithNavBar from "layouts/WithNavBar";
import { getPokemon } from "api/testPokemon";

const TestWithId = ({ data, error }) => {
	const router = useRouter();
	const { id } = router.query;

	// const { name } = data || { name: undefined };
	console.log(data);
	return (
		<WithNavBar>
			<div>id is {id}</div>
			<div>using id to fetch pokemon!</div>
			<div>this pokemon is {data.name}</div>
		</WithNavBar>
	);
};

export default TestWithId;

export const getServerSideProps = async ({ params: { id } }) => {
	const response = await getPokemon(id);
	return {
		props: response
	};
};
