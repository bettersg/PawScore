import { Controller, Get } from "routing-controllers";
import { Species } from "../../contract";

@Controller("/api/healthcheck")
export class HealthCheckController {
	@Get("/")
	async get(): Promise<string> {
		return `very healthy, species is ${Species.Dog}`;
	}
}

export default new HealthCheckController();
