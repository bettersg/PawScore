import dayjs from "dayjs";
import { z } from "zod";
import { coerceDateOnlyStringToDate, DATE_ONLY_FORMAT } from "./date";

// validates input is a date string and coerce to native Date instance
export const zodDateOnlyStringSchema = z
    .string()
    .refine((val) => dayjs(val, DATE_ONLY_FORMAT, true).isValid(), {
        message: `String must be a valid date in ${DATE_ONLY_FORMAT} format`,
    })
    .transform((val) => coerceDateOnlyStringToDate(val));
