import { Animal, Shelter } from "@contract";

export const MOCK_ANIMAL = {
	id: "1",
	shelterId: "123",
	adoptionStatus: "Healthy",
	adoptionFee: 50,
	species: "Cat",
	name: "Tom",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse at metus aliquam, vulputate dui vestibulum, viverra dolor. Curabitur porttitor accumsan turpis a molestie. \n\nVivamus tincidunt mauris nunc, sed mattis eros porttitor id. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc lobortis ullamcorper facilisis. Donec a lacus felis. Duis efficitur sed ligula non varius. Donec gravida viverra leo. Praesent nec lobortis arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam enim nibh, ornare nec ornare non, facilisis quis urna. Duis id sapien tincidunt, pretium nisi id, feugiat lectus. Nulla fermentum nisl in scelerisque luctus. Quisque mollis dolor ut efficitur dictum. Ut non nisi nec sem rutrum faucibus. Ut bibendum at nisi eu scelerisque. Praesent ultricies neque id tempus laoreet. Fusce quam ante, blandit eu dui quis, laoreet scelerisque ante. Proin quis nisi mollis, bibendum nunc sed, porta odio. Ut ante mi, bibendum a accumsan non, consectetur facilisis dui. Nunc venenatis accumsan felis et porttitor. Nam vitae erat diam. Aenean sed ultrices mi.",
	healthIssues: "A little fat",
	gender: "M",
	dateOfBirth: new Date("2021-01-01"),
	sizeCm: 35,
	breed: "Local",
	color: "Black",
	weightKg: 2.5,
	furLength: "long hair",
	vaccinated: false,
	dewormed: false,
	sterilised: false,
	toiletTrained: true,
	intakeDate: new Date("2021-08-27"),
	visible: true,
	animalImages: [
		{
			photoUrl: "https://picsum.photos/600/600?1",
			thumbnailUrl: "",
		},
		{
			photoUrl: "https://picsum.photos/500/500?2",
			thumbnailUrl: "",
		},
		{
			photoUrl: "https://picsum.photos/600/1000?3",
			thumbnailUrl: "",
		},
	],
	createdAt: "2021-01-01" as any,
	updatedAt: "2021-04-01" as any,
} as Animal.Attributes;

export const MOCK_SHELTER = {
	id: "123",
	name: "SPCA",
	address: "50 Sungei Tengah Rd, Singapore 699012",
	country: "Singapore",
	contact: "6287 5355",
} as Shelter.Attributes;
