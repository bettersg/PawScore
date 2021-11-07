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
import { z } from "zod";
import {
	QuestionnaireAttributes,
	QuestionnaireModel,
	QuestionType
} from "../models/questionnaire";

@JsonController("/api/questionnaire")
export class QuestionnaireController {
	@Get("/")
	async getAll(): Promise<QuestionnaireAttributes[]> {
		const questionnaires = await QuestionnaireModel.findAll();
		return questionnaires.map((s) => s.get({ plain: true }));
	}

	@Get("/:id")
	@OnUndefined(404)
	async getById(
		@Param("id") id: string
	): Promise<QuestionnaireAttributes | undefined> {
		const animal = await QuestionnaireModel.findByPk(id);
		return animal?.get({ plain: true });
	}

	// TODO: should be subresource
	@Post("/")
	@HttpCode(201)
	async create(@Body() body: unknown): Promise<void> {
		const input = QuestionnaireRequestSchema.parse(body);
		const questionnaire = await QuestionnaireModel.create(input);
		console.debug(`Created questionnaire ${questionnaire.id}`);
	}

	// TODO: should be subresource
	@Put("/:id")
	@HttpCode(201)
	async update(
		@Param("id") id: string,
		@Body() body: unknown
	): Promise<void> {
		const input = QuestionnaireRequestSchema.parse(body);
		const questionnaire = await QuestionnaireModel.findByPk(id);
		if (!questionnaire) {
			throw new NotFoundError();
		}
		await questionnaire?.update(input);
		console.debug(`Updated questionnaire ${questionnaire.id}`);
	}
}

const BaseQuestionSchema = z.object({
	title: z.string(),
	description: z.string()
});

const QuestionnaireRequestSchema = z.object({
	description: z.string(),
	questions: z.object({
		questionnaireName: z.string(),
		sections: z
			.object({
				title: z.string(),
				description: z.string(),
				questions: z.array(
					z.union([
						BaseQuestionSchema.extend({
							type: z.enum([
								QuestionType.Boolean,
								QuestionType.Text
							])
						}),
						BaseQuestionSchema.extend({
							type: z.enum([
								QuestionType.SingleChoice,
								QuestionType.MultipleChoice
							]),
							options: z.string().array()
						})
					])
				)
			})
			.array()
	})
});
