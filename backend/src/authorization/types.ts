import { Ability } from "@casl/ability";
import { arrayOfAll } from "../types";

/**
 * `manage` and `all` are special keywords in CASL. manage represents any action
 * and `all` represents any subject.
 */

export type Actions =
	| "create"
	| "create:self"
	| "create:shelter"
	| "find"
	| "find:self"
	| "find:shelter"
	| "read"
	| "read:self"
	| "read:shelter"
	| "update"
	| "update:self"
	| "update:shelter"
	| "delete"
	| "delete:self"
	| "delete:shelter"
	| "manage";
export type Subjects =
	| "AdoptionStatus"
	| "Animal"
	| "AnimalImage"
	| "Booking"
	| "Species"
	| "Upload"
	| "User"
	| "UserProfile"
	| "all";

// Used in test, but typescript check errors not flagged during npm test
const arrayOfAllActions = arrayOfAll<Actions>();
export const allActions = arrayOfAllActions([
	"create",
	"create:self",
	"create:shelter",
	"find",
	"find:self",
	"find:shelter",
	"read",
	"read:self",
	"read:shelter",
	"update",
	"update:self",
	"update:shelter",
	"delete",
	"delete:self",
	"delete:shelter",
	"manage"
]);
// Used in test, but typescript check errors not flagged during npm test
const arrayOfAllSubjects = arrayOfAll<Subjects>();
export const allSubjects = arrayOfAllSubjects([
	"AdoptionStatus",
	"Animal",
	"AnimalImage",
	"Booking",
	"Species",
	"Upload",
	"User",
	"UserProfile",
	"all"
]);
export type AppAbility = Ability<[Actions, Subjects]>;
