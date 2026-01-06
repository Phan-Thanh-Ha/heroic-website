import dayjs from "dayjs";

/**
 * Format date to a string, default DD/MM/YYYY.
 * Returns empty string if invalid.
 */
export const formatDate = (value: dayjs.ConfigType, format = "DD/MM/YYYY"): string => {
    const d = dayjs(value);
    return d.isValid() ? d.format(format) : "";
};
