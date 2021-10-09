import { AbilityBuilder, Ability } from "@casl/ability";

import { User as UserType } from "../models/user";

/**
 * https://casl.js.org/v5/en/guide/intro#inverted-rules
 * Note that `cannot` rules get overwritten by `can` rules, hence they should be
 * placed after `can` rules.
 * While collating `can` rules, there might be duplicates. This should not
 * affect performance.
 */
function defineRulesFor(user: UserType): Ability {
	const { can, cannot, rules } = new AbilityBuilder(Ability);

	if (!user) return new Ability(rules);

	if (user.roles.includes("SHELTER_ADMIN")) {
		can("manage", "all");
	}
	if (user.roles.includes("SHELTER_SUPER_ADMIN")) {
		can("read", "Profile");
	}
	if (user.roles.includes("ADOPTER")) {
		can("read", "Profile");
	}
	// TODO remove
	can("read", "Profile");
	cannot("read", "Profile");

	return new Ability(rules);
}

export default {
	defineRulesFor
};
