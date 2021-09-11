// use case: postgres returns numeric columns as string type in case the values are too large
// https://github.com/brianc/node-postgres/issues/811
// this function can be configured as a getter on sequelize model attributes;
// this helps to convert the field to float so that you can manipulate it accordingly
export function numericStringtoFloat(field: string) {
    return function get(): number {
        const rawValue = this.getDataValue(field) as unknown as string | null;
        return rawValue ? parseFloat(rawValue) : null;
    }
}