import { SearchOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Col, Empty, Input, Result, Row, Space, Spin, Typography } from "antd";
import { PetApi } from "api/petApi";
import AdopterLayout from "layouts/adopter/AdopterLayout";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { AnimalListing } from "./components/AnimalListing";
import { CustomPagination } from "./components/CustomPagination";
import {
	FilterSelector,
	FilterSelectorProps,
} from "./components/FilterSelector";
import {
	AgeFilter,
	AgeFilterOptions,
	filterAnimals,
	GenderFilter,
	GenderFilterOptions,
	generateBreedFilterOptions,
	SpeciesFilterOptions,
} from "./data/filters";

const PAGE_SIZE = 18;

function AdoptionListingPage() {
	const [animals, setAnimals] = useState<Animal.Attributes[]>([]);
	const [breedFilterOptions, setBreedOptions] = useState<
		FilterSelectorProps<string>["selections"]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const [speciesFilter, setSpeciesFilter] = useState<Animal.Species[]>([]);
	const [ageFilter, setAgeFilter] = useState<AgeFilter[]>([]);
	const [genderFilter, setGenderFilter] = useState<GenderFilter[]>([]);
	const [breedFilter, setBreedFilter] = useState<string[]>([]);

	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		new PetApi()
			.fetchAllAvailablePets()
			.then((animals) => setAnimals(animals))
			.catch(() => setIsError(true))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		setBreedOptions(generateBreedFilterOptions(animals));
	}, [animals]);

	const filteredAnimals = useMemo(() => {
		setPage(1);
		return filterAnimals(animals, {
			speciesFilter,
			genderFilter,
			ageFilter,
			breedFilter,
		});
	}, [animals, speciesFilter, ageFilter, genderFilter, breedFilter]);

	const paginatedAnimals = useMemo(() => {
		return filteredAnimals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	}, [filteredAnimals, page]);

	return (
		<AdopterLayout>
			<Background>
				<Page>
					<PageHeading>Adopt an Animal</PageHeading>
					{/* <Searchbar
                        placeholder="Search e.g. try 'British Shorthair'"
                        prefix={<SearchOutlined style={{ color: "#FFAC7E" }} />}
                        size="large"
                        bordered={false}
                    /> */}
					<Space
						size="large"
						wrap
						style={{
							marginBottom: 51,
							// leave enough space for dropdown to render within the viewport
							maxWidth: "max(1px, calc(100vw - 253px))",
						}}
					>
						<FilterSelector
							label="Species"
							values={speciesFilter}
							selections={SpeciesFilterOptions}
							onChange={(filter) => setSpeciesFilter(filter)}
						/>
						<FilterSelector
							label="Age"
							values={ageFilter}
							selections={AgeFilterOptions}
							onChange={(filter) => setAgeFilter(filter)}
						/>
						<FilterSelector
							label="Gender"
							selections={GenderFilterOptions}
							values={genderFilter}
							onChange={(filter) => setGenderFilter(filter)}
						/>
						<FilterSelector
							label="Breed"
							selections={breedFilterOptions}
							values={breedFilter}
							onChange={(filter) => setBreedFilter(filter)}
						/>
						{/* <div>More filters</div> */}
					</Space>
					<AnimalContent
						isLoading={isLoading}
						isError={isError}
						animals={paginatedAnimals}
					/>
					{!isLoading && !isError && (
						<PositionedPagination
							total={filteredAnimals.length}
							pageSize={PAGE_SIZE}
							current={page}
							onChange={(page) => setPage(page)}
						/>
					)}
				</Page>
			</Background>
		</AdopterLayout>
	);
}

interface AnimalContentProps {
	isLoading: boolean;
	isError: boolean;
	animals: Animal.Attributes[];
}

function AnimalContent(props: AnimalContentProps) {
	const { isLoading, isError, animals } = props;

	if (isLoading) {
		return (
			<Space
				direction="vertical"
				align="center"
				style={{ width: "100%" }}
			>
				<Spin size="large" />
			</Space>
		);
	}

	if (isError) {
		return (
			<Result
				status="error"
				title="Oops!"
				subTitle="Something went wrong. Refresh the page to try again."
			/>
		);
	}

	if (animals.length === 0) {
		return <Empty description="No matches" />;
	}

	return (
		<Row gutter={[26, 26]}>
			{animals.map((animal) => (
				<Col key={animal.id} xs={24} sm={12} lg={8}>
					<AnimalListing animal={animal} />
				</Col>
			))}
		</Row>
	);
}

export default AdoptionListingPage;

const Background = styled.div`
	padding: 78px 26px;
	background-color: var(--color-white);
`;

const Page = styled.div`
	max-width: 1150px;
	margin: auto;
`;

const PageHeading = styled(Typography.Title)`
	&& {
		color: #797777;
		font-family: Poppins;
		margin-bottom: 30px;
	}
`;

const Searchbar = styled(Input)`
	background-color: #f4f6f9;
	border-color: #f4f6f9;
	border-radius: 8px;
	margin-bottom: 30px;

	&:focus,
	&:hover {
		background-color: #f4f6f9;
	}
`;

const PositionedPagination = styled(CustomPagination)`
	margin: 60px auto;
	width: fit-content;
`;
