// Helper function to ensure an array consists of all defined types of a type definition
// https://stackoverflow.com/questions/60131681/make-sure-array-has-all-types-from-a-union
export const arrayOfAll =
	<T>() =>
	<U extends T[]>(
		array: U & ([T] extends [U[number]] ? unknown : "Invalid")
	): T[] =>
		array;
