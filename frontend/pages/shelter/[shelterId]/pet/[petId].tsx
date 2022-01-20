import { Animal } from "@contract";
import { Breadcrumb } from "antd";
import { Content } from "antd/lib/layout/layout";
import { PetApi } from "api/petApi";
import { ErrorComponent, LoadingComponent } from "components/shelter/common";
import PetDetailsSection from "components/shelter/pet/PetDetailsSection";
import ProspectiveAdopters from "components/shelter/pet/ProspectiveAdopters";
import ShelterLayout from "layouts/shelter/ShelterLayout";
import { MenuKey } from "layouts/shelter/ShelterLayout/LeftMenu";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function PetDetails() {
	const router = useRouter();
	const petId = router.query.petId;
	const [petData, setPetData] = useState<Animal.Attributes>();
	const [petAdopters, setPetAdopters] = useState<Adopter[]>();
	const [loading, setLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchPetDetail = async (id: string) => {
			try {
				const res = await new PetApi().fetchPetData(id);
				setPetData(res);
			} catch (e) {
				setIsError(true);
			} finally {
				setLoading(false);
			}
		};

		const mockAdopterData: Adopter[] = [
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
		if (petId) {
			setPetAdopters(mockAdopterData);
			fetchPetDetail(petId as string);
		}
	}, [petId]);

	const renderData = () => {
		if (loading) {
			return <LoadingComponent />;
		}

		if (isError) {
			return <ErrorComponent />;
		}

		return (
			<>
				<Container>
					<Breadcrumb separator=">">
						<Breadcrumb.Item>Pets</Breadcrumb.Item>
						<Breadcrumb.Item href="">
							View Pet Details
						</Breadcrumb.Item>
					</Breadcrumb>
					{petData && <PetDetailsSection petData={petData} />}
				</Container>
				<Container>
					{petAdopters && (
						<ProspectiveAdopters petAdopters={petAdopters} />
					)}
				</Container>
			</>
		);
	};

	return (
		<ShelterLayout selectedMenu={MenuKey.PETS}>
			{renderData()}
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
