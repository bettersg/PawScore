import abilities from "../abilities";
import { allActions, allSubjects } from "../types";
import { User as UserType } from "../../models/user";

const { defineRulesFor } = abilities;

test("Unauthenticated user has some permissions", () => {
	const allowable: { [key: string]: string[] } = {
		// Animal: ["read:all"] or something like that
	};
	const ability = defineRulesFor();
	allSubjects.forEach((subject) => {
		const allowedActionsForSubject = allowable[subject] || [];
		allActions.forEach((action) => {
			if (allowedActionsForSubject.includes(action)) {
				expect(ability.can(action, subject)).toBe(true);
			} else {
				expect(ability.can(action, subject)).toBe(false);
			}
		});
	});
});

test("ADMIN has all permissions", () => {
	const ability = defineRulesFor({ roles: ["ADMIN"] } as UserType);
	allSubjects.forEach((subject) => {
		allActions.forEach((action) => {
			expect(ability.can(action, subject)).toBe(true);
		});
	});
});

test("SHELTER_ADMIN has correct permissions", () => {
	const allowable: { [key: string]: string[] } = {
		UserProfile: ["create:self", "read:self", "update:self"],
		Animal: ["create:shelter", "update:shelter"],
	};
	const ability = defineRulesFor({ roles: ["SHELTER_ADMIN"] } as UserType);
	allSubjects.forEach((subject) => {
		const allowedActionsForSubject = allowable[subject] || [];
		allActions.forEach((action) => {
			if (allowedActionsForSubject.includes(action)) {
				expect(ability.can(action, subject)).toBe(true);
			} else {
				expect(ability.can(action, subject)).toBe(false);
			}
		});
	});
});

test("Basic authenticated user has some permissions", () => {
	const allowable: { [key: string]: string[] } = {
		UserProfile: ["create:self", "read:self", "update:self"],
	};
	const ability = defineRulesFor({ roles: ["A TEST ROLE"] } as UserType);
	allSubjects.forEach((subject) => {
		const allowedActionsForSubject = allowable[subject] || [];
		allActions.forEach((action) => {
			if (allowedActionsForSubject.includes(action)) {
				expect(ability.can(action, subject)).toBe(true);
			} else {
				expect(ability.can(action, subject)).toBe(false);
			}
		});
	});
});
