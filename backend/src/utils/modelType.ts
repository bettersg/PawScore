import { Model } from "sequelize";
import { coerceDateOnlyStringToDate } from "./date";

// use case: postgres returns numeric columns as string type in case the values are too large
// https://github.com/brianc/node-postgres/issues/811
// this function can be configured as a getter on sequelize model attributes;
// this helps to convert the field to float so that you can manipulate it accordingly
export function numericStringToFloat(field: string) {
    return function get(this: Model): number | null {
        const rawValue = (this.getDataValue(field) as unknown) as string | null;
        return rawValue ? parseFloat(rawValue) : null;
    };
}

// use case: postgres returns date only columns as string
export function dateOnlyStringToDate(field: string) {
    return function get(this: Model): Date | null {
        const rawValue = (this.getDataValue(field) as unknown) as string | null;
        return rawValue ? coerceDateOnlyStringToDate(rawValue) : null;
    };
}
