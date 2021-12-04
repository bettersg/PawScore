import { Animal } from "@contract";
import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";
import PetDetailsSection from "components/shelter/pet/PetDetailsSection";
import ProspectiveAdopters from "components/shelter/pet/ProspectiveAdopters";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function PetDetails() {
	const router = useRouter();
	const id = router.query.id as string;
	const [petData, setPetData] = useState<Animal.Attributes>();
	const [petAdopters, setPetAdopters] = useState<Adopter[]>();

	useEffect(() => {
		/* TODO: Refactor to either use API from contract or receive data from parent */
		console.log(`Fetching pet info ${id}`);
		const mockPetData: Partial<Animal.Attributes> = {
			id: id,
			name: "Cat 1",
			animalImages: [
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
				{
					photoUrl: "https://via.placeholder.com/86",
					thumbnailUrl: "https://via.placeholder.com/86",
				},
			],
			visible: false,
			species: Animal.Species.Cat,
			adoptionStatus: Animal.AdoptionStatus.Healthy,
			intakeDate: new Date().toLocaleDateString(),
			breed: "Shorthair cat",
		};

		const adopterData: Adopter[] = [
			{
				key: "1",
				name: "Adopter 1",
				applicationDate: new Date(2021, 8, 18),
				score: 20,
				status: "pending",
				image: "https://via.placeholder.com/22",
			},
			{
				key: "2",
				name: "Adopter 2",
				applicationDate: new Date(2021, 8, 19),
				score: 17,
				status: "rejected",
				image: "https://via.placeholder.com/22",
			},
			{
				key: "3",
				name: "Adopter 3",
				applicationDate: new Date(2021, 8, 20),
				score: 20,
				status: "pending",
				image: "https://via.placeholder.com/22",
			},
			{
				key: "4",
				name: "Adopter 4",
				applicationDate: new Date(2021, 8, 21),
				score: 45,
				status: "pending",
				image: "https://via.placeholder.com/22",
			},
			{
				key: "5",
				name: "Adopter 5",
				applicationDate: new Date(2021, 8, 22),
				score: 28,
				status: "pending",
				image: "https://via.placeholder.com/22",
			},
			{
				key: "6",
				name: "Adopter 6",
				applicationDate: new Date(2021, 8, 25),
				score: 62,
				status: "pending",
				image: "https://via.placeholder.com/22",
			},
		];
		setPetData(mockPetData as Animal.Attributes);
		setPetAdopters(adopterData);
	}, [id]);

	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			<Container>
				<Breadcrumb separator=">">
					<Breadcrumb.Item>Pets</Breadcrumb.Item>
					<Breadcrumb.Item href="">View Pet Details</Breadcrumb.Item>
				</Breadcrumb>
				{petData && <PetDetailsSection petData={petData} />}
			</Container>
			<Container>
				{petAdopters && (
					<ProspectiveAdopters petAdopters={petAdopters} />
				)}
			</Container>
		</ShelterLayout>
	);
}

// =============================================================================
// Styled Components
// =============================================================================
const Container = styled(Content)`
	margin: 24px;
	padding: 24px;
	background-color: white;
`;
