import { Animal } from "@contract";
import { useState } from "react";
import styled from "styled-components";
import { AnimalListing } from "./components/AnimalListing";

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
            <h1>Adopt an Animal</h1>
            <div>
                <input placeholder="Search e.g. try 'British Shorthair'" />
                <div>
                    <div>Species</div>
                    <div>Age</div>
                    <div>Gender</div>
                    <div>Breed</div>
                    <div>More filters</div>
                </div>
            </div>
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
    padding: 0 15%;
    max-width: 1440px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 26px;
    row-gap: 26px;
`;
