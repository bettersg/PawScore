function isStringEnum(obj: Record<string, string | number>): obj is Record<string, string> {
  return Object.values(obj).findIndex(v => typeof v === "number") < 0;
}

export function toEnumValues<T extends Record<string, string>>(obj: T): (T[keyof T])[];
export function toEnumValues<T extends Record<string, string | number>>(obj: T): number[];
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export function toEnumValues<T extends Record<string, any>>(obj: T): (T[keyof T])[] | number[] {
  if (isStringEnum(obj)) {
    return Object.values(obj) as (T[keyof T])[];
  } else {
    return Object.values(obj).filter(v => typeof v === "number");
  }
}