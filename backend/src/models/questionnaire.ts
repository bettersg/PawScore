import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";

export enum QuestionType {
	Boolean = "BOOLEAN",
	Text = "TEXT",
	SingleChoice = "SINGLE_CHOICE",
	MultipleChoice = "MULTIPLE_CHOICE"
}

export interface BaseQuestion {
	type: QuestionType;
	title: string;
	description: string;
}

export interface BooleanQuestion extends BaseQuestion {
	type: QuestionType.Boolean;
}

export interface TextQuestion extends BaseQuestion {
	type: QuestionType.Text;
}

export interface SingleChoiceQuestion extends BaseQuestion {
	type: QuestionType.SingleChoice;
	options: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
	type: QuestionType.MultipleChoice;
	options: string[];
}

export type Question =
	| BooleanQuestion
	| TextQuestion
	| SingleChoiceQuestion
	| MultipleChoiceQuestion;

export interface Questions {
	questionnaireName: string;
	sections: {
		title: string;
		description: string;
		questions: Question[];
	}[];
}

export interface QuestionnaireAttributes {
	id: string;
	description: string;
	questions: Questions;
	createdAt: Date;
	updatedAt: Date;
}

export type QuestionnaireCreationAttributes = Optional<
	QuestionnaireAttributes,
	"id" | "createdAt" | "updatedAt"
>;

export class QuestionnaireModel
	extends Model<QuestionnaireAttributes, QuestionnaireCreationAttributes>
	implements QuestionnaireAttributes {
	public id!: string;
	public description!: string;
	public questions!: Questions;
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

QuestionnaireModel.init(
	{
		id: {
			type: DataTypes.UUIDV4,
			primaryKey: true
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		questions: {
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
		tableName: "questionnaire",
		sequelize // passing the `sequelize` instance is required
	}
);
