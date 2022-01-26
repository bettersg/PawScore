import { Animal } from "@contract";
import { HighlightProps } from "../components/Highlight";

export function mapAttributesToHighlights(
	animal: Animal.Attributes,
): HighlightProps[] {
	const highlights: HighlightProps[] = [];
	const lowlights: HighlightProps[] = [];

	if (animal.toiletTrained) {
		highlights.push({
			type: "yes",
			label: "Toilet trained",
		});
	} else {
		lowlights.push({
			type: "no",
			label: "Not toilet trained",
		});
	}

	if (animal.dewormed) {
		highlights.push({
			type: "yes",
			label: "Dewormed",
		});
	} else {
		lowlights.push({
			type: "no",
			label: "Not dewormed",
		});
	}

	if (animal.sterilised) {
		highlights.push({
			type: "yes",
			label: "Sterilised",
		});
	} else {
		lowlights.push({
			type: "no",
			label: "Not sterilised",
		});
	}

	if (animal.healthIssues) {
		highlights.push({
			type: "warning",
			label: "Medical attention",
			popoverContent: animal.healthIssues,
		});
	}

	return highlights.concat(lowlights);
}
