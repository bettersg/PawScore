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

// validates file is string (base64) and meets the size limit
export const zodBase64FileSchema = (
    sizeInMb: number,
): z.ZodEffects<z.ZodString, string, string> =>
    z.string().refine((val) => {
        return getOriginalByteSizeFromBase64(val) < sizeInMb * 1024 * 1024;
    }, "File size too large");

function getOriginalByteSizeFromBase64(base64Str: string) {
    const numPaddingChars = (base64Str.match(/=/g) ?? []).length;
    return (base64Str.length * 3) / 4 - numPaddingChars;
}
