import { SearchOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Col, Input, Pagination, Row, Space, Typography } from "antd";
import AdopterLayout from "layouts/adopter/AdopterLayout";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { AnimalListing } from "./components/AnimalListing";
import { FilterSelector } from "./components/FilterSelector";
import {
    AgeFilter,
    AgeFilterOptions,
    BreedFilterOptions,
    GenderFilter,
    GenderFilterOptions,
    SpeciesFilterOptions
} from "./data/filters";

const MOCK_ANIMAL_DATA = new Array(200).fill(0).map(
    (_, i) =>
    ({
        id: (i + 1).toString(),
        species: Animal.Species.Dog,
        name: "Bean" + (i + 1),
        gender: "M",
        breed: "Dachshund",
        weightKg: 10,
        animalImages: [
            {
                thumbnailUrl: "https://picsum.photos/500",
                photoUrl: "https://picsum.photos/1000/800",
            },
        ],
    } as Animal.Attributes),
);

const PAGE_SIZE = 18;

function AdoptionListingPage() {
    const [animals, setAnimals] =
        useState<Animal.Attributes[]>(MOCK_ANIMAL_DATA);

    const [speciesFilter, setSpeciesFilter] = useState<Animal.Species[]>([]);
    const [ageFilter, setAgeFilter] = useState<AgeFilter[]>([]);
    const [genderFilter, setGenderFilter] = useState<GenderFilter[]>([]);
    // TODO:
    const [breedFilter, setBreedFilter] = useState<number[]>([]);

    const [page, setPage] = useState<number>(1);
    const display = useMemo(() => {
        return animals.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
    }, [animals, page]);

    return (
        <AdopterLayout>
            <Background>
                <Page>
                    <PageHeading>Adopt an Animal</PageHeading>
                    <Searchbar
                        placeholder="Search e.g. try 'British Shorthair'"
                        prefix={<SearchOutlined style={{ color: "#FFAC7E" }} />}
                        size="large"
                        bordered={false}
                    />
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
                            selections={BreedFilterOptions}
                            values={breedFilter}
                            onChange={(filter) => setBreedFilter(filter)}
                        />
                        {/* <div>More filters</div> */}
                    </Space>
                    <Row gutter={[26, 26]}>
                        {display.map((animal) => (
                            <Col key={animal.id} xs={24} sm={12} lg={8}>
                                <AnimalListing animal={animal} />
                            </Col>
                        ))}
                    </Row>
                    <Pager
                        total={animals.length}
                        pageSize={18}
                        current={page}
                        showSizeChanger={false}
                        onChange={(page) => setPage(page)}
                    />
                </Page>
            </Background>
        </AdopterLayout>
    );
}

export default AdoptionListingPage;

const Background = styled.div`
	padding: 78px 26px;
	background-color: #fff;
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
	border-radius: 0.5rem;
	margin-bottom: 30px;

	&:focus,
	&:hover {
		background-color: #f4f6f9;
	}
`;

const Pager = styled(Pagination)`
	margin: 60px auto;
	width: fit-content;
	font-weight: 600;

	.ant-pagination-item-link,
	.ant-pagination-item {
		border: none;
		&:hover * {
			color: #fdac0f;
		}
		&:active * {
			color: #fdac0f;
		}
	}

	.ant-pagination-item-active a {
		color: #fdac0f;
	}
`;
