import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";
import { FurLength, PetData, Sex, Species, Status } from "common/enums";
import PetDetailsSection from "components/shelter/pet/PetDetailsSection";
import ProspectiveAdopters from "components/shelter/pet/ProspectiveAdopters";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const defaultPet: PetData = {
	key: "",
	name: "Cat 1",
	images: [
		"https://via.placeholder.com/86",
		"https://via.placeholder.com/86",
		"https://via.placeholder.com/86",
		"https://via.placeholder.com/86",
		"https://via.placeholder.com/86"
	],
	visible: false,
	species: Species.CAT,
	status: Status.HEALTHY,
	acquired: new Date(),
	breed: "Shorthair cat",
	sex: Sex.MALE,
	furLength: FurLength.SHORT,
	medicalIssues: ["asthma"],
	sterilised: "yes",
	dateOfBirth: new Date(),
	furColor: ["white", "brown"],
	toiletTrained: true
};

export default function PetDetails() {
	const router = useRouter();
	const { id } = router.query;
	const [petData, setPetData] = useState<PetData>();
	const [petAdopters, setPetAdopters] = useState<Adopter[]>();

	useEffect(() => {
		console.log(`Fetching pet info ${id}`);
		const pd: PetData = {
			...defaultPet,
			key: id as string,
		};

		const adopterData: Adopter[] = [
			{
				key: "1",
				name: "Adopter 1",
				applicationDate: new Date(2021, 8, 18),
				score: 20,
				status: "pending",
				image: "https://via.placeholder.com/22"
			},
			{
				key: "2",
				name: "Adopter 2",
				applicationDate: new Date(2021, 8, 19),
				score: 17,
				status: "rejected",
				image: "https://via.placeholder.com/22"
			},
			{
				key: "3",
				name: "Adopter 3",
				applicationDate: new Date(2021, 8, 20),
				score: 20,
				status: "pending",
				image: "https://via.placeholder.com/22"
			},
			{
				key: "4",
				name: "Adopter 4",
				applicationDate: new Date(2021, 8, 21),
				score: 45,
				status: "pending",
				image: "https://via.placeholder.com/22"
			},
			{
				key: "5",
				name: "Adopter 5",
				applicationDate: new Date(2021, 8, 22),
				score: 28,
				status: "pending",
				image: "https://via.placeholder.com/22"
			},
			{
				key: "6",
				name: "Adopter 6",
				applicationDate: new Date(2021, 8, 25),
				score: 62,
				status: "pending",
				image: "https://via.placeholder.com/22"
			}
		];
		setPetData(pd);
		setPetAdopters(adopterData);
	}, [id]);

	return (
		<ShelterLayout>
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
