import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import {
	BooleanQuestion,
	MultipleChoiceQuestion,
	SingleChoiceQuestion,
	TextQuestion
} from "./questionnaire";

export interface BooleanAnswer extends BooleanQuestion {
	answer: boolean;
}

export interface TextAnswer extends TextQuestion {
	answer: string;
}

export interface SingleChoiceAnswer extends SingleChoiceQuestion {
	answer: string;
}

export interface MultipleChoiceAnswer extends MultipleChoiceQuestion {
	answer: string[];
}

export type Answer =
	| BooleanAnswer
	| TextAnswer
	| SingleChoiceAnswer
	| MultipleChoiceAnswer;

export interface Answers {
	questionnaireName: string;
	sections: {
		title: string;
		description: string;
		answer: Answer[];
	}[];
}

export interface QuestionnaireAnswerAttributes {
	id: string;
	userProfileId: string;
	questionnaireId: string;
	answer: Answers;
	createdAt: Date;
	updatedAt: Date;
}

export type QuestionnaireAnswerCreationAttributes = Optional<
	QuestionnaireAnswerAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class QuestionnaireAnswerModel
	extends Model<
		QuestionnaireAnswerAttributes,
		QuestionnaireAnswerCreationAttributes
	>
	implements QuestionnaireAnswerAttributes {
	public id!: string;
	public userProfileId!: string;
	public questionnaireId!: string;
	public answer!: Answers;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

QuestionnaireAnswerModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		userProfileId: {
			type: DataTypes.UUIDV4
		},
		questionnaireId: {
			type: DataTypes.UUIDV4
		},
		answer: {
			type: DataTypes.JSONB,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		tableName: "questionnaire_answer",
		sequelize // passing the `sequelize` instance is required
	}
);
