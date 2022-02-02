import { Button } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AnimalInfoProps } from "../../types/animalInfo";
import { Header, Section } from "./styles";

export function AboutSection(props: AnimalInfoProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showReadMore, setShowReadMore] = useState(false);

	useEffect(() => {
		// hide the button if css property is not supported
		setShowReadMore("-webkit-line-clamp" in document.body.style);
	}, []);

	return (
		<Section>
			<Header>About {props.animal.name}</Header>
			<ExpandableTextbox $isExpanded={isExpanded}>
				{props.animal.description ||
					"Oops, there is nothing to say about this pet"}
			</ExpandableTextbox>
			{showReadMore && (
				<Button type="link" onClick={() => setIsExpanded(!isExpanded)}>
					Read {isExpanded ? "less" : "more"}
				</Button>
			)}
		</Section>
	);
}

const ExpandableTextbox = styled.p<{ $isExpanded: boolean }>`
	-webkit-line-clamp: ${(props) => (props.$isExpanded ? "none" : "4")};
	-webkit-box-orient: vertical;
	display: -webkit-box;
	overflow: hidden;
	white-space: pre-line;
`;
