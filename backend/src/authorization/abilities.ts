import { AbilityBuilder, Ability } from "@casl/ability";
import { User as UserType } from "../models/user";
import { Actions, Subjects, AppAbility } from "./types";

/**
 * https://casl.js.org/v5/en/guide/intro#inverted-rules
 * Note that `cannot` rules get overwritten by `can` rules, hence they should be
 * placed after `can` rules to be effective.
 * While collating `can` rules, there might be duplicates. This should not
 * affect performance.
 */
function defineRulesFor(user?: UserType): Ability<[Actions, Subjects]> {
	const { can, cannot, rules } = new AbilityBuilder<AppAbility>(Ability);

	if (!user) return new Ability(rules);

	// For all authenticated users
	can("create:self", "UserProfile");
	can("read:self", "UserProfile");
	can("update:self", "UserProfile");
	cannot("delete", "UserProfile");

	if (user.roles.includes("SHELTER_ADMIN")) {
		can("create:shelter", "Animal");
		can("update:shelter", "Animal");
	}
	if (user.roles.includes("SHELTER_SUPER_ADMIN")) {
		// can("create:shelter", "Animal");
		// can("find:shelter", "Animal");
		// can("read:shelter", "Animal");
		// can("update:shelter", "Animal");
		// can("delete:shelter", "Animal");
	}
	if (user.roles.includes("ADOPTER")) {
		// can("create:self", "Booking");
		// can("find:self", "Booking");
		// can("read:self", "Booking");
		// can("update:self", "Booking");
		// can("delete:self", "Booking");
	}
	if (user.roles.includes("ADMIN")) {
		// Note that admin can still delete UserProfile as this is placed after
		// the cannot
		can("manage", "all");
	}

	return new Ability(rules);
}

export default {
	defineRulesFor,
};
