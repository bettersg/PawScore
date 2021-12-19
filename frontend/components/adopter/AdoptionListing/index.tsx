import { SearchOutlined } from "@ant-design/icons";
import { Animal } from "@contract";
import { Input, Space, Typography } from "antd";
import { useState } from "react";
import styled from "styled-components";
import { AnimalListing } from "./components/AnimalListing";
import { FilterSelector } from "./components/FilterSelector";

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

    return (
        <Page>
            <PageHeading>Adopt an Animal</PageHeading>
            <Searchbar
                placeholder="Search e.g. try 'British Shorthair'"
                prefix={<SearchOutlined style={{ color: "#FFAC7E" }} />}
                size="large"
                bordered={false}
                style={{ marginTop: "30px" }}
            />
            <Space size="large" wrap style={{ marginTop: "30px" }}>
                <FilterSelector
                    label="Species"
                    options={[""]}
                    onChange={() => { }}
                />
                <FilterSelector
                    label="Age"
                    options={[""]}
                    onChange={() => { }}
                />
                <FilterSelector
                    label="Gender"
                    options={[""]}
                    onChange={() => { }}
                />
                <FilterSelector
                    label="Breed"
                    options={[""]}
                    onChange={() => { }}
                />
                {/* <div>More filters</div> */}
            </Space>
            <Grid>
                {animals.map((animal) => (
                    <AnimalListing key={animal.id} animal={animal} />
                ))}
            </Grid>
        </Page>
    );
}

export default AdoptionListingPage;

const Page = styled.div`
	padding: 78px 15%;
	max-width: 1440px;
	background-color: #fff;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 26px;
	row-gap: 26px;
	margin-top: 50px;
`;

const PageHeading = styled(Typography.Title)`
	&& {
		color: #797777;
		font-family: Poppins;
	}
`;

const Searchbar = styled(Input)`
	background-color: #f4f6f9;
	border-color: #f4f6f9;
	border-radius: 0.5rem;

	&:focus,
	&:hover {
		background-color: #f4f6f9;
	}
`;

const FilterSelectorGroup = styled.div`
	margin: 1.5rem 0;
`;
