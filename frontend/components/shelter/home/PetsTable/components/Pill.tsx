import { Tag } from "antd";
import {
	PillColor,
	Species,
	SpeciesTags,
	Status,
	StatusTags
} from "common/enums";

export enum TablePillType {
	VISIBILITY,
	SPECIES,
	STATUS
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
	value: Status;
};
type TablePillProps = VisibilityProps | SpeciesProps | StatusProps;

const TablePill = ({ type, value }: TablePillProps) => {
	let data: {
		color: PillColor;
		text: string;
	};

	switch (type) {
		case TablePillType.VISIBILITY:
			data = {
				color: value ? PillColor.GREEN : PillColor.RED,
				text: value ? "yes" : "no"
			};
			break;
		case TablePillType.SPECIES:
			data = SpeciesTags[value as Species];
			break;
		case TablePillType.STATUS:
			data = StatusTags[value as Status];
			break;
		default:
			data = {
				color: PillColor.RED,
				text: "error"
			};
	}

	return <Tag color={data.color}>{data.text}</Tag>;
};

export default TablePill;
