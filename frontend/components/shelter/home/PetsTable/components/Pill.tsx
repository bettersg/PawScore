import { Tag } from "antd";
import { Species, AdoptionStatus } from "@contract";
import { PillColor, SpeciesTags, StatusTags } from "common/enums";

export enum TablePillType {
	VISIBILITY,
	SPECIES,
	STATUS,
}

type VisibilityProps = {
	type: TablePillType.VISIBILITY;
	value: boolean;
};
type SpeciesProps = {
	type: TablePillType.SPECIES;
	value: Species;
};
type StatusProps = {
	type: TablePillType.STATUS;
	value: AdoptionStatus;
};
type TablePillProps = VisibilityProps | SpeciesProps | StatusProps;

const TablePill = (props: TablePillProps) => {
	let data: {
		color: PillColor;
		text: string;
	};

	switch (props.type) {
		case TablePillType.VISIBILITY:
			data = {
				color: props.value ? PillColor.GREEN : PillColor.RED,
				text: props.value ? "yes" : "no",
			};
			break;
		case TablePillType.SPECIES:
			data = SpeciesTags[props.value];
			break;
		case TablePillType.STATUS:
			data = StatusTags[props.value];
			break;
		default:
			data = {
				color: PillColor.RED,
				text: "error",
			};
	}

	return <Tag color={data.color}>{data.text}</Tag>;
};

export default TablePill;
