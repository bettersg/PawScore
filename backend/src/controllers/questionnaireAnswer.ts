import {
	Body,
	Get,
	HttpCode,
	JsonController,
	NotFoundError,
	OnUndefined,
	Param,
	Post,
	Put
} from "routing-controllers";
import { QuestionType } from "../models/questionnaire";
import { z } from "zod";
import {
	QuestionnaireAnswerAttributes,
	QuestionnaireAnswerModel
} from "../models/questionnaireAnswer";

@JsonController("/api/questionnaireAnswer")
export class QuestionnaireAnswerController {
	@Get("/:id")
	@OnUndefined(404)
	async getById(
		@Param("id") id: string
	): Promise<QuestionnaireAnswerAttributes | undefined> {
		const animal = await QuestionnaireAnswerModel.findByPk(id);
		return animal?.get({ plain: true });
	}

	// TODO: should be subresource
	@Post("/")
	@HttpCode(201)
	async create(@Body() body: unknown): Promise<void> {
		const input = QuestionnaireAnswerRequestSchema.parse(body);
		const questionnaireAnswer = await QuestionnaireAnswerModel.create(
			input
		);
		console.debug(`Created questionnaireAnswer ${questionnaireAnswer.id}`);
	}

	// TODO: should be subresource, permissions checking
	@Put("/:id")
	@HttpCode(201)
	async update(
		@Param("id") id: string,
		@Body() body: unknown
	): Promise<void> {
		const input = QuestionnaireAnswerRequestSchema.parse(body);
		const questionnaireAnswer = await QuestionnaireAnswerModel.findByPk(id);
		if (!questionnaireAnswer) {
			throw new NotFoundError();
		}
		await questionnaireAnswer?.update(input);
		console.debug(`Updated questionnaireAnswer ${questionnaireAnswer.id}`);
	}
}

const BaseAnswerSchema = z.object({
	title: z.string(),
	description: z.string()
});

const BooleanAnswerSchema = BaseAnswerSchema.extend({
	type: z.enum([QuestionType.Boolean]),
	answer: z.boolean()
});

const TextAnswerSchema = BaseAnswerSchema.extend({
	type: z.enum([QuestionType.Text]),
	answer: z.string()
});

const SingleChoiceAnswerSchema = BaseAnswerSchema.extend({
	type: z.enum([QuestionType.SingleChoice]),
	options: z.string().array(),
	answer: z.string()
});

const MultipleChoiceAnswerSchema = BaseAnswerSchema.extend({
	type: z.enum([QuestionType.MultipleChoice]),
	options: z.string().array(),
	answer: z.string().array()
});

const QuestionnaireAnswerRequestSchema = z.object({
	userProfileId: z.string(),
	questionnaireId: z.string(),
	answer: z.object({
		questionnaireName: z.string(),
		sections: z
			.object({
				title: z.string(),
				description: z.string(),
				answer: z.array(
					z.union([
						BooleanAnswerSchema,
						TextAnswerSchema,
						SingleChoiceAnswerSchema,
						MultipleChoiceAnswerSchema
					])
				)
			})
			.array()
	})
});
