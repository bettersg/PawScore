import { Typography } from "antd";
import { Animal } from "@contract";
import styled from "styled-components";

interface AnimalListingProps {
    animal: Animal.Attributes;
}

export function AnimalListing(props: AnimalListingProps) {
    const { animal: { name, gender, breed, weightKg, animalImages } } = props;
    const thumbnail = animalImages?.[0].thumbnailUrl;
    return <Wrapper>
        <PetImage src={thumbnail} alt={`${name} image`} />
        <PetInfo>
            <PetName>{name}</PetName>
            <PetInfoGrid>
                <PetInfoCell>Gender</PetInfoCell>
                <PetInfoCell>{gender}</PetInfoCell>
                <PetInfoCell>Breed</PetInfoCell>
                <PetInfoCell>{breed}</PetInfoCell>
                <PetInfoCell>Weight</PetInfoCell>
                <PetInfoCell>{weightKg}kg</PetInfoCell>
            </PetInfoGrid>
        </PetInfo>
    </Wrapper>;
}

const Wrapper = styled.div`
    position: relative;
    background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    aspect-ratio: 1;
    color: #fff;
    border-radius: 7px;
    overflow: hidden;
    display: flex;
`;

const PetImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    object-fit: cover;
    z-index: -1;
`

const PetInfo = styled.div`
    align-self: flex-end;
    padding: 1rem;
`

const PetName = styled(Typography.Title)`
    && {
        color: #fff;
        font-size: 23px;
    }
`;

const PetInfoGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`

const PetInfoCell = styled(Typography.Text)`
    color: #fff;
`;
