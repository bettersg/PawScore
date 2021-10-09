import { AbilityBuilder, Ability } from "@casl/ability";

import { User as UserType } from "../models/user";

function defineRulesFor(user: UserType): Ability {
	const { can, rules } = new AbilityBuilder(Ability);

	// If no user, no rules
	if (!user) return new Ability(rules);

	switch (user.role) {
		case "1":
			can("manage", "all");
			break;
		case "2":
			can("read", "Profile");
			break;
		default:
			// TODO remove
			can("read", "Profile");
			// anonymous users can't do anything
			break;
	}

	return new Ability(rules);
}

export default {
	defineRulesFor
};
