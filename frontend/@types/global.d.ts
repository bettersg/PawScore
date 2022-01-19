interface Adopter {
	key: string;
	name: string;
	applicationDate: Date;
	score: number;
	status: Status;
	image: string;
}

declare module "uuid-validate" {
	function validate(uuid: string): boolean;
	export = validate;
}
