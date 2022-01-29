import { Animal } from "@contract";
import { Breadcrumb } from "antd";
import PetDetailsSection from "components/shelter/pet/PetDetailsSection";
import ProspectiveAdopters from "components/shelter/pet/ProspectiveAdopters";
import { Container } from "./styledComponents";

type ViewPetDetailsProps = {
	petData: Animal.Attributes;
	petAdopters: Adopter[];
	onClickEdit: () => void;
};

export const ViewPetDetails = ({
	petData,
	petAdopters,
	onClickEdit,
}: ViewPetDetailsProps) => (
	<>
		<Container>
			<Breadcrumb separator=">">
				<Breadcrumb.Item>Pets</Breadcrumb.Item>
				<Breadcrumb.Item>View Pet Details</Breadcrumb.Item>
			</Breadcrumb>
			{petData && (
				<PetDetailsSection
					petData={petData}
					onClickEdit={onClickEdit}
				/>
			)}
		</Container>
		<Container>
			{petAdopters && <ProspectiveAdopters petAdopters={petAdopters} />}
		</Container>
	</>
);
