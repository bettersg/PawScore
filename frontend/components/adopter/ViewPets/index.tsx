import { SearchOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Col, Input, Row, Space, Typography } from "antd";
import AdopterLayout from "layouts/adopter/AdopterLayout";
import { useState } from "react";
import styled from "styled-components";
import { AnimalListing } from "./components/AnimalListing";
import { FilterSelector } from "./components/FilterSelector";
import {
    AgeFilter,
    AgeFilterOptions,
    BreedFilterOptions,
    GenderFilter,
    GenderFilterOptions,
    SpeciesFilterOptions,
} from "./data/filters";

const MOCK_ANIMAL_DATA = [
    {
        id: "1",
        species: Animal.Species.Dog,
        name: "Bean",
        gender: "M",
        breed: "Dachshund",
        weightKg: 10,
        animalImages: [
            {
                thumbnailUrl: "https://picsum.photos/500",
                photoUrl: "https://picsum.photos/1000/800",
            },
        ],
    },
    {
        id: "2",
        species: Animal.Species.Dog,
        name: "Bean",
        gender: "M",
        breed: "Dachshund",
        weightKg: 10,
        animalImages: [
            {
                thumbnailUrl: "https://picsum.photos/500",
                photoUrl: "https://picsum.photos/1000/800",
            },
        ],
    },
    {
        id: "3",
        species: Animal.Species.Dog,
        name: "Bean",
        gender: "M",
        breed: "Dachshund",
        weightKg: 10,
        animalImages: [
            {
                thumbnailUrl: "https://picsum.photos/500",
                photoUrl: "https://picsum.photos/1000/800",
            },
        ],
    },
    {
        id: "4",
        species: Animal.Species.Dog,
        name: "Bean",
        gender: "M",
        breed: "Dachshund",
        weightKg: 10,
        animalImages: [
            {
                thumbnailUrl: "https://picsum.photos/500",
                photoUrl: "https://picsum.photos/1000/800",
            },
        ],
    },
] as Animal.Attributes[];

function AdoptionListingPage() {
    const [animals, setAnimals] =
        useState<Animal.Attributes[]>(MOCK_ANIMAL_DATA);

    const [speciesFilter, setSpeciesFilter] = useState<Animal.Species[]>([]);
    const [ageFilter, setAgeFilter] = useState<AgeFilter[]>([]);
    const [genderFilter, setGenderFilter] = useState<GenderFilter[]>([]);
    // TODO:
    const [breedFilter, setBreedFilter] = useState<number[]>([]);

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
                        {animals.map((animal) => (
                            <Col key={animal.id} xs={24} sm={12} lg={8}>
                                <AnimalListing animal={animal} />
                            </Col>
                        ))}
                    </Row>
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
