import { Animal } from "@contract";
import { Controller, Get } from "routing-controllers";

@Controller("/api/healthcheck")
export class HealthCheckController {
	@Get("/")
	async get(): Promise<string> {
		return `very healthy, species is ${Animal.Species.Dog}`;
	}
}

export default new HealthCheckController();
