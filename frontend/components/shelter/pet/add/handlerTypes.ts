import { Animal } from "@contract";
import { RadioChangeEvent } from "antd";
import moment from "moment";
import { ChangeEvent } from "react";

export type TOnValueChange = (
	e: ChangeEvent<HTMLInputElement>,
	key: keyof Pick<
		Animal.Attributes,
		"name" | "healthIssues" | "color" | "furLength" | "breed"
	>,
) => void;
export type TOnRadioChange = (
	e: RadioChangeEvent,
	key: keyof Pick<
		Animal.Attributes,
		"visible" | "toiletTrained" | "gender" | "sterilised" | "adoptionStatus"
	>,
	isYesNo?: boolean,
) => void;
export type TOnDateChange = (
	date: moment.Moment,
	key: keyof Pick<Animal.Attributes, "intakeDate" | "dateOfBirth">,
) => void;
export type TOnSelectChange = (
	value: string | string[],
	key: keyof Pick<
		Animal.Attributes,
		"species" | "furLength" | "breed" | "healthIssues" | "color"
	>,
) => void;
