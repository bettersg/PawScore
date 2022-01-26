import { Animal, Shelter } from "@contract";
import { PetApi } from "api/petApi";
import { ShelterApi } from "api/shelterApi";
import { ActionCard } from "components/adopter/ViewPetDetails/components/ActionCard";
import { AnimalInfoHeader } from "components/adopter/ViewPetDetails/components/AnimalInfoHeader";
import {
	ErrorComponent,
	LoadingComponent,
} from "components/adopter/ViewPetDetails/components/common";
import { HighlightList } from "components/adopter/ViewPetDetails/components/Highlight";
import { ImageGallery } from "components/adopter/ViewPetDetails/components/ImageGallery";
import {
	Grid,
	GridCell,
	Page,
} from "components/adopter/ViewPetDetails/components/Page";
import {
	AboutSection,
	DetailsSection,
	ShelterSection,
} from "components/adopter/ViewPetDetails/components/sections";
import { mapAttributesToHighlights } from "components/adopter/ViewPetDetails/data/mapAttributesToHighlights";
import {
	MOCK_ANIMAL,
	MOCK_SHELTER,
} from "components/adopter/ViewPetDetails/data/mocks";
import AdopterLayout from "layouts/adopter/AdopterLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function PetDetailsPage() {
	const router = useRouter();
	const petId = router.query.petId;

	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [animal, setAnimal] = useState<Animal.Attributes>();
	const [shelter, setShelter] = useState<Shelter.Attributes>();

	useEffect(() => {
		if (!petId) {
			return;
		}

		if (petId.includes("mock")) {
			setAnimal(MOCK_ANIMAL);
			setShelter(MOCK_SHELTER);
			setIsLoading(false);
			return;
		}

		const fetchAnimalAndShelterInfo = async () => {
			setIsLoading(true);

			try {
				const animal = await new PetApi().fetchPetData(petId as string);
				const shelter = await new ShelterApi().fetchShelterData(
					animal.shelterId,
				);
				setAnimal(animal);
				setShelter(shelter);
			} catch (err) {
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnimalAndShelterInfo();
	}, [petId]);

	const images = animal?.animalImages?.map((image) => image.photoUrl) ?? [];

	const renderData = () => {
		if (isLoading) {
			return <LoadingComponent />;
		}

		if (isError) {
			return <ErrorComponent />;
		}

		const highlights = mapAttributesToHighlights(animal!);

		return (
			<Page>
				<Grid>
					<GridCell id="header">
						<AnimalInfoHeader animal={animal!} shelter={shelter!} />
					</GridCell>
					<GridCell id="gallery">
						<ImageGallery images={images} />
					</GridCell>
					<GridCell id="card">
						<ActionCard adoptionFee={animal!.adoptionFee} />
					</GridCell>
					<GridCell id="info">
						<HighlightList list={highlights} />
					</GridCell>
					<GridCell id="about">
						<AboutSection animal={animal!} shelter={shelter!} />
					</GridCell>
					<GridCell id="details">
						<DetailsSection animal={animal!} shelter={shelter!} />
					</GridCell>
					<GridCell id="shelter">
						<ShelterSection animal={animal!} shelter={shelter!} />
					</GridCell>
				</Grid>
			</Page>
		);
	};

	return <AdopterLayout>{renderData()}</AdopterLayout>;
}

export default PetDetailsPage;
