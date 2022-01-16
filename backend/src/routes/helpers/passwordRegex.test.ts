import { passwordRegex } from "./passwordRegex";

describe("passwordRegex", () => {
	test("should not work for under 8 and above 72 characters", () => {
		expect("".match(passwordRegex)).toBe(null);
		expect("test<,>".match(passwordRegex)).toBe(null);
		expect("testtest".match(passwordRegex)).not.toBe(null);
		expect(
			"123456789012345678901234567890123456789012345678901234567890123456789012".match(
				passwordRegex,
			),
		).not.toBe(null);
		expect(
			"1234567890123456789012345678901234567890123456789012345678901234567890123".match(
				passwordRegex,
			),
		).toBe(null);
	});
	test("should only work for ~`! @#$%^&*()_-+={[}]|:;\"'<,>.?/", () => {
		expect("12345678".match(passwordRegex)).not.toBe(null);
		expect(
			"12345678~`!@#$%^&*()_-+={[}]|:;\"'<,>.?/".match(passwordRegex),
		).not.toBe(null);
		// Reorder special characters, different from regex order
		expect(
			"12345678'<,>.?/~`!@#$%^&*()_-+={[}]|:;\"abcdefghijklmnopqrstuvwxyz".match(
				passwordRegex,
			),
		).not.toBe(null);
	});
});
